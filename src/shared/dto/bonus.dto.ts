import { PartialType } from "@nestjs/mapped-types";
import { BonusTypeEnum } from "@shared/enums/bonuses.enum";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";

export class BonusDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsUUID()
    @IsOptional()
    referralId: string;

    @IsEnum(BonusTypeEnum)
    @IsNotEmpty()
    bonusType: BonusTypeEnum;

    @IsNumber()
    @IsNotEmpty()
    bonusValue: number;

    @IsOptional()
    @IsBoolean()
    isRedeemed?: boolean;

    @IsOptional()
    @IsDate()
    expiresAt?: Date;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}

export class GetBonusDto extends BonusDto {}

export class CreateBonusDto extends BonusDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsEnum(BonusTypeEnum)
    @IsNotEmpty()
    bonusType: BonusTypeEnum;

    @IsNumber()
    @IsNotEmpty()
    bonusValue: number;
}

export class UpdateBonusDto extends PartialType(BonusDto) {}