import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAccountDto } from './account.dto';
import { AccountService } from './account.service';

@ApiTags('Accounts') // Groups all endpoints under "Accounts" in Swagger UI
@Controller('api/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * Create a new account
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new bank account' })
  @ApiBody({ type: CreateAccountDto })
  @ApiResponse({
    status: 201,
    description: 'The account has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed.',
  })
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.createAccount(createAccountDto);
  }

  /**
   * Get all accounts
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all accounts' })
  @ApiResponse({
    status: 200,
    description: 'List of all accounts.',
  })
  async getAllAccounts() {
    return this.accountService.getAllAccounts();
  }

  /**
   * Get account by account number
   */
  @Get(':accountNumber')
  @ApiOperation({ summary: 'Get an account by account number' })
  @ApiParam({
    name: 'accountNumber',
    type: String,
    description: 'The unique account number to retrieve',
    example: 'ACCT-1695453892990',
  })
  @ApiResponse({
    status: 200,
    description: 'Account details retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found.',
  })
  async getAccountByNumber(@Param('accountNumber') accountNumber: string) {
    return this.accountService.getAccountByNumber(accountNumber);
  }
}
