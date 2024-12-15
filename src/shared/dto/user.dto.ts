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

    @IsOptional()
    @IsUUID()
    roleId?: string;

    @IsOptional()
    @IsInt()
    requestsLeft?: number;

    @IsOptional()
    @IsDate()
    subscriptionExpiry?: Date;

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

export class DeleteUserDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}