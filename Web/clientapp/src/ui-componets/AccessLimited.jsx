import { Stack, Typography, Alert, Button } from '@mui/material'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';

export default function AccessLimited() {
    return (
        <Stack direction="column" spacing={2} pb={3} justifyContent="center" maxWidth="sm" textAlign="center">
            <div>
                <BlockOutlinedIcon sx={{ fontSize: 90 }} />
            </div>
            <Typography variant="h5">دسترسی محدود شده</Typography>
            <Alert variant="outlined" severity="warning">
                <Typography variant="h6">
                    مشتری گرامی!
                </Typography>
                <Typography variant="body1" pb={2}>
                    دسترسی شما به این بخش محدود میباشد.لطفا بسته سیستم خود به بسته بالاتر تغیر دهید.
                </Typography>
                <Button variant="contained" size="small" color="primary">معلومات بیشتر</Button>
            </Alert>
        </Stack>
    )
}