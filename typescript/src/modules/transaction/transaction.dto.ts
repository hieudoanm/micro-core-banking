import { TransactionType } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsOptional()
  @IsString()
  relatedAccountId?: string;

  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsOptional()
  @IsString()
  description?: string;
}
