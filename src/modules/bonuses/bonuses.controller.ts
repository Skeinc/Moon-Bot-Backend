import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BonusesService } from "./bonuses.service";
import { ApiResponse } from "@shared/dto/api.dto";
import { BonusDto, CreateBonusDto, GetBonusDto, UpdateBonusDto } from "@shared/dto/bonus.dto";
import { BonusTypeEnum } from "@shared/enums/bonuses.enum";
import { BonusEntity } from "@shared/entities/bonus.entity";

@Controller('bonuses')
export class BonusesController {
    constructor(
        private readonly bonusesService: BonusesService,
    ) {}

    @Get()
    async getAllBonuses(): Promise<ApiResponse<GetBonusDto[]>> {
        try {
            return await this.bonusesService.getAllBonuses();
        } catch (error) {
            return new ApiResponse(false, 'Failed to retrieve bonuses', null);
        }
    }

    @Get(':id')
    async getBonusById(@Param('id') id: string): Promise<ApiResponse<GetBonusDto>> {
        try {
            return await this.bonusesService.getBonusById(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve bonus with ID ${id}`, null);
        }
    }

    @Get('/by-user/:userId')
    async getBonusesByUserId(@Param('userId') userId: string): Promise<ApiResponse<GetBonusDto[]>> {
        try {
            return await this.bonusesService.getBonusesByUserId(userId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve bonuses for user with ID ${userId}`, null);
        }
    }

    @Get('/by-referral/:referralId')
    async getBonusesByReferralId(@Param('referralId') referralId: string,): Promise<ApiResponse<GetBonusDto[]>> {
        try {
            return await this.bonusesService.getBonusesByReferralId(referralId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve bonuses for referral with ID ${referralId}`, null);
        }
    }

    @Get('/by-type/:bonusType')
    async getBonusesByType(@Param('bonusType') bonusType: BonusTypeEnum): Promise<ApiResponse<GetBonusDto[]>> {
        try {
            return await this.bonusesService.getBonusesByType(bonusType);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve bonuses of type ${bonusType}`, null);
        }
    }

    @Post()
    async createBonus(@Body() createBonusDto: CreateBonusDto): Promise<ApiResponse<BonusEntity>> {
        try {
            return await this.bonusesService.createBonus(createBonusDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to create bonus', null);
        }
    }

    @Put()
    async updateBonus(@Body() updateBonusDto: UpdateBonusDto): Promise<ApiResponse<BonusDto>> {
        try {
            if (!updateBonusDto.id) {
                return new ApiResponse(false, 'Bonus ID is required in the request body', null);
            }

            return await this.bonusesService.updateBonus(updateBonusDto.id, updateBonusDto);
        } catch (error) {
            console.log(error);
            return new ApiResponse(false, `Failed to update bonus with ID ${updateBonusDto.id}`, null);
        }
    }

    @Delete()
    async deleteBonus(@Body('id') id: string): Promise<ApiResponse<null>> {
        try {
            if (!id) {
                return new ApiResponse(false, 'Bonus ID is required in the request body', null);
            }

            return await this.bonusesService.deleteBonus(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to delete bonus with ID ${id}`, null);
        }
    }
}