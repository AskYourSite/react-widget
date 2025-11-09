# 🔗 Backend Integration Guide

Complete guide for backend developers to implement the API endpoints required by the AskMySite React Widget.

---

## 📋 Table of Contents

1. [API Endpoints Overview](#api-endpoints-overview)
2. [Authentication](#authentication)
3. [Endpoint 1: Get Chatbot Config](#endpoint-1-get-chatbot-config)
4. [Endpoint 2: Send Chat Message](#endpoint-2-send-chat-message)
5. [Error Handling](#error-handling)
6. [Security Implementation](#security-implementation)
7. [Testing](#testing)

---

## 🎯 API Endpoints Overview

The widget requires **2 endpoints** to function:

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/chatbot/config` | GET | Fetch chatbot configuration | API Key |
| `/api/chatbot/chat` | POST | Send/receive messages | API Key |

**Base URL**: `https://api.askmysite.com` (configurable)

---

## 🔑 Authentication

### API Key Format
```
sk_live_1234567890abcdef  (production)
sk_test_1234567890abcdef  (testing)
```

### Request Headers
```http
Authorization: Bearer sk_live_1234567890abcdef
Content-Type: application/json
```

### Validation Steps
1. Extract API key from `Authorization` header
2. Verify key exists in database
3. Check key is active (not revoked)
4. Validate domain origin (from request headers)
5. Check rate limits
6. Return 401 if validation fails

---

## 📡 Endpoint 1: Get Chatbot Config

### Request

```http
GET /api/chatbot/config
Host: api.askmysite.com
Authorization: Bearer sk_live_1234567890abcdef
Origin: https://example.com
```

### Response (Success - 200 OK)

```json
{
  "success": true,
  "data": {
    "chatbotName": "Support Assistant",
    "welcomeMessage": "Hi! I'm here to help you with any questions about our products and services. How can I assist you today?",
    "businessProfile": "ecommerce",
    "primaryLanguage": "en",
    "primaryColor": "#007bff",
    "avatarUrl": "https://cdn.askmysite.com/avatars/bot-123.png",
    "position": "bottom-right"
  }
}
```

### Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `chatbotName` | string | ✅ | Display name (e.g., "Support Bot") |
| `welcomeMessage` | string | ✅ | Initial greeting message |
| `businessProfile` | enum | ✅ | 'ecommerce' \| 'saas' \| 'professional' \| 'content' |
| `primaryLanguage` | string | ✅ | ISO language code (e.g., 'en', 'fr', 'es') |
| `primaryColor` | string | ✅ | Hex color code (e.g., '#007bff') |
| `avatarUrl` | string | ❌ | CDN URL to avatar image (optional) |
| `position` | enum | ✅ | 'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' |

### Backend Logic

```typescript
// Example implementation (Node.js/Express)
app.get('/api/chatbot/config', async (req, res) => {
  try {
    // 1. Extract and validate API key
    const apiKey = req.headers.authorization?.replace('Bearer ', '');
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        error: 'API key required'
      });
    }

    // 2. Fetch chatbot from database
    const chatbot = await db.chatbots.findOne({ apiKey });
    if (!chatbot) {
      return res.status(401).json({
        success: false,
        error: 'Invalid API key'
      });
    }

    // 3. Validate domain origin
    const origin = req.headers.origin;
    if (!chatbot.allowedDomains.includes(origin)) {
      return res.status(403).json({
        success: false,
        error: 'Domain not authorized'
      });
    }

    // 4. Return configuration
    res.json({
      success: true,
      data: {
        chatbotName: chatbot.name,
        welcomeMessage: chatbot.welcomeMessage,
        businessProfile: chatbot.businessProfile,
        primaryLanguage: chatbot.primaryLanguage,
        primaryColor: chatbot.primaryColor,
        avatarUrl: chatbot.avatarUrl,
        position: chatbot.position
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

### Error Responses

```json
// 401 Unauthorized
{
  "success": false,
  "error": "Invalid API key"
}

// 403 Forbidden
{
  "success": false,
  "error": "Domain not authorized"
}

// 500 Internal Server Error
{
  "success": false,
  "error": "Internal server error"
}
```

---

## 💬 Endpoint 2: Send Chat Message

### Request

```http
POST /api/chatbot/chat
Host: api.askmysite.com
Authorization: Bearer sk_live_1234567890abcdef
Content-Type: application/json
Origin: https://example.com

{
  "message": "What are your business hours?",
  "conversationId": "conv_abc123xyz"
}
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | ✅ | User's message (max 2000 chars) |
| `conversationId` | string | ❌ | Optional conversation context ID |

### Response (Success - 200 OK)

```json
{
  "success": true,
  "data": {
    "message": "We're open Monday to Friday, 9 AM to 6 PM EST. We're also available via email 24/7 at support@example.com.",
    "conversationId": "conv_abc123xyz"
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | AI-generated response |
| `conversationId` | string | Conversation ID for context tracking |

### Backend Logic

```typescript
// Example implementation
app.post('/api/chatbot/chat', async (req, res) => {
  try {
    // 1. Validate API key (same as above)
    const apiKey = req.headers.authorization?.replace('Bearer ', '');
    const chatbot = await validateApiKey(apiKey);
    if (!chatbot) {
      return res.status(401).json({
        success: false,
        error: 'Invalid API key'
      });
    }

    // 2. Validate domain
    const origin = req.headers.origin;
    if (!chatbot.allowedDomains.includes(origin)) {
      return res.status(403).json({
        success: false,
        error: 'Domain not authorized'
      });
    }

    // 3. Rate limiting check
    const rateLimitOk = await checkRateLimit(apiKey);
    if (!rateLimitOk) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded'
      });
    }

    // 4. Extract message and conversation ID
    const { message, conversationId } = req.body;

    if (!message || message.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message too long (max 2000 characters)'
      });
    }

    // 5. Retrieve or create conversation
    let conversation;
    if (conversationId) {
      conversation = await db.conversations.findOne({ id: conversationId });
    }
    
    if (!conversation) {
      conversation = await db.conversations.create({
        id: generateConversationId(),
        chatbotId: chatbot.id,
        messages: []
      });
    }

    // 6. Get chatbot context from crawled content
    const context = await db.chatbotContent.findOne({ chatbotId: chatbot.id });

    // 7. Build ChatGPT prompt
    const systemPrompt = buildSystemPrompt(chatbot, context);
    const conversationHistory = conversation.messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    // 8. Call ChatGPT API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // 9. Save messages to conversation
    await db.conversations.update(conversation.id, {
      $push: {
        messages: [
          { role: 'user', content: message, timestamp: new Date() },
          { role: 'assistant', content: aiResponse, timestamp: new Date() }
        ]
      }
    });

    // 10. Log usage for billing
    await logUsage(chatbot.id, {
      type: 'message',
      tokens: completion.usage.total_tokens,
      timestamp: new Date()
    });

    // 11. Return response
    res.json({
      success: true,
      data: {
        message: aiResponse,
        conversationId: conversation.id
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message'
    });
  }
});
```

### System Prompt Builder

```typescript
function buildSystemPrompt(chatbot, context) {
  const profilePrompts = {
    ecommerce: "You are a helpful e-commerce assistant focused on helping customers find products and complete purchases.",
    saas: "You are a technical support assistant helping users understand features and troubleshoot issues.",
    professional: "You are a professional consultant providing expert advice and information.",
    content: "You are a knowledgeable assistant helping users find and understand content."
  };

  return `${profilePrompts[chatbot.businessProfile]}

Your name is ${chatbot.chatbotName}.
You represent a company/website with the following information:

${context.summary}

Important guidelines:
- Respond in ${chatbot.primaryLanguage} language
- Keep responses short, clear, and precise (aim for 2-3 sentences)
- Only answer based on the provided context
- If you don't know something, politely say so and suggest contacting support
- Be friendly, professional, and helpful
- Never make up information not in the context`;
}
```

### Error Responses

```json
// 400 Bad Request
{
  "success": false,
  "error": "Message is required"
}

// 401 Unauthorized
{
  "success": false,
  "error": "Invalid API key"
}

// 403 Forbidden
{
  "success": false,
  "error": "Domain not authorized"
}

// 429 Too Many Requests
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later."
}

// 500 Internal Server Error
{
  "success": false,
  "error": "Failed to process message"
}
```

---

## 🛡️ Security Implementation

### 1. API Key Management

```typescript
// Generate API key
function generateApiKey(type: 'live' | 'test') {
  const prefix = type === 'live' ? 'sk_live_' : 'sk_test_';
  const random = crypto.randomBytes(24).toString('hex');
  return prefix + random;
}

// Hash API key for storage
function hashApiKey(apiKey: string) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}
```

### 2. Domain Validation

```typescript
function validateDomain(chatbot, requestOrigin) {
  // Allow localhost for development
  if (chatbot.environment === 'test' && 
      requestOrigin.includes('localhost')) {
    return true;
  }

  // Check against whitelist
  return chatbot.allowedDomains.some(domain => {
    const originDomain = new URL(requestOrigin).hostname;
    return originDomain === domain || originDomain.endsWith(`.${domain}`);
  });
}
```

### 3. Rate Limiting

```typescript
// Example using Redis
async function checkRateLimit(apiKey: string) {
  const key = `ratelimit:${apiKey}`;
  const limit = 60; // 60 requests per minute
  const window = 60; // 1 minute in seconds

  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, window);
  }

  return count <= limit;
}
```

### 4. Input Sanitization

```typescript
function sanitizeMessage(message: string) {
  // Remove potentially harmful content
  return message
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .substring(0, 2000); // Max length
}
```

---

## 🧪 Testing

### Test API Key
Create test keys for development:
```
sk_test_development123456789
```

### Postman Collection

```json
{
  "info": { "name": "AskMySite Widget API" },
  "item": [
    {
      "name": "Get Config",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer sk_test_development123456789"
          }
        ],
        "url": "https://api.askmysite.com/api/chatbot/config"
      }
    },
    {
      "name": "Send Message",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer sk_test_development123456789"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"message\": \"Hello, can you help me?\"\n}"
        },
        "url": "https://api.askmysite.com/api/chatbot/chat"
      }
    }
  ]
}
```

### cURL Examples

```bash
# Get configuration
curl -X GET https://api.askmysite.com/api/chatbot/config \
  -H "Authorization: Bearer sk_test_development123456789"

# Send message
curl -X POST https://api.askmysite.com/api/chatbot/chat \
  -H "Authorization: Bearer sk_test_development123456789" \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your hours?"}'

# With conversation ID
curl -X POST https://api.askmysite.com/api/chatbot/chat \
  -H "Authorization: Bearer sk_test_development123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Thank you!",
    "conversationId": "conv_abc123xyz"
  }'
```

---

## 📊 Database Schema

### Chatbots Table

```sql
CREATE TABLE chatbots (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  api_key_hash VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  welcome_message TEXT NOT NULL,
  business_profile VARCHAR(50) NOT NULL,
  primary_language VARCHAR(10) NOT NULL,
  primary_color VARCHAR(7) NOT NULL,
  avatar_url TEXT,
  position VARCHAR(20) NOT NULL,
  allowed_domains TEXT[] NOT NULL,
  environment VARCHAR(10) NOT NULL, -- 'test' or 'live'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Conversations Table

```sql
CREATE TABLE conversations (
  id VARCHAR(50) PRIMARY KEY,
  chatbot_id UUID REFERENCES chatbots(id),
  messages JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Usage Logs Table (for billing)

```sql
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY,
  chatbot_id UUID REFERENCES chatbots(id),
  type VARCHAR(20) NOT NULL, -- 'message', 'config'
  tokens INTEGER,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

---

## 🚦 CORS Configuration

```javascript
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Check if origin is in chatbot's allowed domains
    // This is simplified - in production, query database
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
};

app.use(cors(corsOptions));
```

---

## 📈 Monitoring & Logging

### Key Metrics to Track
- API requests per chatbot
- Average response time
- Error rates
- Token usage (for billing)
- Popular questions
- Conversation lengths

### Logging Example

```typescript
logger.info('Chat request', {
  chatbotId: chatbot.id,
  conversationId: conversation.id,
  messageLength: message.length,
  responseTime: Date.now() - startTime,
  tokens: completion.usage.total_tokens
});
```

---

## ✅ Implementation Checklist

- [ ] Set up database schema
- [ ] Implement API key generation
- [ ] Create GET /api/chatbot/config endpoint
- [ ] Create POST /api/chatbot/chat endpoint
- [ ] Integrate OpenAI/ChatGPT API
- [ ] Implement domain validation
- [ ] Add rate limiting
- [ ] Set up CORS properly
- [ ] Create system prompt builder
- [ ] Implement conversation tracking
- [ ] Add usage logging for billing
- [ ] Error handling and logging
- [ ] Write integration tests
- [ ] Deploy to staging
- [ ] Test with React widget
- [ ] Deploy to production

---

## 🔗 Frontend Integration Testing

Once backend is deployed:

```jsx
// Test in React app
import { AskMySite } from '@askmysite/react-widget';

<AskMySite 
  apiKey="sk_test_development123456789"
  apiBaseUrl="https://staging-api.askmysite.com"
/>
```

---

## 📞 Support

Backend questions? Contact the frontend team with:
- API endpoint issues
- Response format questions
- Authentication problems
- Performance concerns

Frontend is ready and waiting for these endpoints! 🚀
