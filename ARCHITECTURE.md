# 🏗️ Architecture Diagram

Visual guide to the AskMySite React Widget architecture.

---

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         User's Website                           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              React Application                          │    │
│  │                                                          │    │
│  │   import { AskMySite } from '@askmysite/react-widget'  │    │
│  │                                                          │    │
│  │   <AskMySite apiKey="sk_live_xxx" />                   │    │
│  │                                                          │    │
│  └────────────────────────────────────────────────────────┘    │
│                              │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
                               │ Widget Rendered
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AskMySite Widget                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Floating Chat Button (bottom-right)                      │  │
│  │         💬                                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              │ onClick                           │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Chat Window (380x600px)                                  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Header (Avatar + Name + Close)                    │  │  │
│  │  ├────────────────────────────────────────────────────┤  │  │
│  │  │  Messages Area (scrollable)                        │  │  │
│  │  │                                                     │  │  │
│  │  │  🤖 Welcome message                                │  │  │
│  │  │  👤 User: Hello!                                   │  │  │
│  │  │  🤖 AI: How can I help?                            │  │  │
│  │  │                                                     │  │  │
│  │  ├────────────────────────────────────────────────────┤  │  │
│  │  │  Input Box + Send Button                          │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ API Requests
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              AskMySite Backend API                               │
│                                                                   │
│  GET /api/chatbot/config    POST /api/chatbot/chat              │
│                                                                   │
│  ┌──────────────┐           ┌──────────────────┐               │
│  │ Auth Check   │           │  Auth Check      │               │
│  │ API Key      │           │  API Key         │               │
│  └──────┬───────┘           └────────┬─────────┘               │
│         │                            │                           │
│         ▼                            ▼                           │
│  ┌──────────────┐           ┌──────────────────┐               │
│  │ Get Chatbot  │           │  Get Context     │               │
│  │ Config from  │           │  & Conversation  │               │
│  │ Database     │           └────────┬─────────┘               │
│  └──────┬───────┘                    │                           │
│         │                            ▼                           │
│         │                    ┌──────────────────┐               │
│         │                    │  Call ChatGPT    │               │
│         │                    │  API             │               │
│         │                    └────────┬─────────┘               │
│         │                            │                           │
│         ▼                            ▼                           │
│  Return Config              Return AI Response                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Component Lifecycle Flow

```
1. Component Mounts
   ↓
2. Initialize Service (with API key)
   ↓
3. Fetch Config from Backend
   ↓
4. Set Initial State (config, welcome message)
   ↓
5. Render Chat Button
   ↓
6. User Clicks Button
   ↓
7. Open Chat Window (setIsOpen = true)
   ↓
8. User Types Message
   ↓
9. User Clicks Send or Presses Enter
   ↓
10. Add User Message to Messages Array
    ↓
11. Set Loading State (show typing indicator)
    ↓
12. Send Message to Backend API
    ↓
13. Receive AI Response
    ↓
14. Add AI Message to Messages Array
    ↓
15. Auto-scroll to Bottom
    ↓
16. Reset Loading State
    ↓
17. Repeat from step 8...
```

---

## 📦 Module Dependencies

```
AskMySite.tsx
    │
    ├─── React (peer dependency)
    ├─── types.ts (interfaces)
    │       └─── Pure TypeScript (no deps)
    │
    ├─── service.ts (API layer)
    │       └─── types.ts
    │
    └─── styles.css (styling)
            └─── Pure CSS (no deps)

index.ts
    │
    ├─── AskMySite.tsx
    └─── types.ts
    
    
Bundled Output:
    │
    ├─── dist/index.js (CJS)
    ├─── dist/index.esm.js (ESM)
    └─── dist/index.d.ts (Types)
```

---

## 🔐 Authentication Flow

```
User Website
    │
    │ API Key embedded in component
    │ <AskMySite apiKey="sk_live_xxx" />
    │
    ▼
Frontend Service
    │
    │ Add to Authorization header
    │ Authorization: Bearer sk_live_xxx
    │
    ▼
Backend API
    │
    ├─── Extract API key from header
    ├─── Hash and lookup in database
    ├─── Verify key is active
    ├─── Check domain whitelist
    ├─── Validate rate limits
    │
    ▼
    Authorized ✅
    │
    ├─── Fetch chatbot config
    ├─── Process messages
    └─── Return responses
```

---

## 💬 Message Flow Diagram

```
User Types Message
    │
    ▼
Input Field (controlled component)
    │ value={inputValue}
    │ onChange={e => setInputValue(e.target.value)}
    │
    ▼
User Presses Enter or Clicks Send
    │
    ▼
handleSendMessage()
    │
    ├─── Create user message object
    ├─── Add to messages array
    ├─── Clear input field
    ├─── Set loading = true
    │
    ▼
serviceRef.current.sendMessage()
    │
    ├─── Build request { message, conversationId }
    ├─── POST to /api/chatbot/chat
    ├─── Include Authorization header
    │
    ▼
Backend Processing
    │
    ├─── Validate request
    ├─── Load conversation context
    ├─── Build ChatGPT prompt
    ├─── Call OpenAI API
    ├─── Save conversation
    │
    ▼
Response Received
    │
    ├─── Extract AI message
    ├─── Extract conversation ID
    │
    ▼
Frontend Updates
    │
    ├─── Create assistant message object
    ├─── Add to messages array
    ├─── Set loading = false
    ├─── Auto-scroll to bottom
    │
    ▼
Message Displayed ✅
```

---

## 🎨 Styling Architecture

```
styles.css (injected via Rollup PostCSS)
    │
    ├─── .askmysite-container (fixed positioning)
    │       │
    │       ├─── .askmysite-position-bottom-right
    │       ├─── .askmysite-position-bottom-left
    │       ├─── .askmysite-position-top-right
    │       └─── .askmysite-position-top-left
    │
    ├─── .askmysite-button (floating chat button)
    │       └─── Hover/Active states
    │
    ├─── .askmysite-chat-window (main container)
    │       │
    │       ├─── .askmysite-header
    │       │       ├─── .askmysite-avatar
    │       │       ├─── .askmysite-header-text
    │       │       └─── .askmysite-close-button
    │       │
    │       ├─── .askmysite-messages (scrollable area)
    │       │       │
    │       │       ├─── .askmysite-message
    │       │       │       ├─── .askmysite-message-user
    │       │       │       └─── .askmysite-message-assistant
    │       │       │
    │       │       └─── .askmysite-message-bubble
    │       │
    │       └─── .askmysite-input-container
    │               ├─── .askmysite-input
    │               └─── .askmysite-send-button
    │
    └─── Animations
            ├─── @keyframes slideUp
            ├─── @keyframes fadeIn
            └─── @keyframes typing
```

---

## 🗄️ State Management

```
AskMySite Component State
    │
    ├─── isOpen: boolean
    │       └─── Controls chat window visibility
    │
    ├─── config: ChatbotConfig | null
    │       └─── Chatbot settings from API
    │
    ├─── messages: Message[]
    │       └─── Array of all chat messages
    │
    ├─── inputValue: string
    │       └─── Current input field value
    │
    ├─── loading: boolean
    │       └─── Shows typing indicator
    │
    ├─── conversationId: string | undefined
    │       └─── Tracks conversation context
    │
    └─── error: string | null
            └─── Error message if any

Refs (useRef)
    │
    ├─── serviceRef: AskMySiteService
    │       └─── Persistent API service instance
    │
    └─── messagesEndRef: HTMLDivElement
            └─── For auto-scrolling to bottom
```

---

## 🔄 Build Process Flow

```
Source Files (src/)
    │
    ├─── AskMySite.tsx
    ├─── types.ts
    ├─── service.ts
    ├─── styles.css
    └─── index.ts
    │
    │ npm run build
    │
    ▼
Rollup Bundler
    │
    ├─── Plugin: peerDepsExternal
    │       └─── Exclude React/ReactDOM
    │
    ├─── Plugin: resolve
    │       └─── Resolve node_modules
    │
    ├─── Plugin: commonjs
    │       └─── Convert to ES modules
    │
    ├─── Plugin: typescript
    │       └─── Compile TypeScript
    │       └─── Generate .d.ts files
    │
    └─── Plugin: postcss
            └─── Process & inject CSS
    │
    ▼
Output Files (dist/)
    │
    ├─── index.js (CommonJS)
    ├─── index.esm.js (ES Module)
    ├─── index.d.ts (TypeScript)
    ├─── index.js.map (Sourcemap)
    └─── index.esm.js.map (Sourcemap)
    │
    ▼
Published Package (@askmysite/react-widget)
    │
    └─── Ready for: npm install
```

---

## 🌐 Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     npm Registry                          │
│                                                           │
│  @askmysite/react-widget@1.0.0                           │
└──────────────────────────────────────────────────────────┘
                        │
                        │ npm install
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│              Customer's React App                         │
│                                                           │
│  node_modules/@askmysite/react-widget/                   │
│      ├── dist/index.js                                   │
│      ├── dist/index.esm.js                               │
│      └── dist/index.d.ts                                 │
└──────────────────────────────────────────────────────────┘
                        │
                        │ import
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│              Bundler (Webpack/Vite)                       │
│                                                           │
│  Includes widget in customer's bundle                    │
└──────────────────────────────────────────────────────────┘
                        │
                        │ Build
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│         Customer's Production Website                     │
│                                                           │
│  Widget runs in user's browser                           │
└──────────────────────────────────────────────────────────┘
                        │
                        │ API Calls
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│            AskMySite Backend API                          │
│                                                           │
│  https://api.askmysite.com                               │
│      ├── /api/chatbot/config                             │
│      └── /api/chatbot/chat                               │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
Configuration Flow:
==================

Component Mount
    │
    ▼
Service.fetchConfig()
    │
    │ GET /api/chatbot/config
    │ Authorization: Bearer {apiKey}
    │
    ▼
Backend Database
    │
    ├─── Query: SELECT * FROM chatbots WHERE api_key = ?
    ├─── Validate domain
    ├─── Load configuration
    │
    ▼
API Response
    │
    │ {
    │   success: true,
    │   data: {
    │     chatbotName: "...",
    │     welcomeMessage: "...",
    │     primaryColor: "...",
    │     avatarUrl: "...",
    │     ...
    │   }
    │ }
    │
    ▼
Frontend State Update
    │
    ├─── setConfig(data)
    ├─── setMessages([welcome message])
    │
    ▼
Widget Rendered ✅


Chat Message Flow:
==================

User Message
    │
    ▼
Service.sendMessage()
    │
    │ POST /api/chatbot/chat
    │ Body: { message, conversationId }
    │
    ▼
Backend Processing
    │
    ├─── Load conversation from DB
    ├─── Get chatbot content/context
    ├─── Build system prompt
    ├─── Call OpenAI ChatGPT API
    │
    ▼
OpenAI API
    │
    │ GPT-4 processes message
    │ with context and history
    │
    ▼
AI Response
    │
    ├─── Save to conversation
    ├─── Log usage for billing
    │
    ▼
API Response
    │
    │ {
    │   success: true,
    │   data: {
    │     message: "AI response...",
    │     conversationId: "conv_123"
    │   }
    │ }
    │
    ▼
Frontend Update
    │
    ├─── Add message to state
    ├─── Update conversationId
    ├─── Set loading = false
    │
    ▼
Display Response ✅
```

---

## 🎯 Integration Points

```
External Integration Points:
============================

1. Package Installation
   npm → npm Registry → Customer's project

2. Component Usage
   Customer's JSX → <AskMySite /> → Widget Rendered

3. API Configuration
   Widget → GET /api/chatbot/config → Backend

4. Chat Messages
   Widget → POST /api/chatbot/chat → Backend

5. ChatGPT Processing
   Backend → OpenAI API → AI Response

6. Domain Validation
   Backend → Request Origin → Domain Whitelist Check

7. Analytics (Future)
   Widget → Events → Analytics Service
```

---

## 🔍 Error Flow

```
Error Scenarios:
================

Invalid API Key:
    Widget → API Request → Backend
              │
              ├─── API Key not found
              │
              ▼
           401 Response
              │
              ▼
    Widget: Show error, don't render

Domain Not Authorized:
    Widget → API Request → Backend
              │
              ├─── Origin domain not in whitelist
              │
              ▼
           403 Response
              │
              ▼
    Widget: Log error, show generic error message

Network Error:
    Widget → API Request → Network Failure
              │
              ▼
    Catch in try/catch
              │
              ▼
    Widget: Display "Please try again" message

Rate Limit Exceeded:
    Widget → API Request → Backend
              │
              ├─── Too many requests
              │
              ▼
           429 Response
              │
              ▼
    Widget: Show "Please wait" message
```

---

## 📈 Scalability Considerations

```
Performance Optimizations:
==========================

Frontend:
    │
    ├─── React.memo (if needed for optimization)
    ├─── Debounced typing indicators
    ├─── Virtualized message list (for long conversations)
    ├─── Lazy component loading
    └─── CSS animations (GPU accelerated)

Backend:
    │
    ├─── Database indexing (api_key, conversation_id)
    ├─── Redis caching (chatbot configs)
    ├─── Rate limiting (per API key)
    ├─── Load balancing (multiple API servers)
    ├─── CDN for avatars/assets
    └─── Queue system for ChatGPT requests
```

---

## ✅ Architecture Benefits

1. **Separation of Concerns**: UI, Logic, API separated
2. **Type Safety**: TypeScript throughout
3. **Reusability**: Service layer can be tested independently
4. **Maintainability**: Clear file structure
5. **Scalability**: Backend can be scaled separately
6. **Security**: API key authentication, domain validation
7. **Performance**: Minimal bundle, peer dependencies
8. **Flexibility**: Easy to customize and extend

---

This architecture supports the AskMySite SaaS vision of easy integration, security, and scalability! 🚀
