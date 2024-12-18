import { Module } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestEntity } from "@shared/entities/request.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { RequestsController } from "./requests.controller";
import { OpenAIModule } from "@config/openAI.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestEntity, UserEntity]),
        OpenAIModule
    ],
    controllers: [
        RequestsController,
    ],
    providers: [
        RequestsService,
    ]
})
export class RequestsModule {}