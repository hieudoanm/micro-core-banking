package io.github.hieudoanm.micro.core.banking.kafka.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AuditLogEvent {
    private String action;
    private String entityType;
    private Long entityId;
    private String message;
    private String createdBy;
    private LocalDateTime createdAt;
}
