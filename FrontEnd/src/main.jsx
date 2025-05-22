import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TelaInicial from './TelaInicial/TelaInicial'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TelaInicial />
  </StrictMode>,
)
