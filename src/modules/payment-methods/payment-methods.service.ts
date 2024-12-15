import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreatePaymentMethodDto, PaymentMethodDto, UpdatePaymentMethodDto } from "@shared/dto/payment-method.dto";
import { PaymentMethodEntity } from "@shared/entities/payment-method.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentMethodsService {
    constructor (
        @InjectRepository(PaymentMethodEntity)
        private readonly paymentMethodRepository: Repository<PaymentMethodEntity>
    ) {}

    async getAllPaymentMethods(): Promise<ApiResponse<PaymentMethodDto[]>> {
        try {
            const paymentMethods = await this.paymentMethodRepository.find();

            return new ApiResponse(true, 'Payment methods retrieved successfully', paymentMethods);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPaymentMethod(id: number): Promise<ApiResponse<PaymentMethodDto>> {
        try {
            const paymentMethod = await this.paymentMethodRepository.findOneBy({ id });

            if(!paymentMethod) {
                throw new HttpException('Payment method not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Payment method retrieved successfully', paymentMethod);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createPaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto): Promise<ApiResponse<PaymentMethodEntity>> {
        try {
            const paymentMethod = this.paymentMethodRepository.create(createPaymentMethodDto);

            const savedPaymentMethod = await this.paymentMethodRepository.save(paymentMethod);

            return new ApiResponse(true, 'Payment method created successfully', savedPaymentMethod);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePaymentMethod(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<ApiResponse<PaymentMethodDto>> {
        try {
            await this.paymentMethodRepository.update({ id }, updatePaymentMethodDto);

            const updatedPaymentMethod = await this.getPaymentMethod(id);

            return new ApiResponse(true, 'Payment method updated successfully', updatedPaymentMethod.data);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deletePaymentMethod(id: number): Promise<ApiResponse<null>> {
        try {
            const deleteResult = await this.paymentMethodRepository.delete(id);

            if(deleteResult.affected === 0) {
                throw new HttpException('Payment method not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Payment method deleted successfully', null);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}