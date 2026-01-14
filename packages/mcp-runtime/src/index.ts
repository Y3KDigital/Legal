import axios, { AxiosInstance } from 'axios';
import type {
  EventSubmissionRequest,
  EventSubmissionResponse,
  Workflow,
  WorkflowType,
  GateStatus,
} from '@mcp-law/types';

export interface MCPClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class MCPOrchestrator Client {
  private client: AxiosInstance;

  constructor(config: MCPClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });
  }

  /**
   * Submit event to MCP orchestrator
   * Triggers workflow execution
   */
  async submitEvent(
    request: EventSubmissionRequest
  ): Promise<EventSubmissionResponse> {
    try {
      const response = await this.client.post('/api/mcp/event', request);
      return response.data;
    } catch (error: any) {
      return {
        status: 'ERROR',
        message: 'Failed to submit event',
        error: error.message,
      };
    }
  }

  /**
   * Get workflow status
   */
  async getWorkflowStatus(workflowId: string): Promise<Workflow | null> {
    try {
      const response = await this.client.get(`/api/mcp/workflows/${workflowId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch workflow status:', error);
      return null;
    }
  }

  /**
   * Execute agent (internal use)
   */
  async executeAgent(
    agentId: string,
    input: Record<string, any>
  ): Promise<{ status: GateStatus; output: Record<string, any> }> {
    try {
      const response = await this.client.post(`/api/mcp/agents/${agentId}/execute`, {
        input,
      });
      return response.data;
    } catch (error: any) {
      return {
        status: GateStatus.FAIL,
        output: { error: error.message },
      };
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export * from '@mcp-law/types';
