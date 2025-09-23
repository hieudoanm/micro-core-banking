import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('api/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
}
