# @askmysite/react-widget

Lightweight React widget for integrating AskMySite chatbot into your website with a single line of code.

## 🚀 Installation

```bash
npm install @askmysite/react-widget
```

## 📖 Usage

### Basic Integration

```jsx
import { AskMySite } from '@askmysite/react-widget';

function App() {
  return (
    <div>
      {/* Your app content */}
      <AskMySite apiKey="your-api-key-here" />
    </div>
  );
}
```

That's it! The chatbot will appear in the bottom-right corner of your website.

### Custom Configuration

```jsx
<AskMySite
  apiKey="your-api-key-here"
  position="bottom-left"
  primaryColor="#ff6b6b"
  apiBaseUrl="https://your-custom-api.com"
/>
```

## ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | `string` | **Required** | Your AskMySite API key |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Chat button position |
| `primaryColor` | `string` | From API config | Custom theme color (hex) |
| `apiBaseUrl` | `string` | `'https://api.askmysite.com'` | Custom API base URL |

## 🎨 Features

- **Lightweight**: Minimal bundle size for fast loading
- **Responsive**: Works seamlessly on mobile and desktop
- **Customizable**: Match your brand colors and positioning
- **Real-time**: Powered by ChatGPT for intelligent responses
- **Easy Integration**: Single component, no complex setup

## 🔑 Getting Your API Key

1. Sign up at [AskMySite](https://askmysite.com)
2. Create a new chatbot for your website
3. Copy your API key from the dashboard
4. Add the widget to your React app

## 🌐 API Endpoints

The widget communicates with two main endpoints:

- **GET** `/api/chatbot/config` - Fetches chatbot configuration (name, avatar, colors, welcome message)
- **POST** `/api/chatbot/chat` - Sends user messages and receives AI responses

## 📦 What's Included

The API automatically provides:
- Chatbot name and avatar
- Welcome message
- Brand colors
- Business profile personality
- Language preferences

No additional configuration needed!

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode for development
npm run dev
```

## 📝 TypeScript Support

Full TypeScript support with exported types:

```typescript
import { AskMySite, AskMySiteProps, ChatbotConfig, Message } from '@askmysite/react-widget';
```

## 🤝 Support

Need help? Contact us at support@askmysite.com

## 📄 License

MIT
