import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@shared/entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { RoleEntity } from "@shared/entities/role.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    ],
    controllers: [
        UsersController,
    ],
    providers: [
        UsersService,
    ],
})
export class UsersModule {}