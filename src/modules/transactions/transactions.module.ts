import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { TransactionEntity } from "@shared/entities/transaction.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { PaymentMethodEntity } from "@shared/entities/payment-method.entity";
import { TariffEntity } from "@shared/entities/tariff.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TransactionEntity, UserEntity, PaymentMethodEntity, TariffEntity]),
    ],
    controllers: [
        TransactionsController,
    ],
    providers: [
        TransactionsService,
    ]
})
export class TransactionsModule {}