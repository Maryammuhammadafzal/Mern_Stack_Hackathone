import { useState } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter , Route,  Routes } from 'react-router-dom'
import Login from "./components/Auth/Login.jsx"
import Signup from "./components/Auth/Signup.jsx"
import Board from './components/Dashboard/Board.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="bg-blue-100 w-full min-h-screen flex justify-center items-center">

<AuthProvider>
 
  <BrowserRouter >
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Board />} />
    </Routes>
  </BrowserRouter>

</AuthProvider>
</div>
    </>
  )
}

export default App
