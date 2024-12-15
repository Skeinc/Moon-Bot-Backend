import { PartialType } from "@nestjs/mapped-types";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UserDto {
    @IsOptional()
    @IsUUID()
    id?: string;

    @IsInt()
    telegramId: number;

    @IsOptional()
    @IsString()
    username?: string;
    
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