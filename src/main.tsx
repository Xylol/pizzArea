import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const style = document.createElement('style')
style.innerHTML = `
  :root {
    --color-bg: #18181b;
    --color-surface: #23232a;
    --color-primary: #4f46e5;
    --color-primary-hover: #6366f1;
    --color-text: #f4f4f5;
    --color-text-secondary: #a1a1aa;
    --color-border: #27272a;
    --radius: 0.5rem;
    --space-s: 1rem;
    --space-m: 2rem;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  input {
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 0.75rem;
    font-size: 1rem;
    width: 100%;
  }

  input:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`
document.head.appendChild(style)

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
