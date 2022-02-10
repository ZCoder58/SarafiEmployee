import { Box, Button, Stack, Table, Typography,TableBody,TableRow,TableCell } from "@mui/material";
import { useNavigate } from "react-router";
import illustration20 from '../../../assets/images/illustration20.png'
import React from 'react'
import { SignupContext } from './index';

export default function UserSignupDone() {
    const navigate = useNavigate()
    const {pack,signupModel}=React.useContext(SignupContext)
    return (
        <Stack direction="column" spacing={3} alignItems="center" justifyContent="center">

            <Box display="flex">
                <Box component="img" src={illustration20} maxWidth="100%" />
            </Box>
            <Typography variant="body1">کاربر گرامی شما موفقانه در سیستم صرافی آنلاین ثبت نام شدید.ّبعد از پرداخت قیمت بسته خود اکانت شما فعال میشود</Typography>
           <Typography variant="h4" color="seconday">
            اطلاعات فورم شما:
           </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            نام:
                        </TableCell>
                        <TableCell>
                            {signupModel.name}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            تخلص:
                        </TableCell>
                        <TableCell>
                            {signupModel.lastName}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            شماره تماس:
                        </TableCell>
                        <TableCell>
                            {signupModel.phone}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            ایمیل:
                        </TableCell>
                        <TableCell>
                            {signupModel.email}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                           نام شرکت:
                        </TableCell>
                        <TableCell>
                            {signupModel.companyName}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            بسته:
                        </TableCell>
                        <TableCell>
                            {pack}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button variant="contained" onClick={()=>navigate('/')}>
                صفحه اصلی
            </Button>
        </Stack>
    );
}