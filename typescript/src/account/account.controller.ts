import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('api/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
}
