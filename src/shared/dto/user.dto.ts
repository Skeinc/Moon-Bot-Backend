import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsInt()
    telegramId: number;

    @IsOptional()
    @IsString()
    username?: string;
    
    @IsNotEmpty()
    @IsInt()
    roleId: number;

    @IsOptional()
    @IsInt()
    requestsLeft?: number;

    @IsOptional()
    @IsDate()
    subscriptionExpiry?: Date;

    @IsOptional()
    @IsUUID()
    referrerId?: string;

    @IsNotEmpty()
    @IsString()
    referralLink: string;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsDate()
    lastLogin?: Date;
}

export class GetUserDto extends UserDto {}

export class CreateUserDto extends UserDto {
    @IsNotEmpty()
    telegramId: number;
}

export class UpdateUserDto extends PartialType(UserDto) {}