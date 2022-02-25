import React from "react";
import { Grid } from '@mui/material'
import Profits from './Profits'
const VDashboard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
            </Grid>
            <Profits />
        </Grid>
    )
}
export default VDashboard