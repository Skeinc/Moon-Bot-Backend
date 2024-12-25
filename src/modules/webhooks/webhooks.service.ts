import { TariffsService } from "@modules/tariffs/tariffs.service";
import { TransactionsService } from "@modules/transactions/transactions.service";
import { UsersService } from "@modules/users/users.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiResponse } from "@shared/dto/api.dto";
import { GetTariffDto } from "@shared/dto/tariff.dto";
import { GetTransactionDto, UpdateTransactionDto } from "@shared/dto/transaction.dto";
import { GetUserDto, UpdateUserDto } from "@shared/dto/user.dto";
import { TransactionStatusesEnum } from "@shared/enums/transaction.enum";
import { notifyUser } from "@shared/utils/notify-user.util";

export class WebhooksService {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly tariffsService: TariffsService,
        private readonly usersService: UsersService,
    ) { }

    async handleYooKassaWebhook(payload: any): Promise<void> {
        if (payload.type !== 'notification') {
            throw new HttpException('Invalid notification type', HttpStatus.BAD_REQUEST);
        }

        const { event, object } = payload;

        switch (event) {
            case 'payment.succeeded':
                await this.handlePaymentSucceeded(object);

                break;
            case 'payment.failed':
                await this.handlePaymentFailed(object);

                break;

            case 'payment.canceled':
                await this.handlePaymentCanceled(object);

                break;

            default:
                throw new HttpException('Unhandled event type', HttpStatus.BAD_REQUEST);
        }
    }

    private async handlePaymentSucceeded(object: any): Promise<void> {
        const paymentId = object.id;

        // Найти транзакцию по transactionId
        const transaction = await this.transactionsService.getTransactionByTransactionId(paymentId);

        if (!transaction || !transaction.success || !transaction.data) {
            throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
        }

        const transactionData: GetTransactionDto = transaction.data;

        // Обновление статуса транзакции
        const updateTransactionDto: UpdateTransactionDto = {
            id: transactionData.id,
            status: TransactionStatusesEnum.COMPLETED,
        };

        await this.transactionsService.updateTransaction(transactionData.id, updateTransactionDto);

        // Ищем необходимый тариф
        const tariff: ApiResponse<GetTariffDto> = await this.tariffsService.getTariff(updateTransactionDto.tariffId);

        if (!tariff || !tariff.success || !tariff.data) {
            throw new HttpException('Tariff not found', HttpStatus.NOT_FOUND);
        }

        // Найти пользователя по userId
        const user: ApiResponse<GetUserDto> = await this.usersService.getUser(transactionData.id);

        if (!user.data || !user.data.telegramId) {
            throw new HttpException('User  not found or Telegram ID missing', HttpStatus.NOT_FOUND);
        }

        const tariffData: GetTariffDto = tariff.data;

        // Создаем объект для обновления пользователя
        const updateUserDto: UpdateUserDto = { id: user.data.id };

        // Обновляем кол-во бесплатных запросов или статус подписки
        if (!tariffData.duration && tariffData.requestLimit) {
            updateUserDto.requestsLeft = (user.data.requestsLeft || 0) + tariffData.requestLimit;
        } else {
            const currentDate = new Date();
            const subscriptionExpiry = new Date(currentDate);
            subscriptionExpiry.setDate(currentDate.getDate() + (tariffData.duration || 0));
            updateUserDto.subscriptionExpiry = subscriptionExpiry;
        }

        // Обновляем пользователя
        await this.usersService.updateUser(user.data.id, updateUserDto);

        // Отправить сообщение пользователю в Telegram
        await notifyUser(
            user.data.telegramId,
            `✅ Оплата успешно завершена! Спасибо за использование нашего сервиса.`
        );
    }

    private async handlePaymentFailed(object: any): Promise<void> {
        const paymentId = object.id;

        // Найти транзакцию по transactionId
        const transaction = await this.transactionsService.getTransactionByTransactionId(paymentId);

        if (!transaction || !transaction.success || !transaction.data) {
            throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
        }

        const transactionData: GetTransactionDto = transaction.data;

        // Обновление статуса транзакции
        const updateTransactionDto: UpdateTransactionDto = {
            id: transactionData.id,
            status: TransactionStatusesEnum.FAILED,
        };

        await this.transactionsService.updateTransaction(transactionData.id, updateTransactionDto);

        // Найти пользователя по userId
        const user: ApiResponse<GetUserDto> = await this.usersService.getUser(transactionData.id);

        if (!user.data || !user.data.telegramId) {
            throw new HttpException('User not found or Telegram ID missing', HttpStatus.NOT_FOUND);
        }

        // Отправить сообщение пользователю в Telegram
        await notifyUser(
            user.data.telegramId,
            `❌ К сожалению, ваша оплата была отменена. Если у вас возникли вопросы или проблемы, пожалуйста, свяжитесь с нашей службой поддержки. Мы всегда готовы помочь!`
        );
    }

    private async handlePaymentCanceled(object: any): Promise<void> {
        const paymentId = object.id;
    
        // Найти транзакцию по transactionId
        const transaction = await this.transactionsService.getTransactionByTransactionId(paymentId);
    
        if (!transaction || !transaction.success || !transaction.data) {
            throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
        }
    
        const transactionData: GetTransactionDto = transaction.data;
    
        // Обновление статуса транзакции
        const updateTransactionDto: UpdateTransactionDto = {
            id: transactionData.id,
            status: TransactionStatusesEnum.CANCELED,
        };
    
        await this.transactionsService.updateTransaction(transactionData.id, updateTransactionDto);
    
        // Найти пользователя по userId
        const user: ApiResponse<GetUserDto> = await this.usersService.getUser (transactionData.id);
    
        if (!user.data || !user.data.telegramId) {
            throw new HttpException('User  not found or Telegram ID missing', HttpStatus.NOT_FOUND);
        }
    
        // Отправить сообщение пользователю в Telegram
        await notifyUser (
            user.data.telegramId,
            `❌ Ваш платеж был отменен. Если у вас возникли вопросы или проблемы, пожалуйста, свяжитесь с нашей службой поддержки. Мы всегда готовы помочь!`
        );
    }
}