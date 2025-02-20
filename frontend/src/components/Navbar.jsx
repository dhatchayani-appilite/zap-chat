import React from 'react'
import { Box, Button, Typography } from "@mui/material";
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    const navigate = useNavigate()
    const onLogout = async() =>{
         await axiosInstance.post("auth/logout")
         navigate("/login",{replace: true})
    }
    return (
        <Box sx={{ width: "100%", bgcolor: "#7D1C4A", display: 'flex', alignItems: "center",justifyContent:"space-between" }} bgcolor="primary" padding={3}>
            <Box sx={{ display: 'flex', alignItems: "center" }}>
                <img src="/chat8883.png" style={{ width: "70px" }} />
                <Typography sx={{ color: "#D17D98",fontWeight:"bold" }} variant='h4'>ZapChat</Typography>
            </Box>
            <Button onClick = {onLogout} sx={{bgcolor: "#F4CCE9",color:"#7D1C4A"}} variant='contained'>Logout</Button>
        </Box>
    )
}

export default Navbar