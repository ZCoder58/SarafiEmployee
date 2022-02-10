import { PageContainer, PageSection } from '../../../ui-componets'
import { Grid, Stack, Box, Typography, useTheme } from '@mui/material'
import Pricing from './Pricing'
import contractImg from '../../../assets/images/contract.png'
export default function VPricing() {
const theme=useTheme()
    return (
        <PageContainer>
            <PageSection sx={{ 
                backgroundColor:theme.palette.primary.main,
                color:theme.palette.primary.contrastText
             }}>
                <Grid item lg={5} md={6} sm={6} xs={12} alignItems="center" display="flex">
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h2" fontWeight={900}>قیمت ها</Typography>
                        <Typography variant="h5">
                            پلان های ما را مقایسه و یکی از پلان ها را انتخاب کنید
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item lg={7} md={6} sm={6} xs={12} >
                    <Box display="flex" justifyContent="center">
                        <Box component="img" src={contractImg} maxWidth="100%" />
                    </Box>
                </Grid>
            </PageSection>
            <PageSection>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Stack direction="column" spacing={2} alignItems="center">
                        <Typography variant="h5" fontWeight={700} color="primary">
                            یک پلان خرید انتخاب نمایید
                        </Typography>
                        <Typography variant="h6">
                            برای استفاده از سیستم صرافی آنلاین باید یکی از پلان های زیر را انتخاب کنید
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Pricing />
                </Grid>
            </PageSection>
        </PageContainer>
    )
}