import { PartialType } from "@nestjs/mapped-types";
import { InternationalSubscribeCallbacksEnum, SubscribeCallbacksEnum } from "@shared/enums/callbacks.enum";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class TariffDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    callback: SubscribeCallbacksEnum | InternationalSubscribeCallbacksEnum;

    @IsNotEmpty()
    @IsNumber()
    paymentMethodId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    currency: string;

    @IsOptional()
    @IsNumber()
    requestLimit?: number;

    @IsOptional()
    @IsNumber()
    duration?: number;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;
}

export class GetTariffDto extends TariffDto {}

export class CreateTariffDto extends TariffDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    callback: SubscribeCallbacksEnum | InternationalSubscribeCallbacksEnum;

    @IsNotEmpty()
    @IsNumber()
    paymentMethodId: number;
}

export class UpdateTariffDto extends PartialType(TariffDto) {}