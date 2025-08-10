import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import MoneyTransferHomepage from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/StaticSendMoney";
import Layout from "./components/Layout";
import { useState } from "react";

function App() {
  const { count, setcount } = useState(0);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<MoneyTransferHomepage />} />
          <Route path="/send" element={<SendMoney/>}/>
         <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// Simple PrivateRoute implementation
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default App;
