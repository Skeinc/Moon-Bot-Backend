import { DatabaseModule } from '@database/database.module';
import { BonusesModule } from '@modules/bonuses/bonuses.module';
import { PaymentMethodsModule } from '@modules/payment-methods/payment-methods.module';
import { ReferralsModule } from '@modules/referrals/referrals.module';
import { RequestsModule } from '@modules/requests/requests.module';
import { RolesModule } from '@modules/roles/roles.module';
import { TariffsModule } from '@modules/tariffs/tariffs.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		PaymentMethodsModule,
		ReferralsModule,
		DatabaseModule,
		RequestsModule,
		BonusesModule,
		TariffsModule,
		UsersModule,
		RolesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}