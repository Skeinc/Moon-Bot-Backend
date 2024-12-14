import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getEnvironmentConfig } from "@environments/environment.config";

const envConfig = getEnvironmentConfig();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: envConfig.DB_HOST,
            port: envConfig.DB_PORT,
            username: envConfig.DB_USERNAME,
            password: envConfig.DB_PASSWORD,
            database: envConfig.DB_NAME,
            entities: [__dirname + '/../**/*.entity.{ts,js}'],
            synchronize: true,
        }),
    ],
})
export class DatabaseModule { }