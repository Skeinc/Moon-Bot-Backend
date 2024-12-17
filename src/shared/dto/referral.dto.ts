import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class ReferralDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    referrerId: string;

    @IsUUID()
    @IsNotEmpty()
    referredUserId: string;

    @IsNotEmpty()
    @IsNumber()
    bonusCount: number;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}

export class CreateReferralDto {
    @IsUUID()
    @IsNotEmpty()
    referrerId: string;

    @IsUUID()
    @IsNotEmpty()
    referredUserId: string;
}

export class UpdateReferralDto extends PartialType(ReferralDto) {}