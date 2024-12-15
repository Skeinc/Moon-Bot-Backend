import { GetBonusDto } from "@shared/dto/bonus.dto";
import { ReferralDto } from "@shared/dto/referral.dto";
import { GetUserDto } from "@shared/dto/user.dto";
import { BonusEntity } from "@shared/entities/bonus.entity";
import { ReferralEntity } from "@shared/entities/referral.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { BonusTypeEnum } from "@shared/enums/bonuses.enum";

export function mapUser(user: UserEntity): GetUserDto {
    return {
        id: user.id,
        telegramId: user.telegramId,
        username: user.username,
        roleId: user.role?.id || null,
        requestsLeft: user.requestsLeft,
        subscriptionExpiry: user.subscriptionExpiry,
        referrerId: user.referrer?.id || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: user.lastLogin,
    }
}

export function mapReferral(referral: ReferralEntity): ReferralDto {
    return {
        id: referral.id,
        referrerId: referral.referrer?.id || null,
        referredUserId: referral.referredUser?.id || null,
        bonusGranted: referral.bonusGranted,
        createdAt: referral.createdAt,
        updatedAt: referral.updatedAt,
    }
}

export function mapBonus(bonus: BonusEntity): GetBonusDto {
    return {
        id: bonus.id,
        userId: bonus.user?.id || null,
        referralId: bonus.referral?.id || null,
        bonusType: bonus.bonusType as BonusTypeEnum,
        bonusValue: bonus.bonusValue,
        expiresAt: bonus.expiresAt,
        createdAt: bonus.createdAt,
        updatedAt: bonus.updatedAt,
    };
}