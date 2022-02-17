import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'

/**
 * 
 * @param title param0 
 * @returns Grid item lg=12 md=12 sm=12 xs=12
 */
export default function PageSecionTitle({ title, children, ...props }) {
    return (
        <Grid {...props} item lg={12} md={12} sm={12} xs={12} pb={7}>
            <Divider>
                <Typography variant="h5">{title}</Typography>
            </Divider>
            {children}
        </Grid>
    )
}