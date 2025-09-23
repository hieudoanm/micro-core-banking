import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../../common/prisma.service';
import { CreateTransactionDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a transaction with optional related account (e.g., transfer).
   */
  async createTransaction(dto: CreateTransactionDto) {
    // Validate main account
    const account = await this.prisma.account.findUnique({
      where: { id: parseInt(dto.accountId) },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${dto.accountId} not found`);
    }

    // Handle balance updates based on transaction type
    const amount = new Decimal(dto.amount);

    if (
      dto.transactionType === TransactionType.WITHDRAWAL ||
      dto.transactionType === TransactionType.TRANSFER
    ) {
      if (account.balance < amount) {
        throw new BadRequestException('Insufficient funds');
      }

      await this.prisma.account.update({
        where: { id: parseInt(dto.accountId) },
        data: { balance: account.balance.minus(amount) },
      });
    }

    if (
      dto.transactionType === TransactionType.DEPOSIT ||
      dto.transactionType === TransactionType.TRANSFER
    ) {
      if (dto.transactionType === TransactionType.TRANSFER) {
        throw new BadRequestException(
          'Related account is required for a transfer',
        );
      }

      await this.prisma.account.update({
        where: {
          id: parseInt(dto.accountId),
        },
        data: {
          balance: account.balance.plus(amount),
        },
      });
    }

    // Create transaction record
    return this.prisma.transaction.create({
      data: {
        transactionRef: this.generateTransactionRef(),
        accountId: parseInt(dto.accountId),
        transactionType: dto.transactionType,
        amount,
        currency: dto.currency,
        description: dto.description,
      },
    });
  }

  /**
   * Get all transactions for a specific account.
   */
  async getTransactionsByAccount(accountId: string) {
    return this.prisma.transaction.findMany({
      where: { accountId: parseInt(accountId) },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get a single transaction by its reference ID.
   */
  async getTransactionByRef(transactionRef: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { transactionRef },
    });

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with reference ${transactionRef} not found`,
      );
    }

    return transaction;
  }

  /**
   * Utility: Generate unique transaction reference
   */
  private generateTransactionRef(): string {
    return `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
}
