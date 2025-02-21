import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";
import Chat from "../components/Chat";
import ChatContext from "../context/ChatContext";

function Home() {
  const { authUser, establishSocket, socket } = useContext(ChatContext);

  const connectToSocket = () => {
    if (!authUser || socket?.connected) return;
    const newSocket = io("http://localhost:5000", {
      query: {
        userId: authUser._id,
      },
    });
    newSocket.connect();
    establishSocket(newSocket);
  };

  useEffect(() => {
    connectToSocket();
  }, [establishSocket]);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Chat />
    </Box>
  );
}

export default Home;
