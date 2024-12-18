import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { getEnvironmentConfig } from '@environments/environment.config';
import { CreatePaymentDto } from '@shared/dto/payment.dto';
import { ApiResponse } from '@shared/dto/api.dto';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService
    ) {}

    @Post('yookassa')
    async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<ApiResponse<any>> {
        const returnUrl = `https://t.me/${getEnvironmentConfig().BOT_USERNAME}`;

        try {
            return await this.paymentsService.createPaymentYooKassa(
                createPaymentDto.amount,
                createPaymentDto.description,
                returnUrl
            );
        } catch (error) {
            return new ApiResponse(false, 'Failed to create payment with YooKassa method', null);
        }
    }
}