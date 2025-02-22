import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <TaskProvider>
    <Layout />
    </TaskProvider>
  </AuthProvider>
  
)
