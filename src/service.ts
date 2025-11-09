import { ChatbotConfig, ChatRequest, ChatResponse, ApiResponse } from './types';

const DEFAULT_API_BASE_URL = 'https://api.askmysite.com';

export class AskMySiteService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || DEFAULT_API_BASE_URL;
  }

  async fetchConfig(): Promise<ChatbotConfig> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chatbot/config`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.statusText}`);
      }

      const result: ApiResponse<ChatbotConfig> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch chatbot configuration');
      }

      return result.data;
    } catch (error) {
      console.error('Error fetching chatbot config:', error);
      throw error;
    }
  }

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const result: ApiResponse<ChatResponse> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to get chat response');
      }

      return result.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
