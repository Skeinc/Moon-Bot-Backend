import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateTransactionDto, GetTransactionDto, TransactionDto, UpdateTransactionDto } from "@shared/dto/transaction.dto";
import { PaymentMethodEntity } from "@shared/entities/payment-method.entity";
import { TariffEntity } from "@shared/entities/tariff.entity";
import { TransactionEntity } from "@shared/entities/transaction.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { TransactionStatusesEnum, TransactionTypesEnum } from "@shared/enums/transaction.enum";
import { mapTransaction } from "@shared/utils/mapper.util";
import { Repository } from "typeorm";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(PaymentMethodEntity)
        private readonly paymentMethodRepository: Repository<PaymentMethodEntity>,

        @InjectRepository(TariffEntity)
        private readonly tariffRepository: Repository<TariffEntity>,
    ) { }

    async getAllTransactions(): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            const transactions = await this.transactionRepository.find({
                relations: ['user', 'paymentMethod', 'tariff'],
            });

            const mappedTransactions = transactions.map(mapTransaction);

            return new ApiResponse(true, 'All transactions retrieved successfully', mappedTransactions);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTransaction(id: string): Promise<ApiResponse<GetTransactionDto>> {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: { id },
                relations: ['user', 'paymentMethod', 'tariff'],
            });

            if (!transaction) {
                throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Transaction retrieved successfully by ID', mapTransaction(transaction));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async getTransactionsByUserId(userId: string): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            const transactions = await this.transactionRepository.find({
                where: { user: { id: userId } },
                relations: ['user', 'paymentMethod', 'tariff'],
            });
    
            const mappedTransactions = transactions.map(mapTransaction);
    
            return new ApiResponse(true, 'Transactions retrieved successfully by user ID', mappedTransactions);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTransactionsByType(type: TransactionTypesEnum): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            const transactions = await this.transactionRepository.find({
                where: { type },
                relations: ['user', 'paymentMethod', 'tariff'],
            });

            const mappedTransactions = transactions.map(mapTransaction);

            return new ApiResponse(true, 'Transactions retrieved successfully by type', mappedTransactions);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTransactionsByStatus(status: TransactionStatusesEnum): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            const transactions = await this.transactionRepository.find({
                where: { status },
                relations: ['user', 'paymentMethod', 'tariff'],
            });

            const mappedTransactions = transactions.map(mapTransaction);

            return new ApiResponse(true, 'Transactions retrieved successfully by status', mappedTransactions);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTransactionsByPaymentMethod(paymentMethodId: number): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            const transactions = await this.transactionRepository.find({
                where: { paymentMethod: { id: paymentMethodId } },
                relations: ['user', 'paymentMethod', 'tariff'],
            });

            const mappedTransactions = transactions.map(mapTransaction);

            return new ApiResponse(true, 'Transactions retrieved successfully by payment method', mappedTransactions);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTransactionByTransactionId(transactionId: string): Promise<ApiResponse<GetTransactionDto>> {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: { transactionId },
                relations: ['user', 'paymentMethod', 'tariff'],
            });

            if(!transaction) {
                throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Transactions retrieved successfully by transaction ID', mapTransaction(transaction));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTransactionsByTariffId(tariffId: string): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            const transactions = await this.transactionRepository.find({
                where: { tariff: { id: tariffId } },
                relations: ['user', 'paymentMethod', 'tariff'],
            });

            const mappedTransactions = transactions.map(mapTransaction);

            return new ApiResponse(true, 'Transactions retrieved successfully by tariff ID', mappedTransactions);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTransaction(createTransactionDto: CreateTransactionDto): Promise<ApiResponse<TransactionDto>> {
        try {
            const user = await this.userRepository.findOneBy({ id: createTransactionDto.userId });

            if (!user) {
                throw new HttpException('User  not found', HttpStatus.NOT_FOUND);
            }

            const paymentMethod = await this.paymentMethodRepository.findOneBy({ id: createTransactionDto.paymentMethodId });

            if (!paymentMethod) {
                throw new HttpException('Payment method not found', HttpStatus.NOT_FOUND);
            }

            const tariff = createTransactionDto.tariffId ? await this.tariffRepository.findOneBy({ id: createTransactionDto.tariffId }) : null;

            if (!Object.values(TransactionTypesEnum).includes(createTransactionDto.type)) {
                throw new HttpException('Invalid transaction type', HttpStatus.BAD_REQUEST);
            }
    
            if (!Object.values(TransactionStatusesEnum).includes(createTransactionDto.status)) {
                throw new HttpException('Invalid transaction status', HttpStatus.BAD_REQUEST);
            }

            const transaction = this.transactionRepository.create({
                ...createTransactionDto,
                user,
                paymentMethod,
                tariff,
            });

            const savedTransaction = await this.transactionRepository.save(transaction);

            return new ApiResponse(true, 'Transaction created successfully', mapTransaction(savedTransaction));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateTransaction(id: string, updateTransactionDto: UpdateTransactionDto): Promise<ApiResponse<GetTransactionDto>> {
        try {
            const existingTransaction = await this.transactionRepository.findOne({
                where: { id },
                relations: ['user', 'paymentMethod', 'tariff'],
            });

            if (!existingTransaction) {
                throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
            }

            if (updateTransactionDto.paymentMethodId) {
                const paymentMethod = await this.paymentMethodRepository.findOneBy({ id: updateTransactionDto.paymentMethodId });

                if (!paymentMethod) {
                    throw new HttpException('Payment method not found', HttpStatus.NOT_FOUND);
                }

                existingTransaction.paymentMethod = paymentMethod;
            }

            if (updateTransactionDto.tariffId) {
                const tariff = await this.tariffRepository.findOneBy({ id: updateTransactionDto.tariffId });

                if (!tariff) {
                    throw new HttpException('Tariff not found', HttpStatus.NOT_FOUND);
                }

                existingTransaction.tariff = tariff;
            }

            if (updateTransactionDto.type && !Object.values(TransactionTypesEnum).includes(updateTransactionDto.type)) {
                throw new HttpException('Invalid transaction type', HttpStatus.BAD_REQUEST);
            }
    
            if (updateTransactionDto.status && !Object.values(TransactionStatusesEnum).includes(updateTransactionDto.status)) {
                throw new HttpException('Invalid transaction status', HttpStatus.BAD_REQUEST);
            }

            Object.assign(existingTransaction, updateTransactionDto);

            const updatedTransaction = await this.transactionRepository.save(existingTransaction);

            return new ApiResponse(true, 'Transaction updated successfully', mapTransaction(updatedTransaction));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTransaction(id: string): Promise<ApiResponse<null>> {
        try {
            const deleteResult = await this.transactionRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Transaction deleted successfully', null);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}