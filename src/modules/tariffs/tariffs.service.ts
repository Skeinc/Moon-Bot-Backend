import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateTariffDto, GetTariffDto, UpdateTariffDto } from "@shared/dto/tariff.dto";
import { PaymentMethodEntity } from "@shared/entities/payment-method.entity";
import { TariffEntity } from "@shared/entities/tariff.entity";
import { InternationalSubscribeCallbacksEnum, SubscribeCallbacksEnum } from "@shared/enums/callbacks.enum";
import { mapTariff } from "@shared/utils/mapper.util";
import { Repository } from "typeorm";

@Injectable()
export class TariffsService {
    constructor(
        @InjectRepository(TariffEntity)
        private readonly tariffRepository: Repository<TariffEntity>,

        @InjectRepository(PaymentMethodEntity)
        private readonly paymentMethodRepository: Repository<PaymentMethodEntity>,
    ) {}

    async getAllTariffs(): Promise<ApiResponse<GetTariffDto[]>> {
        try {
            const tariffs = await this.tariffRepository.find({
                relations: ['paymentMethod'],
            });

            const mappedTariffs = tariffs.map(mapTariff);

            return new ApiResponse(true, 'All tariffs retrieved successfully', mappedTariffs);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTariff(id: string): Promise<ApiResponse<GetTariffDto>> {
        try {
            const tariff = await this.tariffRepository.findOne({
                where: { id },
                relations: ['paymentMethod'],
            });

            if (!tariff) {
                throw new HttpException('Tariff not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Tariff retrieved successfully by ID', mapTariff(tariff));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTariffsByPaymentMethod(paymentMethodId: number): Promise<ApiResponse<GetTariffDto[]>> {
        try {
            const tariffs = await this.tariffRepository.find({
                where: { paymentMethod: { id: paymentMethodId } },
                relations: ['paymentMethod'],
            });

            const mappedTariffs = tariffs.map(mapTariff);

            return new ApiResponse(true, 'Tariffs retrieved successfully by payment method', mappedTariffs);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getTariffByCallback(callback: SubscribeCallbacksEnum | InternationalSubscribeCallbacksEnum): Promise<ApiResponse<GetTariffDto>> {
        try {
            const tariff = await this.tariffRepository.findOne({
                where: { callback },
                relations: ['paymentMethod'],
            });
    
            if (!tariff) {
                throw new HttpException('Tariff not found', HttpStatus.NOT_FOUND);
            }
    
            return new ApiResponse(true, 'Tariff retrieved successfully by callback', mapTariff(tariff));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTariff(createTariffDto: CreateTariffDto): Promise<ApiResponse<TariffEntity>> {
        try {
            const paymentMethod = await this.paymentMethodRepository.findOneBy({ id: createTariffDto.paymentMethodId });

            if (!paymentMethod) {
                throw new HttpException('Payment method not found', HttpStatus.NOT_FOUND);
            }

            const tariff = this.tariffRepository.create({
                ...createTariffDto,
                paymentMethod,
            });

            const savedTariff = await this.tariffRepository.save(tariff);

            return new ApiResponse(true, 'Tariff created successfully', savedTariff);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateTariff(id: string, updateTariffDto: UpdateTariffDto): Promise<ApiResponse<GetTariffDto>> {
        try {
            const existingTariff = await this.tariffRepository.findOne({ where: { id } });

            if (!existingTariff) {
                throw new HttpException('Tariff not found', HttpStatus.NOT_FOUND);
            }

            if (updateTariffDto.paymentMethodId) {
                const paymentMethod = await this.paymentMethodRepository.findOneBy({ id: updateTariffDto.paymentMethodId });


                if (!paymentMethod) {
                    throw new HttpException('Payment method not found', HttpStatus.NOT_FOUND);
                }

                existingTariff.paymentMethod = paymentMethod;
            }

            Object.assign(existingTariff, updateTariffDto);

            const savedTariff = await this.tariffRepository.save(existingTariff);

            return new ApiResponse(true, 'Tariff updated successfully', mapTariff(savedTariff));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTariff(id: string): Promise<ApiResponse<null>> {
        try {
            const deleteResult = await this.tariffRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new HttpException('Tariff not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Tariff deleted successfully', null);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}