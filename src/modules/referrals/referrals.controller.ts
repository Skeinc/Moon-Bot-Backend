import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ReferralsService } from "./referrals.service";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateReferralDto, ReferralDto, UpdateReferralDto } from "@shared/dto/referral.dto";
import { ReferralEntity } from "@shared/entities/referral.entity";

@Controller('referrals')
export class ReferralsController {
    constructor(
        private readonly referralsService: ReferralsService
    ) { }

    @Get()
    async getAllReferrals(): Promise<ApiResponse<ReferralDto[]>> {
        try {
            return await this.referralsService.getAllReferrals();
        } catch (error) {
            return new ApiResponse(false, 'Failed to retrieve referrals', null);
        }
    }

    @Get(':id')
    async getReferralById(@Param('id') id: string): Promise<ApiResponse<ReferralDto>> {
        try {
            return await this.referralsService.getReferralById(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve referral with ID ${id}`, null);
        }
    }

    @Get('/by-referrer/:referrerId')
    async getReferralsByReferrerId(@Param('referrerId') referrerId: string): Promise<ApiResponse<ReferralDto[]>> {
        try {
            return await this.referralsService.getReferralsByReferrerId(referrerId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve referrals by referrer ID ${referrerId}`, null);
        }
    }

    @Get('/by-referred-user/:referredUserId')
    async getReferralsByReferredUserId(@Param('referredUserId') referredUserId: string): Promise<ApiResponse<ReferralDto[]>> {
        try {
            return await this.referralsService.getReferralsByReferredUserId(referredUserId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve referrals by referred user ID ${referredUserId}`, null);
        }
    }

    @Post()
    async createReferral(@Body() createReferralDto: CreateReferralDto): Promise<ApiResponse<ReferralEntity>> {
        try {
            if(!createReferralDto.referrerId || !createReferralDto.referredUserId) {
                return new ApiResponse(false, 'Referrer ID and Referred User ID are required in the request body', null);
            }

            return await this.referralsService.createReferral(createReferralDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to create referral', null);
        }
    }

    @Put()
    async updateReferral(@Body() updateReferralDto: UpdateReferralDto): Promise<ApiResponse<ReferralDto>> {
        try {
            if (!updateReferralDto.id) {
                return new ApiResponse(false, 'Referral ID is required in the request body', null);
            }

            return await this.referralsService.updateReferral(updateReferralDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to update referral', null);
        }
    }

    @Delete()
    async deleteReferral(@Body('id') id: string): Promise<ApiResponse<null>> {
        try {
            if (!id) {
                return new ApiResponse(false, 'Referral ID is required in the request body', null);
            }

            return await this.referralsService.deleteReferral(id);
        } catch (error) {
            return new ApiResponse(false, 'Failed to delete referral', null);
        }
    }
}