import { Grid, Typography, Box, Stack ,Button} from '@mui/material'
import { PageSection } from '../../../../ui-componets'
import growBussinessImg from '../../../../assets/images/illustration21.png'
import React from 'react'

export default function GrowBussines() {
    return (
        <PageSection>
            <Grid item lg={6} md={6} sm={6} x={12} display="flex" alignItems="center">
                <Stack spacing={3} direction="column">

                    <Typography variant="h4" mb={3}>
                        پیشرفت تجارت شما با خدمات صرافی آنلاین
                    </Typography>
                    <Typography variant="body1">
                        امروزه داشتن یک سیستم مناسب برای مدیریت کسب کار و پیشرفت آن بسیار ضروری است.صرافی آنلاین برای شما این امکان را میدهد تا روند کار صرافی خود را متمرکز و مدیریت کنید شما میتوانید با صرافی آنلاین در اصل یک اپلیکیشن برای صرافی خود بسازید و کارمندان و نمایندگی  های خود را در ان ثبت نام کنید و به مشتریان خود این امکان را فراهم سازید تا از طریق پروفایل شرکت شما به ارسال و دریافت پول بپردازند. صرافی آنلاین همچنین شما را در جامعه صرافان افغانستان شامل ساخته و میتواند با درجه بندی شما و معرفی شما به مشتریان به تبلیغ و گسترش تجارت شما کمک بسیاری کند.صرافی آنلاین با داشتن پیشکش های زیادی برای مدیریت پروسه ها به شما این امکان را میدهد تا یک سیتمی به دلخواه خود بسازید.
                    </Typography>
                    <Box>
                    <Button variant="contained" color="info">
                       حساب میسازم
                    </Button>
                    </Box>
                </Stack>
            </Grid>
            <Grid item lg={6} md={6} sm={6} x={12}>
                <Box display="flex" justifyContent="center">
                    <Box component="img" src={growBussinessImg} maxWidth="100%"></Box>
                </Box>
            </Grid>
        </PageSection>
    )
}