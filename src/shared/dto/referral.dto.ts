import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

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
    @IsBoolean()
    bonusGranted: boolean;

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