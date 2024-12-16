import { PartialType } from "@nestjs/mapped-types";
import { TransactionStatusesEnum, TransactionTypesEnum } from "@shared/enums/transaction.enum";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class TransactionDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    currency: string;

    @IsEnum(TransactionTypesEnum)
    @IsNotEmpty()
    type: TransactionTypesEnum;

    @IsEnum(TransactionStatusesEnum)
    @IsNotEmpty()
    status: TransactionStatusesEnum;

    @IsNotEmpty()
    @IsNumber()
    paymentMethodId: number;

    @IsOptional()
    @IsNumber()
    transactionId?: string;

    @IsOptional()
    @IsUUID()
    tariffId?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsDate()
    finishedAt?: Date;
}

export class GetTransactionDto extends TransactionDto {}

export class CreateTransactionDto extends TransactionDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    currency: string;

    @IsEnum(TransactionTypesEnum)
    @IsNotEmpty()
    type: TransactionTypesEnum;

    @IsEnum(TransactionStatusesEnum)
    @IsNotEmpty()
    status: TransactionStatusesEnum;

    @IsNotEmpty()
    @IsNumber()
    paymentMethodId: number;
}

export class UpdateTransactionDto extends PartialType(TransactionDto) {}