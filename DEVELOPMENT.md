# AskMySite React Widget

A lightweight, production-ready React widget for embedding the AskMySite ChatGPT-powered assistant into any website.

## 📁 Project Structure

```
bot-ask-your-site/
├── src/
│   ├── AskMySite.tsx      # Main widget component
│   ├── types.ts            # TypeScript interfaces
│   ├── service.ts          # API communication layer
│   ├── styles.css          # Widget styles
│   └── index.ts            # Package entry point
├── dist/                   # Built files (generated)
├── package.json
├── tsconfig.json
├── rollup.config.js        # Build configuration
├── README.md              # Usage documentation
├── examples.tsx           # Integration examples
└── demo.html              # Simple demo page
```

## 🚀 Quick Start

### For Package Users

```bash
npm install @askmysite/react-widget
```

```jsx
import { AskMySite } from '@askmysite/react-widget';

function App() {
  return <AskMySite apiKey="your-api-key" />;
}
```

### For Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode for development
npm run dev
```

## 🏗️ Architecture

### Component Flow

1. **Initialization**: Component mounts and fetches config from API using API key
2. **Configuration**: Loads chatbot name, avatar, colors, welcome message
3. **User Interaction**: User clicks chat button, enters messages
4. **API Communication**: Messages sent to backend, AI responses received
5. **Display**: Messages rendered in chat interface with typing indicators

### API Integration

The widget expects two endpoints:

**GET `/api/chatbot/config`**
```json
{
  "success": true,
  "data": {
    "chatbotName": "Support Bot",
    "welcomeMessage": "Hello! How can I help?",
    "businessProfile": "ecommerce",
    "primaryLanguage": "en",
    "primaryColor": "#007bff",
    "avatarUrl": "https://...",
    "position": "bottom-right"
  }
}
```

**POST `/api/chatbot/chat`**
```json
// Request
{
  "message": "What are your hours?",
  "conversationId": "abc123"
}

// Response
{
  "success": true,
  "data": {
    "message": "We're open Monday-Friday 9am-5pm",
    "conversationId": "abc123"
  }
}
```

## 🎨 Features

- ✅ **One-line integration**: Single React component
- ✅ **Lightweight**: Minimal dependencies, small bundle size
- ✅ **TypeScript**: Full type safety
- ✅ **Customizable**: Colors, positioning, API endpoint
- ✅ **Responsive**: Mobile and desktop optimized
- ✅ **Accessible**: ARIA labels and keyboard navigation
- ✅ **Animated**: Smooth transitions and typing indicators
- ✅ **Secure**: API key authentication

## 🔒 Security

- API key authentication on all requests
- Domain validation on backend
- No sensitive data stored in frontend
- CORS-protected endpoints

## 📦 Bundle Size

The widget is optimized for minimal size:
- React/ReactDOM are peer dependencies (not bundled)
- CSS is injected inline (no separate stylesheet)
- No external dependencies beyond React

## 🎯 Design Principles

1. **Simplicity**: One component, one prop (apiKey)
2. **Zero Config**: Everything fetched from API
3. **Flexibility**: Optional customization available
4. **Performance**: Lazy loading, minimal re-renders
5. **UX**: Smooth animations, clear feedback

## 🛠️ Build Output

The build creates three files:
- `dist/index.js` - CommonJS format
- `dist/index.esm.js` - ES Module format
- `dist/index.d.ts` - TypeScript definitions

## 📝 TypeScript Usage

```typescript
import { AskMySite, AskMySiteProps, ChatbotConfig } from '@askmysite/react-widget';

const props: AskMySiteProps = {
  apiKey: 'your-key',
  position: 'bottom-right',
  primaryColor: '#007bff'
};
```

## 🧪 Testing Integration

You can test the widget by:
1. Building the package: `npm run build`
2. Opening `demo.html` in a browser
3. Or creating a test React app with `create-react-app`

## 📈 Future Enhancements

Potential additions (not in MVP):
- File upload support
- Voice messages
- Chat history persistence
- Multi-language UI
- Theming system
- Analytics integration

## 🤝 Contributing

This is a SaaS product component. Internal development only.

## 📄 License

MIT
