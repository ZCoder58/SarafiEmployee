import { Grid, Typography, Box, Stack ,Button} from '@mui/material'
import { PageSection } from '../../../../ui-componets'
import growBussinessImg from '../../../../assets/images/illustration21.png'
import React from 'react'
import { useNavigate } from 'react-router'

export default function GrowBussines() {
    const navigate=useNavigate()
    return (
        <PageSection>
            <Grid item lg={6} md={6} sm={6} x={12} display="flex" alignItems="center">
                <Stack spacing={3} direction="column">

                    <Typography variant="h4" mb={3}>
                        پیشرفت تجارت شما با خدمات صرافی آنلاین
                    </Typography>
                    <Typography variant="body1">
                        امروزه داشتن یک سیستم نرم افزاری هوشمند که روند کسب کار را سریع و دقیق مدیریت کند کمک زیادی به پیشرفت تجارت میکند.
                        صرافی آنلاین یکی از این سیستم ها میباشد که برای صرافان و حواله داران ساخته شده تا در مدیریت تجارتشان دقیق و سریع عمل کنند.صرافی آنلاین همچنین با شامل ساختن کاربران خود در جامعه صرافان و حواله داران و متمرکز ساختن آن کمک میکند تا صرافان و حواله داران به آسانی با یکدیگر معرفی شوند و با هم همکاری کنند.یکی دیگر از خصوصیات خوب این سیستم برای صرافان و حواله داران این است که این سیستم میتواند با جذب مشتری و معرفی آن به صراف و حواله دار کسب کار شما را رونق بیشتر ببخشد.
                    </Typography>
                    <Box>
                    <Button variant="contained" color="info" onClick={()=>navigate("/signup")}>
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