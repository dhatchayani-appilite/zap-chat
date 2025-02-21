import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ChatSec from "./ChatSec";
import ChatContext from "../context/ChatContext";
import { MessageSec } from "./MessageSec";

const Chat = (props) => {
  const { selectedUser,socket } = useContext(ChatContext);
  const {onlineUsers}= props
  console.log(onlineUsers)
  useEffect(()=>{
    // socket.on("getOnlineUsers", (userIds) => {
    //       setOnlineUsers(userIds)
    //     });
  })
  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "375px",
          height: "600px",
          border: "1px solid #7D1C4A",
          borderRadius: 14,
          boxShadow: "0px 14px 20px 0px #D17D98",
        }}
      >
        {!selectedUser ? <ChatSec onlineUsers={onlineUsers}/> : <MessageSec />}
      </Box>
    </Box>
  );
};

export default Chat;
