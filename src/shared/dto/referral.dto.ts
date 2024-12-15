import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class ReferralDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsUUID()
    @IsNotEmpty()
    referrerId: string;

    @IsUUID()
    @IsNotEmpty()
    referredUserId: string;

    @IsOptional()
    @IsBoolean()
    bonusGranted?: boolean;

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