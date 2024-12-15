import { PartialType } from "@nestjs/mapped-types";
import { RequestStatusesEnum, RequestTypesEnum } from "@shared/enums/requests.enum";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsObject, IsOptional, IsUUID } from "class-validator";

export class RequestDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsEnum(RequestTypesEnum)
    @IsNotEmpty()
    type: RequestTypesEnum;

    @IsEnum(RequestStatusesEnum)
    @IsOptional()
    status?: RequestStatusesEnum;

    @IsObject()
    @IsNotEmpty()
    requestData: any;

    @IsObject()
    @IsOptional()
    responseData?: any;

    @IsOptional()
    @IsBoolean()
    isPaid?: boolean;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsDate()
    finishedAt?: Date;
}

export class GetRequestDto extends RequestDto {}

export class CreateRequestDto extends RequestDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsEnum(RequestTypesEnum)
    @IsNotEmpty()
    type: RequestTypesEnum;

    @IsObject()
    @IsNotEmpty()
    requestData: any;
}

export class UpdateRequestDto extends PartialType(RequestDto) {
    @IsEnum(RequestTypesEnum)
    @IsOptional()
    type: RequestTypesEnum;

    @IsEnum(RequestStatusesEnum)
    @IsOptional()
    status: RequestStatusesEnum;
}