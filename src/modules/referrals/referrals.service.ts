import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateReferralDto, ReferralDto, UpdateReferralDto } from "@shared/dto/referral.dto";
import { ReferralEntity } from "@shared/entities/referral.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { mapReferral } from "@shared/utils/mapper.util";
import { Repository } from "typeorm";

@Injectable()
export class ReferralsService {
    constructor(
        @InjectRepository(ReferralEntity)
        private readonly referralRepository: Repository<ReferralEntity>,
        
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async getAllReferrals(): Promise<ApiResponse<ReferralDto[]>> {
        try {
            const referrals = await this.referralRepository.find({
                relations: ["referrer", "referredUser"],
            });

            const mappedReferrals = referrals.map(mapReferral);

            return new ApiResponse(true, "Referrals retrieved successfully", mappedReferrals);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getReferralById(id: string): Promise<ApiResponse<ReferralDto>> {
        try {
            const referral = await this.referralRepository.findOne({
                where: { id },
                relations: ["referrer", "referredUser"],
            });

            if (!referral) {
                throw new HttpException("Referral not found", HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, "Referral retrieved successfully", mapReferral(referral));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getReferralsByReferrerId(referrerId: string): Promise<ApiResponse<ReferralDto[]>> {
        try {
            const referrals = await this.referralRepository.find({
                where: { referrer: { id: referrerId } },
                relations: ["referredUser"],
            });

            const mappedReferrals = referrals.map(referral => ({
                id: referral.id,
                referrerId: referrerId || null,
                referredUserId: referral.referredUser?.id || null,
                bonusCount: referral.bonusCount,
                createdAt: referral.createdAt,
                updatedAt: referral.updatedAt,
            }));

            return new ApiResponse(true, "Referrals by referrer retrieved successfully", mappedReferrals);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getReferralsByReferredUserId(referredUserId: string): Promise<ApiResponse<ReferralDto[]>> {
        try {
            const referrals = await this.referralRepository.find({
                where: { referredUser: { id: referredUserId } },
                relations: ["referrer"],
            });

            const mappedReferrals = referrals.map(referral => ({
                id: referral.id,
                referrerId: referral.referrer?.id || null,
                referredUserId: referredUserId || null,
                bonusCount: referral.bonusCount,
                createdAt: referral.createdAt,
                updatedAt: referral.updatedAt,
            }));

            return new ApiResponse(true, "Referrals by referred user retrieved successfully", mappedReferrals);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createReferral(createReferralDto: CreateReferralDto): Promise<ApiResponse<ReferralEntity>> {
        try {
            const { referrerId, referredUserId } = createReferralDto;
    
            const referrer = await this.userRepository.findOne({ where: { id: referrerId } });
            const referredUser = await this.userRepository.findOne({ where: { id: referredUserId } });

            if (!referrer) {
                return new ApiResponse(false, 'Referrer not found', null);
            }

            if (!referredUser) {
                return new ApiResponse(false, 'Referred user not found', null);
            }
    
            const referral = this.referralRepository.create({
                referrer,
                referredUser,
            });
    
            const savedReferral = await this.referralRepository.save(referral);

            referredUser.referrer = referrer;
            await this.userRepository.save(referredUser );
    
            return new ApiResponse(true, "Referral created successfully", savedReferral);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateReferral(updateReferralDto: UpdateReferralDto): Promise<ApiResponse<ReferralDto>> {
        try {
            const { id, ...updateData } = updateReferralDto;

            await this.referralRepository.update(id, updateData);

            const updatedReferral = await this.getReferralById(id);
            return new ApiResponse(true, "Referral updated successfully", updatedReferral.data);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteReferral(id: string): Promise<ApiResponse<null>> {
        try {
            const deleteResult = await this.referralRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new HttpException("Referral not found", HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, "Referral deleted successfully", null);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}