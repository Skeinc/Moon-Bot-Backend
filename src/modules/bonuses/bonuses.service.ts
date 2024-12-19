import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { BonusDto, CreateBonusDto, GetBonusDto, UpdateBonusDto } from "@shared/dto/bonus.dto";
import { BonusEntity } from "@shared/entities/bonus.entity";
import { ReferralEntity } from "@shared/entities/referral.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { BonusTypeEnum } from "@shared/enums/bonuses.enum";
import { mapBonus } from "@shared/utils/mapper.util";
import { Repository } from "typeorm";

@Injectable()
export class BonusesService {
    constructor(
        @InjectRepository(BonusEntity)
        private readonly bonusRepository: Repository<BonusEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(ReferralEntity)
        private readonly referralRepository: Repository<ReferralEntity>,
    ) { }

    async getAllBonuses(): Promise<ApiResponse<GetBonusDto[]>> {
        try {
            const bonuses = await this.bonusRepository.find({
                relations: ['user', 'referral'],
            });

            const mappedBonuses = bonuses.map(mapBonus);

            return new ApiResponse(true, 'All bonuses retrieved successfully', mappedBonuses);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBonusById(id: string): Promise<ApiResponse<GetBonusDto>> {
        try {
            const bonus = await this.bonusRepository.findOne({
                where: { id },
                relations: ['user', 'referral'],
            });

            if (!bonus) {
                throw new HttpException('Bonus not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Bonus retrieved successfully by ID', mapBonus(bonus));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBonusesByUserId(userId: string): Promise<ApiResponse<GetBonusDto[]>> {
        try {
            const bonuses = await this.bonusRepository.find({
                where: { user: { id: userId } },
                relations: ['user', 'referral'],
            });

            const mappedBonuses = bonuses.map(mapBonus);

            return new ApiResponse(true, 'Bonuses retrieved successfully by user ID', mappedBonuses);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBonusesByReferralId(referralId: string): Promise<ApiResponse<GetBonusDto[]>> {
        try {
            const bonuses = await this.bonusRepository.find({
                where: { referral: { id: referralId } },
                relations: ['user', 'referral'],
            });

            const mappedBonuses = bonuses.map(mapBonus);

            return new ApiResponse(true, 'Bonuses retrieved successfully by referral ID', mappedBonuses);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBonusesByType(bonusType: BonusTypeEnum | string): Promise<ApiResponse<GetBonusDto[]>> {
        try {
            const bonuses = await this.bonusRepository.find({
                where: { bonusType },
                relations: ['user', 'referral'],
            });

            const mappedBonuses = bonuses.map(mapBonus);

            return new ApiResponse(true, 'Bonuses retrieved successfully by bonus type', mappedBonuses);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createBonus(createBonusDto: CreateBonusDto): Promise<ApiResponse<BonusEntity>> {
        try {
            const user = await this.userRepository.findOne({ where: { id: createBonusDto.userId } });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
            }

            const bonus = this.bonusRepository.create({
                ...createBonusDto,
                user,
            });

            const savedBonus = await this.bonusRepository.save(bonus);

            if (bonus.bonusType === BonusTypeEnum.REQUESTS || bonus.bonusType === BonusTypeEnum.SUBSCRIPTION_CHANNEL) {
                await this.addRequestsToUser(user.id, bonus.bonusValue);
            }

            return new ApiResponse(true, 'Bonus created successfully', savedBonus);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addRequestsToUser(userId: string, bonusValue: number): Promise<void> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            user.requestsLeft += bonusValue;

            await this.userRepository.save(user);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateBonus(id: string, updateBonusDto: UpdateBonusDto): Promise<ApiResponse<BonusDto>> {
        try {
            const existingBonus = await this.bonusRepository.findOne({
                where: { id },
                relations: ['user', 'referral'],
            });

            const existingBonusValue: number = existingBonus.bonusValue;
    
            if (!existingBonus) {
                throw new HttpException('Bonus not found', HttpStatus.NOT_FOUND);
            }

            if (updateBonusDto.bonusValue !== undefined) {
                existingBonus.bonusValue = updateBonusDto.bonusValue;
            }

            if (existingBonus.bonusType === BonusTypeEnum.REQUESTS && existingBonusValue !== updateBonusDto.bonusValue) {
                const difference = updateBonusDto.bonusValue - existingBonusValue;

                if (difference !== 0) {
                    await this.addRequestsToUser(existingBonus.user.id, difference);
                }
            }
    
            if (updateBonusDto.referralId) {
                const referral = await this.referralRepository.findOne({ where: { id: updateBonusDto.referralId } });

                if (!referral) {
                    throw new HttpException('Referral not found', HttpStatus.BAD_REQUEST);
                }
                existingBonus.referral = referral;
            }
    
            await this.bonusRepository.save(existingBonus);
    
            const updatedBonus = await this.getBonusById(id);
    
            return new ApiResponse(true, 'Bonus updated successfully', updatedBonus.data);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteBonus(id: string): Promise<ApiResponse<null>> {
        try {
            const deleteResult = await this.bonusRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new HttpException('Bonus not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Bonus deleted successfully', null);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}