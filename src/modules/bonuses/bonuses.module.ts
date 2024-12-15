import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BonusEntity } from "@shared/entities/bonus.entity";
import { BonusesService } from "./bonuses.service";
import { BonusesController } from "./bonuses.controller";
import { UserEntity } from "@shared/entities/user.entity";
import { ReferralEntity } from "@shared/entities/referral.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([BonusEntity, UserEntity, ReferralEntity]),
    ],
    controllers: [
        BonusesController,
    ],
    providers: [
        BonusesService,
    ],
})
export class BonusesModule {}