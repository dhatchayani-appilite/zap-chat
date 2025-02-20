import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { axiosInstance } from "./lib/axios";
import ChatContext from "./context/ChatContext";

export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setAuthUser(res.data);
    } catch (error) {
      console.log("error in checkauth", error);
      setAuthUser(null);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  console.log(authUser);
  return (
    <BrowserRouter>
      <ChatContext.Provider value= {{authUser}}>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={!authUser ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
        </Routes>
      </ChatContext.Provider>
    </BrowserRouter>
  );
}
