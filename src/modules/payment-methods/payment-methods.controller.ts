import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PaymentMethodsService } from "./payment-methods.service";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreatePaymentMethodDto, PaymentMethodDto, UpdatePaymentMethodDto } from "@shared/dto/payment-method.dto";
import { PaymentMethodEntity } from "@shared/entities/payment-method.entity";

@Controller('payment-methods')
export class PaymentMethodsController {
    constructor (
        private readonly paymentMethodsService: PaymentMethodsService
    ) {}

    @Get()
    async getAllPaymentMethods(): Promise<ApiResponse<PaymentMethodDto[]>> {
        try {
            return await this.paymentMethodsService.getAllPaymentMethods();
        } catch (error) {
            return new ApiResponse(false, 'Failed to retrieve payment methods', null);
        }
    }

    @Get(':id')
    async getPaymentMethod(@Param('id') id: number): Promise<ApiResponse<PaymentMethodDto>> {
        try {
            return await this.paymentMethodsService.getPaymentMethod(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve payment method with ID ${id}`, null);
        }
    }

    @Post()
    async createPaymentMethod(@Body() createPaymentMethodDto: CreatePaymentMethodDto): Promise<ApiResponse<PaymentMethodEntity>> {
        try {
            return await this.paymentMethodsService.createPaymentMethod(createPaymentMethodDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to create payment method', null);
        }
    }

    @Put()
    async updatePaymentMethod(@Body() updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<ApiResponse<PaymentMethodDto>> {
        try {
            if (!updatePaymentMethodDto.id) {
                return new ApiResponse(false, 'Payment method ID is required in the request body', null);
            }

            return await this.paymentMethodsService.updatePaymentMethod(updatePaymentMethodDto.id, updatePaymentMethodDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to update payment method', null);
        }
    }

    @Delete()
    async deletePaymentMethod(@Body('id') id: number): Promise<ApiResponse<null>> {
        try {
            if (!id) {
                return new ApiResponse(false, 'Payment method ID is required in the request body', null);
            }

            return await this.paymentMethodsService.deletePaymentMethod(id);
        } catch (error) {
            return new ApiResponse(false, 'Failed to delete payment method', null);
        }
    }
}