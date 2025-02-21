import React, { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import ChatContext from "../context/ChatContext";

const Navbar = () => {
  const [isNavHidden, toggleNav] = useState(false);
  const { setAuthUser, setSelectedUser } = useContext(ChatContext);
  const navigate = useNavigate();
  const onLogout = async () => {
    await axiosInstance.post("auth/logout");
    setAuthUser(null);
    setSelectedUser(null);
    navigate("/login", { replace: true });
  };
  return !isNavHidden ? (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#7D1C4A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      bgcolor="primary"
      padding={3}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img alt="logo" src="/chat8883.png" style={{ width: "70px" }} />
        <Typography sx={{ color: "#D17D98", fontWeight: "bold" }} variant="h4">
          ZapChat
        </Typography>
      </Box>
      <Box>
        <Button
          onClick={onLogout}
          sx={{ bgcolor: "#F4CCE9", color: "#7D1C4A" }}
          variant="contained"
        >
          Logout
        </Button>
        <Button
          onClick={() => {
            toggleNav((prevState) => !prevState);
          }}
          sx={{ color: "#F4CCE9" }}
        >
          Hide Nav
        </Button>
      </Box>
    </Box>
  ) : (
    <Button
      onClick={() => {
        toggleNav((prevState) => !prevState);
      }}
      sx={{ color: "#F4CCE9", bgcolor: "#7D1C4A", margin: 2 }}
    >
      Show Nav
    </Button>
  );
};

export default Navbar;
