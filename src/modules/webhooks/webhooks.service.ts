import { TransactionsService } from "@modules/transactions/transactions.service";
import { UsersService } from "@modules/users/users.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiResponse } from "@shared/dto/api.dto";
import { GetTransactionDto } from "@shared/dto/transaction.dto";
import { GetUserDto } from "@shared/dto/user.dto";
import { notifyUserWithSuccessPayment } from "@shared/utils/notify-user.util";

export class WebhooksService {
    constructor(
        private readonly transactionsService: TransactionsService,
        private readonly usersService: UsersService,
    ) {}

    async handleYooKassaWebhook(payload: any): Promise<void> {
        console.log(`Обработка вебхука: ${JSON.stringify(payload)}`);

        if (payload.type !== 'notification') {
            throw new HttpException('Invalid notification type', HttpStatus.BAD_REQUEST);
        }

        const { event, object } = payload;

        if (event === 'payment.succeeded') {
            const paymentId = object.id;

            // Найти транзакцию по transactionId
            const transaction = await this.transactionsService.getTransactionByTransactionId(paymentId);

            if (!transaction || !transaction.success || !transaction.data) {
                throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
            }

            const transactionData: GetTransactionDto = transaction.data;

            // Найти пользователя по userId
            const user: ApiResponse<GetUserDto> = await this.usersService.getUser(transactionData.id);

            if (!user.data || !user.data.telegramId) {
                throw new HttpException('User not found or Telegram ID missing', HttpStatus.NOT_FOUND);
            }

            // Отправить сообщение пользователю в Telegram
            await notifyUserWithSuccessPayment(
                user.data.telegramId,
                `✅ Оплата успешно завершена! Спасибо за использование нашего сервиса.`
            );
        }

        console.log(event, object);
    }
}