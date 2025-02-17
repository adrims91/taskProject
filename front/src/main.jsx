import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Layout />
  </AuthProvider>
  
)
