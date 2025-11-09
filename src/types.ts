export interface ChatbotConfig {
  chatbotName: string;
  welcomeMessage: string;
  businessProfile: 'ecommerce' | 'saas' | 'professional' | 'content';
  primaryLanguage: string;
  primaryColor: string;
  avatarUrl?: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AskMySiteProps {
  apiKey: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  apiBaseUrl?: string;
}
