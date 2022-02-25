import React from 'react'
import { CCard, TabsList } from '../../../ui-componets'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Grid, Tab } from '@mui/material';
import {TabContext, TabPanel } from '@mui/lab';
import OutboxIcon from '@mui/icons-material/Outbox';
import InboxIcon from '@mui/icons-material/Inbox';
import CInbox from './CInbox';
import COutbox from './COutbox';
export default function VCRoznamcha() {
    const [activeTab, setActiveTab] = React.useState("1")
  
    return (
        <CCard
            title="روزنامچه"
            subHeader="معلومات حواله های ارسالی و دریافتی"
            headerIcon={<CalendarTodayOutlinedIcon />}
        >
            <Grid container spacing={2}>
                    
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TabContext value={activeTab}>
                        <TabsList onChange={(e, value) => setActiveTab(value)}>
                            <Tab label="رفت" value="1" icon={<OutboxIcon/>}></Tab>
                            <Tab label="آمد" value="2" icon={<InboxIcon/>}></Tab>
                        </TabsList>
                        <TabPanel value="1">
                        <COutbox/>
                           
                        </TabPanel>
                        <TabPanel value="2">
                        <CInbox/>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </CCard>
    )
}