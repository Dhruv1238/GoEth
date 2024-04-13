import './App.css'
import AppRouter from './Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'

function App() {

  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  )
}

export default App
