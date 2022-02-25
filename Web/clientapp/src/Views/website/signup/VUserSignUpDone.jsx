import { Box, Button, Stack, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router";
import illustration20 from '../../../assets/images/illustration20.png'
import React from 'react'

export default function VUserSignupDone() {
    const navigate = useNavigate()
    return (
        <Container component="main" maxWidth="md" sx={{ mt:4 }}>
        <Stack direction="column" spacing={3} alignItems="center" justifyContent="center" textAlign="center">

            <Box display="flex">
                <Box component="img" src={illustration20} maxWidth="100%" />
            </Box>
            <Typography variant="body1">کاربر گرامی شما موفقانه در سیستم صرافی آنلاین ثبت نام شدید.یک ایمیل حاوی لینک فعال سازی به ایمیل شما فرستاده شد لطفا برای فعال سازی حساب کاربری خود به ایمیلتان مراجعه نمایید</Typography>
            
            <Button variant="contained" onClick={()=>navigate('/')}>
                صفحه اصلی
            </Button>
        </Stack>
        </Container>
    );
}