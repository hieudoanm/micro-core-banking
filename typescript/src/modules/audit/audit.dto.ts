export class AuditLogResponse {
  id: number;
  action: string; // e.g., DEPOSIT, WITHDRAWAL, TRANSFER
  entityType: string; // e.g., Account, Transaction
  entityId: number;
  message: string; // Detailed message about what happened
  createdBy: string; // User or system that performed the action
  createdAt: Date;

  constructor(init?: Partial<AuditLogResponse>) {
    Object.assign(this, init);
  }
}
