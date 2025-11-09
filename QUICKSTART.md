# 🚀 Quick Start Guide

Get your AskMySite chatbot running on your website in 5 minutes!

## ✅ Requirements

- React 16.8+ (Hooks support required)
- Works with React 17, 18, and 19
- Compatible with Next.js 13-15+, Remix, Gatsby, Vite, CRA

## Step 1: Install the Package

```bash
npm install @askmysite/react-widget
```

or with yarn:

```bash
yarn add @askmysite/react-widget
```

## Step 2: Get Your API Key

1. Go to [AskMySite Dashboard](https://dashboard.askmysite.com)
2. Create a new chatbot
3. Complete the setup wizard
4. Copy your API key

## Step 3: Add to Your React App

Open your main App component and import the widget:

```jsx
import { AskMySite } from '@askmysite/react-widget';

function App() {
  return (
    <div>
      {/* Your existing app content */}
      <h1>Welcome to My Website</h1>
      <p>Your content here...</p>

      {/* Add the chatbot - it will appear in the bottom-right corner */}
      <AskMySite apiKey="your-api-key-here" />
    </div>
  );
}

export default App;
```

## Step 4: Test It Out

1. Start your development server: `npm start`
2. Look for the chat button in the bottom-right corner
3. Click it and start chatting!

## 🎨 Customize (Optional)

### Change Position

```jsx
<AskMySite 
  apiKey="your-api-key" 
  position="bottom-left"  // or top-right, top-left
/>
```

### Match Your Brand Color

```jsx
<AskMySite 
  apiKey="your-api-key" 
  primaryColor="#ff6b6b"  // Your brand color
/>
```

### Use Custom API Endpoint

```jsx
<AskMySite 
  apiKey="your-api-key" 
  apiBaseUrl="https://api.yourdomain.com"
/>
```

### All Options Together

```jsx
<AskMySite 
  apiKey="your-api-key"
  position="bottom-left"
  primaryColor="#ff6b6b"
  apiBaseUrl="https://api.yourdomain.com"
/>
```

## ✅ That's It!

Your chatbot is now live and will:
- ✨ Display your custom welcome message
- 🎨 Use your brand colors and avatar
- 💬 Answer questions about your website
- 📱 Work perfectly on mobile and desktop
- 🔒 Stay secure with API key authentication

## 🆘 Troubleshooting

### Chatbot Not Appearing?

1. Check that you've added the component to your JSX
2. Verify your API key is correct
3. Check browser console for errors
4. Ensure you're running the app (`npm start`)

### API Errors?

1. Verify your API key in the dashboard
2. Check that your domain is authorized
3. Ensure you have an active subscription
4. Check network tab for API responses

### Styling Issues?

1. The widget uses fixed positioning - check for CSS conflicts
2. Ensure your z-index values don't override the widget (999999)
3. Clear browser cache if styles aren't updating

## 📚 Learn More

- [Full Documentation](README.md)
- [API Reference](DEVELOPMENT.md)
- [Examples](examples.tsx)
- [Security Best Practices](SECURITY.md)

## 💡 Tips

- **Environment Variables**: Store your API key in `.env` file
  ```
  REACT_APP_ASKMYSITE_KEY=your-api-key
  ```
  Then use: `<AskMySite apiKey={process.env.REACT_APP_ASKMYSITE_KEY} />`

- **TypeScript**: The package includes full TypeScript definitions
  ```typescript
  import { AskMySite, AskMySiteProps } from '@askmysite/react-widget';
  ```

- **Multiple Pages**: Add the component once in your root layout component for site-wide availability

## 🎯 Next Steps

1. Customize your chatbot personality in the dashboard
2. Train it on your full website content (upgrade to premium)
3. Monitor conversations and improve responses
4. Analyze visitor questions and insights

## 🤝 Need Help?

- 📧 Email: support@askmysite.com
- 💬 Live Chat: Available in dashboard
- 📖 Docs: [docs.askmysite.com](https://docs.askmysite.com)
