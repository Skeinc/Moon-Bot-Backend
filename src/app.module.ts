import { DatabaseModule } from '@database/database.module';
import { RolesModule } from '@modules/roles/roles.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
		RolesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}