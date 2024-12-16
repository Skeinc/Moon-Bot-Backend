import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateTransactionDto, GetTransactionDto, TransactionDto, UpdateTransactionDto } from "@shared/dto/transaction.dto";
import { TransactionStatusesEnum, TransactionTypesEnum } from "@shared/enums/transaction.enum";

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService
    ) {}

    @Get()
    async getAllTransactions(): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            return await this.transactionsService.getAllTransactions();
        } catch (error) {
            return new ApiResponse(false, 'Failed to retrieve transactions', null);
        }
    }

    @Get(':id')
    async getTransaction(@Param('id') id: string): Promise<ApiResponse<GetTransactionDto>> {
        try {
            return await this.transactionsService.getTransaction(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve transaction with ID ${id}`, null);
        }
    }

    @Get('/by-user/:userId')
    async getTransactionsByUserId(@Param('userId') userId: string): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            return await this.transactionsService.getTransactionsByUserId(userId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve transactions for user with ID ${userId}`, null);
        }
    }

    @Get('/by-type/:type')
    async getTransactionsByType(@Param('type') type: TransactionTypesEnum): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            return await this.transactionsService.getTransactionsByType(type);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve transactions for type ${type}`, null);
        }
    }

    @Get('/by-status/:status')
    async getTransactionsByStatus(@Param('status') status: TransactionStatusesEnum): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            return await this.transactionsService.getTransactionsByStatus(status);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve transactions for status ${status}`, null);
        }
    }

    @Get('/by-payment-method/:paymentMethodId')
    async getTransactionsByPaymentMethod(@Param('paymentMethodId') paymentMethodId: number): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            return await this.transactionsService.getTransactionsByPaymentMethod(paymentMethodId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve transactions for payment method with ID ${paymentMethodId}`, null);
        }
    }

    @Get('/by-transaction/:transactionId')
    async getTransactionsByTransactionId(@Param('transactionId') transactionId: string): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            return await this.transactionsService.getTransactionsByTransactionId(transactionId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve transactions for transaction ID ${transactionId}`, null);
        }
    }

    @Get('/by-tariff/:tariffId')
    async getTransactionsByTariffId(@Param('tariffId') tariffId: string): Promise<ApiResponse<GetTransactionDto[]>> {
        try {
            return await this.transactionsService.getTransactionsByTariffId(tariffId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve transactions for tariff ID ${tariffId}`, null);
        }
    }

    @Post()
    async createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<ApiResponse<TransactionDto>> {
        try {
            return await this.transactionsService.createTransaction(createTransactionDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to create transaction', null);
        }
    }

    @Put()
    async updateTransaction(@Body() updateTransactionDto: UpdateTransactionDto): Promise<ApiResponse<GetTransactionDto>> {
        try {
            if (!updateTransactionDto.id) {
                return new ApiResponse(false, 'Transaction ID is required in the request body', null);
            }

            return await this.transactionsService.updateTransaction(updateTransactionDto.id, updateTransactionDto);
        } catch (error) {
            return new ApiResponse(false, `Failed to update transaction with ID ${updateTransactionDto.id}`, null);
        }
    }

    @Delete()
    async deleteTransaction(@Body('id') id: string): Promise<ApiResponse<null>> {
        try {
            if (!id) {
                return new ApiResponse(false, 'Transaction ID is required in the request body', null);
            }

            return await this.transactionsService.deleteTransaction(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to delete transaction with ID ${id}`, null);
        }
    }
}