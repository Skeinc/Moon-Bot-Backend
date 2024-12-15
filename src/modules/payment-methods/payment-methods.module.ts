import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentMethodEntity } from "@shared/entities/payment-method.entity";
import { PaymentMethodsService } from "./payment-methods.service";
import { PaymentMethodsController } from "./payment-methods.controller";
@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentMethodEntity]),
    ],
    controllers: [
        PaymentMethodsController,
    ],
    providers: [
        PaymentMethodsService,
    ],
})
export class PaymentMethodsModule {}