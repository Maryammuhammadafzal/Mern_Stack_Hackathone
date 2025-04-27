// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Board from "./components/Dashboard/Board";

function App() {
  return (
    <div className="bg-blue-100 w-full min-h-screen flex justify-center items-center">

    <AuthProvider>
      <Router >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Board />} />
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
