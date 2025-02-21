import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import React, { useContext, useEffect, useRef, useState } from "react";
import ChatContext from "../context/ChatContext";
import { axiosInstance } from "../lib/axios";
import { formatMessageTime } from "../lib/utils";

export const MessageSec = () => {
  const [messageArr, setMessageArr] = useState([]);
  const [text, updateText] = useState("");
  const { selectedUser, setSelectedUser, socket } = useContext(ChatContext);
  const messageEndRef = useRef(null);

  const subscribeToMessages = () => {
    if (!selectedUser) return;

    const newSocket = socket;

    newSocket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      setMessageArr((prevState) => [...prevState, newMessage]);
    });
  };

  const unsubscribeFromMessages = () => {
    const newSocket = socket;
    newSocket.off("newMessage");
  };
  const sendMessage = async (messageData) => {
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      setMessageArr((prevState) => [...prevState, res.data]);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await sendMessage({
        text: text.trim(),
      });
      updateText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const getMessages = async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      setMessageArr(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [setMessageArr]);

  useEffect(() => {
    if (messageEndRef.current && messageArr) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageArr]);
  console.log(messageArr);
  return (
    <Box>
      {/* Chat Header */}
      <Box
        sx={{
          width: "100%",
          p: 4,
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#7D1C4A",
          borderTopLeftRadius: 54,
          borderTopRightRadius: 54,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ color: "#F4CCE9" }}>
            <PersonIcon sx={{ transform: "scale(1.7)" }} />
          </Box>
          <Typography variant="h4" sx={{ color: "#F4CCE9" }}>
            {selectedUser.username}
          </Typography>
        </Box>
        <Button
          onClick={() => {
            setSelectedUser(null);
          }}
          sx={{ color: "#F4CCE9" }}
        >
          <CloseIcon />
        </Button>
      </Box>
      {/* Chat Body */}
      <Box
        sx={{
          "&::-webkit-scrollbar": {
            width: "4px",
            height: "4px", // Width of the scrollbar
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e4e4e4", // Scrollbar track color
            borderRadius: "10px", // Rounded corners for the track
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#7D1C4A ", // Scrollbar thumb color
            borderRadius: "10px", // Rounded corners for the thumb
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Hover effect for the scrollbar thumb
          },
          overflowY: "auto",
          height: "400px",
          width: "100%",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messageArr.map((msg) => (
          <Box
            ref={messageEndRef}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              alignSelf:
                selectedUser._id === msg.senderId ? "flex-start" : "flex-end",
            }}
          >
            <Box sx={{ color: "#7D1C4A" }}>
              <PersonIcon />
            </Box>
            <Box 
              sx={{
                bgcolor: "#7D1C4A",
                maxWidth: "120px",
                py: 1,
                borderRadius: 2,
                px: 2,
                display:"flex",
                alignItems: "center",
                gap:1
              }}
            >
              <Typography sx={{ color: "#F4CCE9", fontSize: "14px" }}>
                {msg.text}
              </Typography>
              <Typography sx={{ color: "#F4CCE9", fontSize: "8px" }}>
                {formatMessageTime(msg.createdAt)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {/* ChatInputBox */}

      <form
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
        onSubmit={handleMessage}
      >
        <input
          value={text}
          onChange={(e) => {
            updateText(e.target.value);
          }}
          placeholder="Type Your Message"
          style={{
            color: "#7D1C4A",
            border: "1px solid #F4CCE9",
            outline: "none",
            borderRadius: "10px",
            padding: "20px",
            width: "100%",
          }}
        />
        <button
          type="submit"
          style={{
            color: "#7D1C4A",
            cursor: "pointer",
            backgroundColor: "transparent",
            borderStyle: "none",
          }}
        >
          <SendOutlinedIcon />
        </button>
      </form>
    </Box>
  );
};
