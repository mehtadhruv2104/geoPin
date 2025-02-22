import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthService from './services/authService.tsx'

import { Provider } from 'react-redux'
import ConfigureStore from './redux/store.ts'


const store = ConfigureStore()
  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </StrictMode>,
)