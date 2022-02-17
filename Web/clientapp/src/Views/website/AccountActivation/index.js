import { Button, Card, CardContent, CircularProgress, Container, Stack, Typography } from '@mui/material';
import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { axiosApi } from '../../../axios';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import useAuth from '../../../hooks/useAuth'
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
export default function VAcountActivation() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = React.useState(true)
    const [customer, setCustomer] = React.useState(null)
    const auth=useAuth()
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                await axiosApi.put('customerAuth/activateAccount?id=' + id).then(r => {
                    setCustomer(r)
                    auth.login(r.token,true)
                })
            } catch (errors) {
                setCustomer({success:false})
            }
            setLoading(false)
        })()
    }, [id])
    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Card>
                <CardContent>
                    {loading ?
                        <Typography variant="h5">لطفا صبر کنید در حال فعال سازی ...</Typography> :
                        customer.success ? <Stack spacing={2} direection="column" alignItems="center" justifyContent="center">
                            <HowToRegOutlinedIcon sx={{ fontSize:150 }} color="success" />
                            <Typography variant='body1' fontWeight={900}>{customer.userName} تشکر از شما!</Typography>
                            <Typography variant='body1' fontWeight={900}>ایمیل آدرس {customer.email} موفقانه فعال شد برای رفتن به صفحه مدیریت بر روی دکمه زیر کلیک کنید</Typography>
                            <Button variant="contained" color="primary" onClick={() => navigate('/customer/dashboard')}>داشبورد مدیریت</Button>
                        </Stack> :
                            <Stack spacing={2} direection="column" alignItems="center" justifyContent="center">
                                <SentimentVeryDissatisfiedRoundedIcon  sx={{ fontSize:150 }} color="error" />
                                <Typography variant='body1' fontWeight={900}>درخواست شما رد شد</Typography>
                                <Button variant="contained" color="primary" onClick={() => navigate('/')}>صفحه اصلی</Button>
                            </Stack>}
                </CardContent>
            </Card>
        </Container>
    );
}