import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNotEmpty, IsInt, IsBoolean } from "class-validator";

export class PaymentMethodDto {
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}

export class CreatePaymentMethodDto extends PaymentMethodDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdatePaymentMethodDto extends PartialType(PaymentMethodDto) {}