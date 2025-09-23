import { Controller } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('api/audit/logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}
}
