import { Grid, Paper } from '@mui/material'
import React from 'react'

/**
 * Page sub sections
 * @param spacing param0 
 * @returns Grid Container
 * 
 */
export default function PageSection({ spacing = 2, children, ...props }) {
    return (
        <Paper elevation={0}>
            <Grid {...props} container px={4} py={10} spacing={spacing}>
                {children}
            </Grid>
        </Paper>
    )
}