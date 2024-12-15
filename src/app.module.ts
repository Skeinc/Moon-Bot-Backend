import { DatabaseModule } from '@database/database.module';
import { PaymentMethodsModule } from '@modules/payment-methods/payment-methods.module';
import { ReferralsModule } from '@modules/referrals/referrals.module';
import { RolesModule } from '@modules/roles/roles.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		PaymentMethodsModule,
		ReferralsModule,
		DatabaseModule,
		UsersModule,
		RolesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}