import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentMethodEntity } from "@shared/entities/payment-method.entity";
import { TariffEntity } from "@shared/entities/tariff.entity";
import { TariffsController } from "./tariffs.controller";
import { TariffsService } from "./tariffs.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([TariffEntity, PaymentMethodEntity]),
    ],
    controllers: [
        TariffsController,
    ],
    providers: [
        TariffsService,
    ]
})
export class TariffsModule {}