import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import App from './App'
import './index.css'
import { initGA, logPageView } from './lib/analytics'

// Initialize Google Analytics
if (typeof window !== 'undefined') {
  initGA();
  logPageView();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
) 