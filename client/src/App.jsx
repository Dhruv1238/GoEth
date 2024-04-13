import './App.css'
import AppRouter from './Router'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { TransactionContextProvider } from './context/TransactionContext'
import Loader from './components/Loader';

function App() {

  return (
    <>
      <TransactionContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <AppRouter />
            <Loader />
          </BrowserRouter>
        </AuthContextProvider>
      </TransactionContextProvider>
    </>
  )
}

export default App
