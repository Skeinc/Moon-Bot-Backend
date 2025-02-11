import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString, IsNotEmpty, IsInt } from "class-validator";

export class RoleDto {
    @IsNotEmpty()
    @IsInt()
    id: number;

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