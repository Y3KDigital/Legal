import { prisma } from './prisma';

/**
 * Audit Logging Middleware
 * 
 * Logs security-relevant events for compliance and forensics.
 * In production, this should integrate with a centralized logging system
 * like Datadog, Splunk, or the ELK stack.
 */

export enum AuditEventType {
  // Authentication events
  AUTH_LOGIN = 'auth.login',
  AUTH_LOGOUT = 'auth.logout',
  AUTH_FAILED = 'auth.failed',
  AUTH_PASSWORD_RESET = 'auth.password_reset',
  
  // Resource events
  PROJECT_CREATED = 'project.created',
  PROJECT_UPDATED = 'project.updated',
  PROJECT_DELETED = 'project.deleted',
  
  GATE_CREATED = 'gate.created',
  GATE_COMPLETED = 'gate.completed',
  GATE_BLOCKED = 'gate.blocked',
  
  ARTIFACT_UPLOADED = 'artifact.uploaded',
  ARTIFACT_DELETED = 'artifact.deleted',
  
  APPROVAL_GRANTED = 'approval.granted',
  APPROVAL_REVOKED = 'approval.revoked',
  
  // Security events
  RATE_LIMIT_EXCEEDED = 'security.rate_limit_exceeded',
  CSRF_VIOLATION = 'security.csrf_violation',
  UNAUTHORIZED_ACCESS = 'security.unauthorized_access',
  PERMISSION_DENIED = 'security.permission_denied',
  
  // Contract events
  CONTRACT_SCANNED = 'contract.scanned',
  CONTRACT_DEPLOYED = 'contract.deployed',
  ATTESTATION_GENERATED = 'attestation.generated',
}

export interface AuditEvent {
  type: AuditEventType;
  userId?: string;
  userEmail?: string;
  userRole?: string;
  ipAddress?: string;
  userAgent?: string;
  resourceType?: string;
  resourceId?: string;
  action?: string;
  result: 'success' | 'failure';
  metadata?: Record<string, any>;
  timestamp: Date;
}

/**
 * Log an audit event
 */
export async function logAuditEvent(event: AuditEvent): Promise<void> {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[AUDIT]', {
        type: event.type,
        user: event.userEmail || event.userId,
        resource: event.resourceId ? `${event.resourceType}:${event.resourceId}` : event.resourceType,
        result: event.result,
        timestamp: event.timestamp.toISOString(),
      });
    }

    // In production, this should:
    // 1. Write to database audit log table
    // 2. Send to centralized logging system (Datadog, Splunk, etc.)
    // 3. Trigger alerts for critical events
    
    // For now, we'll just log to console
    // TODO: Implement database audit log table when Prisma schema is updated
    
  } catch (error) {
    // Never throw from audit logging - it should be fire-and-forget
    console.error('Failed to log audit event:', error);
  }
}

/**
 * Create an audit logger function for a specific request context
 */
export function createAuditLogger(context: {
  userId?: string;
  userEmail?: string;
  userRole?: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  return async (
    type: AuditEventType,
    result: 'success' | 'failure',
    additional?: {
      resourceType?: string;
      resourceId?: string;
      action?: string;
      metadata?: Record<string, any>;
    }
  ) => {
    await logAuditEvent({
      ...context,
      type,
      result,
      ...additional,
      timestamp: new Date(),
    });
  };
}

/**
 * Extract request context for audit logging
 */
export function getRequestContext(request: any): {
  ipAddress: string;
  userAgent: string;
  userId?: string;
  userEmail?: string;
  userRole?: string;
} {
  return {
    ipAddress: request.ip || request.headers.get?.('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get?.('user-agent') || 'unknown',
    userId: request.headers.get?.('x-user-id') || undefined,
    userEmail: request.headers.get?.('x-user-email') || undefined,
    userRole: request.headers.get?.('x-user-role') || undefined,
  };
}
