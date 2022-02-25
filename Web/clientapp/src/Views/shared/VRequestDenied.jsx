import { Container, Typography, Stack, Button } from '@mui/material'
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth'
export default function VRequestDenied() {
    const navigate=useNavigate()
    const auth=useAuth()
    return (
        <Container component="main" maxWidth="md" sx={{ mt:10 }}>
                <Stack direction="column" spacing={2} alignItems="center">
                    <DoDisturbAltOutlinedIcon fontSize='larg' sx={{ fontSize: 100 }} />
                    <Typography variant="h5">درخواست شما رد شد</Typography>
                    <Button onClick={()=>navigate(auth.getRelatedLayoutPath())} variant="contained">صفحه خانه</Button>
                </Stack>
        </Container>

    )
}