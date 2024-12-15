import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "@shared/entities/role.entity";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleEntity]),
    ],
    controllers: [
        RolesController,
    ],
    providers: [
        RolesService,
    ],
})
export class RolesModule {}