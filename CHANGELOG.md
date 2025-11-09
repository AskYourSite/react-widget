# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-08

### Added
- Initial release of AskMySite React Widget
- Core chat widget component with floating button
- API integration for fetching chatbot configuration
- Real-time chat messaging with ChatGPT backend
- Customizable positioning (bottom-right, bottom-left, top-right, top-left)
- Custom theme color support
- Responsive design for mobile and desktop
- TypeScript support with full type definitions
- Typing indicator animation
- Welcome message display
- Avatar support
- Smooth animations and transitions
- ARIA labels for accessibility
- API key authentication
- Conversation ID tracking for context retention

### Features
- **Lightweight**: Minimal bundle size with peer dependencies
- **Zero Config**: Automatic configuration from API
- **One-line Integration**: `<AskMySite apiKey="xxx" />`
- **Customizable**: Optional position and color overrides
- **Secure**: API key-based authentication

### Technical
- Built with React 18 and TypeScript
- Rollup bundler for optimal package size
- CSS injection for zero-config styling
- ESM and CommonJS output formats
