import './App.css'
import AppRouter from './Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { TransactionContextProvider } from './context/TransactionContext'

function App() {

  return (
    <>
      <TransactionContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthContextProvider>
      </TransactionContextProvider>
    </>
  )
}

export default App
