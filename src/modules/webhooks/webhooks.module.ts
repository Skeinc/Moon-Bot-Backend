import { TransactionsModule } from "@modules/transactions/transactions.module";
import { Module } from "@nestjs/common";
import { WebhooksController } from "./webhooks.controller";
import { WebhooksService } from "./webhooks.service";
import { UsersModule } from "@modules/users/users.module";
import { TariffsModule } from "@modules/tariffs/tariffs.module";

@Module({
    imports: [
        TransactionsModule,
        TariffsModule,
        UsersModule,
    ],
    controllers: [
        WebhooksController,
    ],
    providers: [
        WebhooksService,
    ],
})
export class WebhooksModule {}