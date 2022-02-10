import { PageSection } from '../../../../ui-componets';
import { Grid,Box,Stack, Typography,Button } from '@mui/material'
import sectionRightImage from '../../../../assets/images/safty.png'
import React from 'react'

export default function SliderSection() {
    return (
        <PageSection>
            <Grid item lg={5} md={6} sm={6} xs={12} alignItems="center" display="flex">
                <Stack direction="column" spacing={2} justifyContent="center" alignContent="center" alignItems="center">
                    <Typography variant="h4" fontWeight={900}>به سیستم صرافی آنلاین خوش آمدید</Typography>
                    <Typography variant="body1">تمامی روند کاری صرافی خود را هوشمندانه مدیریت نمایید.به جامعه صرافان بپیوندید و از سهولت های ما برای توسعه تجارت خویش بهرمند شوید.</Typography>
                    <Button variant="contained" color="primary" size="large">شروع کردن</Button>
                </Stack>
            </Grid>
            <Grid item lg={7} md={6} sm={6} xs={12} >
                <Box display="flex" justifyContent="center">
                <Box component="img" src={sectionRightImage} maxWidth="100%"/>
                </Box>
            </Grid>
        </PageSection>
    )
}