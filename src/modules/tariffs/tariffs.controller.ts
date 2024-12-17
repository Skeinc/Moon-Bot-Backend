import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TariffsService } from "./tariffs.service";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateTariffDto, GetTariffDto, UpdateTariffDto } from "@shared/dto/tariff.dto";
import { TariffEntity } from "@shared/entities/tariff.entity";

@Controller('tariffs')
export class TariffsController {
    constructor(
        private readonly tariffsService: TariffsService
    ) {}

    @Get()
    async getAllTariffs(): Promise<ApiResponse<GetTariffDto[]>> {
        try {
            return await this.tariffsService.getAllTariffs();
        } catch (error) {
            return new ApiResponse(false, 'Failed to retrieve tariffs', null);
        }
    }

    @Get(':id')
    async getTariff(@Param('id') id: string): Promise<ApiResponse<GetTariffDto>> {
        try {
            return await this.tariffsService.getTariff(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve tariff with ID ${id}`, null);
        }
    }

    @Get('/by-payment-method/:paymentMethodId')
    async getTariffsByPaymentMethod(@Param('paymentMethodId') paymentMethodId: number): Promise<ApiResponse<GetTariffDto[]>> {
        try {
            return await this.tariffsService.getTariffsByPaymentMethod(paymentMethodId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve tariffs for payment method with ID ${paymentMethodId}`, null);
        }
    }

    @Post()
    async createTariff(@Body() createTariffDto: CreateTariffDto): Promise<ApiResponse<TariffEntity>> {
        try {
            return await this.tariffsService.createTariff(createTariffDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to create tariff', null);
        }
    }

    @Put()
    async updateTariff(@Body() updateTariffDto: UpdateTariffDto): Promise<ApiResponse<GetTariffDto>> {
        try {
            if (!updateTariffDto.id) {
                return new ApiResponse(false, 'Tariff ID is required in the request body', null);
            }

            if(!updateTariffDto.paymentMethodId) {
                return new ApiResponse(false, 'Payment method ID is required in the request body', null); 
            }

            return await this.tariffsService.updateTariff(updateTariffDto.id, updateTariffDto);
        } catch (error) {
            console.log(error);
            return new ApiResponse(false, `Failed to update tariff with ID ${updateTariffDto.id}`, null);
        }
    }

    @Delete()
    async deleteTariff(@Body('id') id: string): Promise<ApiResponse<null>> {
        try {
            if (!id) {
                return new ApiResponse(false, 'Tariff ID is required in the request body', null);
            }

            return await this.tariffsService.deleteTariff(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to delete tariff with ID ${id}`, null);
        }
    }
}