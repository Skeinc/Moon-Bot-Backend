import { DatabaseModule } from '@database/database.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}