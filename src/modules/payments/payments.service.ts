import axios from "axios";
import { getEnvironmentConfig } from "@environments/environment.config";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponse } from "@shared/dto/api.dto";
import { CurrencyEnum } from "@shared/enums/currency.enum";

@Injectable()
export class PaymentsService {
    private readonly shopId = getEnvironmentConfig().YOOKASSA_SHOP_ID;
    private readonly secretKey = getEnvironmentConfig().YOOKASSA_SECRET_KEY;

    async createPaymentYooKassa(amount: string, description: string, returnUrl: string): Promise<ApiResponse<any>> {
        const url = 'https://api.yookassa.ru/v3/payments';

        const data = {
            amount: {
                value: amount,
                currency: CurrencyEnum.RUB,
            },
            confirmation: {
                type: 'redirect',
                return_url: returnUrl,
            },
            description: description,
        };

        const authHeader = Buffer.from(`${this.shopId}:${this.secretKey}`).toString('base64');

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Authorization': `Basic ${authHeader}`,
                    'Content-Type': 'application/json',
                    'Idempotence-Key': crypto.randomUUID(),
                },
            });

            return new ApiResponse(true, 'Payment with YooKassa method created successfully', response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.description || error.message;

            throw new HttpException(
                new ApiResponse(false, `Error creating payment with YooKassa method: ${errorMessage}`),
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}