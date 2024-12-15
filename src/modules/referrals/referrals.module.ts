import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReferralEntity } from "@shared/entities/referral.entity";
import { ReferralsController } from "./referrals.controller";
import { ReferralsService } from "./referrals.service";
import { UserEntity } from "@shared/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReferralEntity, UserEntity]),
    ],
    controllers: [
        ReferralsController,
    ],
    providers: [
        ReferralsService,
    ],
})
export class ReferralsModule {}