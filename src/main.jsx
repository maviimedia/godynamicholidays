import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx'
import './index.css'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </HelmetProvider>
  </React.StrictMode>,
)