import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AuditModule } from './audit/audit.module';
import { HealthModule } from './health/health.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [HealthModule, AuditModule, AccountModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
