import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service'; // custom Prisma wrapper
import { CreateAccountDto } from './account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    const accountNumber = this.generateAccountNumber();

    return this.prisma.account.create({
      data: {
        customerId: createAccountDto.customerId,
        accountNumber,
        accountType: createAccountDto.accountType,
        currency: createAccountDto.currency,
        balance: createAccountDto.initialBalance,
        status: 'ACTIVE', // enum from DB
      },
    });
  }

  async getAllAccounts() {
    return this.prisma.account.findMany();
  }

  async getAccountByNumber(accountNumber: string) {
    const account = await this.prisma.account.findUnique({
      where: { accountNumber },
    });

    if (!account) {
      throw new NotFoundException(
        `Account with number ${accountNumber} not found`,
      );
    }
    return account;
  }

  private generateAccountNumber(): string {
    return `ACCT-${Date.now()}`;
  }
}
