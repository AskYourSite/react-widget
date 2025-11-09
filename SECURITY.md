# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within the AskMySite React Widget, please send an email to security@askmysite.com. All security vulnerabilities will be promptly addressed.

Please do not publicly disclose the issue until it has been addressed by our team.

## Security Measures

### API Key Protection

- API keys should be treated as sensitive credentials
- Never commit API keys to version control
- Use environment variables in production
- Rotate keys regularly

### Best Practices

```jsx
// ✅ Good: Use environment variables
<AskMySite apiKey={process.env.REACT_APP_ASKMYSITE_KEY} />

// ❌ Bad: Hardcoded API key
<AskMySite apiKey="sk_live_abc123..." />
```

### Backend Security

The AskMySite API implements:
- API key validation on every request
- Domain origin verification
- Rate limiting
- Request authentication
- CORS policies

### Frontend Security

The widget:
- Never stores sensitive data locally
- Uses secure HTTPS connections only
- Validates all API responses
- Sanitizes user input
- Implements CSP-friendly practices

## Data Privacy

- No personal data is stored in the widget
- All conversations are processed server-side
- Message history is not persisted in localStorage
- Chat data is encrypted in transit (HTTPS)

## Responsible Disclosure

We appreciate the security research community's efforts in keeping our users safe. If you believe you've found a security issue in our widget:

1. Email security@askmysite.com with details
2. Allow us reasonable time to respond and fix the issue
3. Do not exploit the vulnerability
4. Do not disclose the issue publicly until resolved

We will acknowledge receipt within 48 hours and provide a timeline for resolution.
