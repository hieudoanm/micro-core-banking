import { AccountType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsEnum(AccountType)
  accountType: AccountType;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsPositive()
  initialBalance: number;
}
