import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // 如果你有全局样式的话

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);