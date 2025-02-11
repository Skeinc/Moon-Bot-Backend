import { GetBonusDto } from "@shared/dto/bonus.dto";
import { ReferralDto } from "@shared/dto/referral.dto";
import { GetRequestDto } from "@shared/dto/request.dto";
import { GetTariffDto } from "@shared/dto/tariff.dto";
import { GetTransactionDto } from "@shared/dto/transaction.dto";
import { GetUserDto } from "@shared/dto/user.dto";
import { BonusEntity } from "@shared/entities/bonus.entity";
import { ReferralEntity } from "@shared/entities/referral.entity";
import { RequestEntity } from "@shared/entities/request.entity";
import { TariffEntity } from "@shared/entities/tariff.entity";
import { TransactionEntity } from "@shared/entities/transaction.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { BonusTypeEnum } from "@shared/enums/bonuses.enum";
import { InternationalSubscribeCallbacksEnum, SubscribeCallbacksEnum } from "@shared/enums/callbacks.enum";
import { RequestStatusesEnum, RequestTypesEnum } from "@shared/enums/requests.enum";
import { TransactionStatusesEnum, TransactionTypesEnum } from "@shared/enums/transaction.enum";

export function mapUser(user: UserEntity): GetUserDto {
    return {
        id: user.id,
        telegramId: user.telegramId,
        username: user.username,
        roleId: user.role?.id || null,
        requestsLeft: user.requestsLeft,
        subscriptionExpiry: user.subscriptionExpiry,
        referrerId: user.referrer?.id || null,
        referralLink: user.referralLink,
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
        bonusCount: referral.bonusCount,
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

export function mapRequest(request: RequestEntity): GetRequestDto {
    return {
        id: request.id,
        userId: request.user.id,
        type: request.type as RequestTypesEnum,
        status: request.status as RequestStatusesEnum,
        requestData: request.requestData,
        responseData: request.responseData,
        isPaid: request.isPaid,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
        finishedAt: request.finishedAt,
    };
}

export function mapTariff(tariff: TariffEntity): GetTariffDto {
    return {
        id: tariff.id,
        name: tariff.name,
        description: tariff.description,
        callback: tariff.callback as SubscribeCallbacksEnum | InternationalSubscribeCallbacksEnum,
        paymentMethodId: tariff.paymentMethod.id,
        price: tariff.price,
        currency: tariff.currency,
        requestLimit: tariff.requestLimit,
        duration: tariff.duration,
        isActive: tariff.isActive,
        createdAt: tariff.createdAt,
        updatedAt: tariff.updatedAt,
    };
}

export function mapTransaction(transaction: TransactionEntity): GetTransactionDto {
    return {
        id: transaction.id,
        userId: transaction.user.id,
        amount: transaction.amount,
        currency: transaction.currency,
        type: transaction.type as TransactionTypesEnum,
        status: transaction.status as TransactionStatusesEnum,
        paymentMethodId: transaction.paymentMethod ? transaction.paymentMethod.id : null,
        transactionId: transaction.transactionId ? transaction.transactionId : null,
        tariffId: transaction.tariff ? transaction.tariff.id : null,
        description: transaction.description,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        finishedAt: transaction.finishedAt,
    };
}