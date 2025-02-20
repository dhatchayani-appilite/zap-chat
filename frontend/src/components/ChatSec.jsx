import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import ChatContext from "../context/ChatContext";

const ChatSec = () => {
    const [usersdata,updateUsersData] = useState([])
    const { authUser} = useContext(ChatContext);
    console.log(authUser)
    // useEffect(() => {})
    // const getAllUsers = async () =>{
    //     const {data} = await axiosInstance.get
    // }
  return (
    <Box padding={6}>
      <Typography variant="h4" sx={{ color: "#7D1C4A",textAlign:'center' }}>
        CHATS
      </Typography>
      <hr style={{marginTop:"10px",color:"blue"}}/>
    </Box>
  );
};

export default ChatSec;
