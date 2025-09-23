import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AuditLogResponse } from './audit.dto';
import { AuditService } from './audit.service';

@Controller('api/v1/audit/logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  /**
   * Get a paginated list of audit logs with optional filtering by entity type and action.
   *
   * Example:
   * GET /api/v1/audit-logs?page=1&size=10&entityType=Account&action=CREATE
   */
  @Get()
  async getAuditLogs(
    @Query('page', ParseIntPipe) page = 1,
    @Query('size', ParseIntPipe) size = 10,
    @Query('entityType') entityType?: string,
    @Query('action') action?: string,
  ): Promise<{
    data: AuditLogResponse[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    return this.auditService.getAuditLogs(entityType, action, page, size);
  }

  /**
   * Get a specific audit log by ID.
   *
   * Example:
   * GET /api/v1/audit-logs/123
   */
  @Get(':id')
  async getAuditLogById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AuditLogResponse> {
    return this.auditService.getAuditLogById(id);
  }
}
