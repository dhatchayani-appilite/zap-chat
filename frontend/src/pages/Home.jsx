import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";
import Chat from "../components/Chat";
import ChatContext from "../context/ChatContext";

function Home() {
  const [onlineUsers,setOnlineUsers] = useState([])
  const { authUser, establishSocket, socket } = useContext(ChatContext);

  const connectToSocket = () => {
    if (!authUser || socket?.connected) return;
    const newSocket = io("http://localhost:5000", {
      query: {
        userId: authUser._id,
      },
    });
    newSocket.connect();
    newSocket.on("getOnlineUsers", (userIds) => {
          setOnlineUsers(userIds)
        });
    establishSocket(newSocket);
  };

  useEffect(() => {
    connectToSocket();
  }, [establishSocket]);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Chat onlineUsers={onlineUsers}/>
    </Box>
  );
}

export default Home;
