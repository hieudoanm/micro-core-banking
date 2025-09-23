import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTransactionDto } from './transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * Create a new transaction
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTransaction(@Body() dto: CreateTransactionDto) {
    return this.transactionService.createTransaction(dto);
  }

  /**
   * Get all transactions for a specific account
   */
  @Get('account/:accountId')
  async getTransactionsByAccount(@Param('accountId') accountId: string) {
    return this.transactionService.getTransactionsByAccount(accountId);
  }

  /**
   * Get a single transaction by its reference
   */
  @Get(':transactionRef')
  async getTransactionByRef(@Param('transactionRef') transactionRef: string) {
    return this.transactionService.getTransactionByRef(transactionRef);
  }
}
