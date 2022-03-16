import { TabContext, TabPanel } from '@mui/lab'
import { Box, Card, Grid, Tab } from '@mui/material'
import CProfileInfo from './CProfileInfo'
import React from 'react'
import { TabsList } from '../../../ui-componets'
import CProfileEditForm from './CProfileEditForm'
import CProfileChangePassword from './CProfileChangePassword'
export default function VEProfile() {
    const [activeTab, setActiveTab] = React.useState("1")
    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                 <CProfileInfo/>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
               <Card>
               <TabContext value={activeTab}>
                    <TabsList onChange={(e, newValue) => setActiveTab(newValue)}>
                        <Tab value="1" label="ویرایش اطلاعات" />
                        <Tab value="2" label="تغیر رمز عبور" />
                    </TabsList>
                    <TabPanel value="1">
                        <CProfileEditForm />
                    </TabPanel>
                    <TabPanel value="2" sx={{ p:1 }}>

                        <CProfileChangePassword />
                    </TabPanel>
                </TabContext>
                   </Card> 
               
            </Grid>
        </Grid>
    )

}