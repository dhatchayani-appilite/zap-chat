import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";

function Home() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Chat />
    </Box>
  );
}

export default Home;
