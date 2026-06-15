import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import App from './App'
import './styles.css'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>
)
