import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuditModule } from './modules/audit/audit.module';
import { HealthModule } from './modules/health/health.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [HealthModule, AuditModule, AccountModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
