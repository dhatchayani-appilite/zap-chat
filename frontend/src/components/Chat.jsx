import { Box, Typography } from "@mui/material";
import React from "react";
import ChatSec from "./ChatSec";

const Chat = () => {
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
          height: "90vh",
          border: "1px solid #7D1C4A",
          borderRadius: 14,
          boxShadow: "0px 14px 20px 0px #D17D98",
        }}
      >
        <ChatSec />
      </Box>
    </Box>
  );
};

export default Chat;
