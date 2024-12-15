import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString, IsNotEmpty, IsInt } from "class-validator";

export class RoleDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class CreateRoleDto extends RoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateRoleDto extends PartialType(RoleDto) {}

export class DeleteRoleDto {
    @IsNotEmpty()
    @IsInt()
    id: number;
}