import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './account.dto';

@Controller('api/v1/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * Create a new account
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createAccount(createAccountDto);
  }

  /**
   * Get all accounts
   */
  @Get()
  async getAllAccounts() {
    return this.accountService.getAllAccounts();
  }

  /**
   * Get account by account number
   */
  @Get(':accountNumber')
  async getAccountByNumber(@Param('accountNumber') accountNumber: string) {
    return this.accountService.getAccountByNumber(accountNumber);
  }
}
