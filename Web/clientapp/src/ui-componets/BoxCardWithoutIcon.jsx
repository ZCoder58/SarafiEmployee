import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from 'react'

export default function BoxCardWithoutIcon({ title, content, ...props }) {
    return (
        <Card elevation={0} sx={{
            py: 3,
            pb: 5,
            px: 3,
            border:0
        }} {...props}>
            <CardContent >
                <Stack direction="column" spacing={3} alignItems="center" textAlign="center">
                        <Typography variant="h5" fontWeight={900} color="primary">{title}</Typography>
                        <Typography variant="body2">{content}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}
