import { Card, CardContent, Stack, Typography,useTheme } from "@mui/material";
import React from 'react'

import { Box } from "@mui/system";
export default function BoxCardWithIcon({ imageIcon, title, content,...props }) {
    const theme=useTheme()
    return (
        <Card elevation={5} sx={{ 
            py:3,
            pb:5,
            px:3
         }} {...props}>
            <CardContent >
                <Stack direection="column" spacing={3} alignItems="center" textAlign="center">
                    <Box component="img" src={imageIcon} p={2} width={125} sx={{ 
                        backgroundColor:theme.palette.primary.main+"0d"
                     }}></Box>
                    <Typography variant="h5" fontWeight={900}>{title}</Typography>
                    <Typography variant="body2">{content}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}
