import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import ChatContext from "../context/ChatContext";

const ChatSec = () => {
  const [usersdata, updateUsersData] = useState([]);
  const { setSelectedUser, authUser } = useContext(ChatContext);

  const getUsers = async () => {
    try {
      const res = await axiosInstance.get("/messages/users");
      updateUsersData(res.data);
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, [updateUsersData]);
  return (
    <Box padding={5}>
      <Typography variant="h4" sx={{ color: "#7D1C4A", textAlign: "center" }}>
        CHATS
      </Typography>
      <Typography sx={{ textAlign: "center", color: "#7D1C4A" }}>
        Welcome {authUser.username}!
      </Typography>
      <hr style={{ marginTop: "10px", color: "blue" }} />
      {/* Users Container */}
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
          px: 1,
          overflowY: "auto",
          listStyleType: "none",
          height: "450px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {usersdata.map((user) => (
          <li key={user._id}>
            <Box
              onClick={() => {
                setSelectedUser(user);
              }}
              sx={{
                "&:hover": { boxShadow: "0px 10px 0px #7D1C4A" },
                cursor: "pointer",
                border: "1px solid #7D1C4A",
                borderRadius: 5,
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box sx={{ color: "#7D1C4A" }}>
                <PersonIcon />
              </Box>
              <Typography variant="h6" sx={{ color: "#7D1C4A" }}>
                {user.username}
              </Typography>
            </Box>
          </li>
        ))}
      </Box>
    </Box>
  );
};

export default ChatSec;
