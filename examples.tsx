import React from 'react';
import ReactDOM from 'react-dom/client';
import { AskMySite } from './src';

// Example 1: Basic usage
function BasicExample() {
  return (
    <div>
      <h1>My Website</h1>
      <p>Welcome to my website!</p>
      
      {/* Simple one-line integration */}
      <AskMySite apiKey="your-api-key-here" />
    </div>
  );
}

// Example 2: Custom positioning and color
function CustomExample() {
  return (
    <div>
      <h1>My E-commerce Store</h1>
      <p>Browse our products...</p>
      
      {/* Custom position and brand color */}
      <AskMySite
        apiKey="your-api-key-here"
        position="bottom-left"
        primaryColor="#ff6b6b"
      />
    </div>
  );
}

// Example 3: With custom API endpoint
function CustomAPIExample() {
  return (
    <div>
      <h1>Enterprise Application</h1>
      <p>Professional services platform</p>
      
      {/* Self-hosted API endpoint */}
      <AskMySite
        apiKey="your-api-key-here"
        position="bottom-right"
        apiBaseUrl="https://api.yourdomain.com"
      />
    </div>
  );
}

// Example 4: Multiple positions demo
function MultiPositionExample() {
  const [position, setPosition] = React.useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right');

  return (
    <div style={{ padding: '40px' }}>
      <h1>Position Selector Demo</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setPosition('bottom-right')}>Bottom Right</button>
        <button onClick={() => setPosition('bottom-left')}>Bottom Left</button>
        <button onClick={() => setPosition('top-right')}>Top Right</button>
        <button onClick={() => setPosition('top-left')}>Top Left</button>
      </div>
      
      <AskMySite
        apiKey="your-api-key-here"
        position={position}
      />
    </div>
  );
}

// Render the example
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<BasicExample />);

export { BasicExample, CustomExample, CustomAPIExample, MultiPositionExample };
