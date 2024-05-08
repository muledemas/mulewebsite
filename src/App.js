import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
const navigate = useNavigate();

  const handleRegister=()=>{
   navigate('/'); 
  }
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp onRegister ={handleRegister}/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
