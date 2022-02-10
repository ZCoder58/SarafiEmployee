import { CCard, TabsList } from '../../../ui-componets'
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import React from 'react'
import { Card, Tab } from '@mui/material'
import TransferInbox from './TransferInbox'
import TransferOutbox from './TransferOutbox'
import { TabContext, TabPanel } from '@mui/lab';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
export default function VCTransfers() {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
           <Card>

               <TabContext value={value}>
                   <TabsList onChange={handleChange} >
                       <Tab label="وارده" value="1" icon={<ArrowCircleDownOutlinedIcon/>} />
                       <Tab label="ارسال شده" icon={<ArrowCircleUpOutlinedIcon/>} value="2" />
                   </TabsList>
                   <TabPanel value="1">
   
                       <TransferInbox />
   
                   </TabPanel>
                   <TabPanel value="2">
                       <TransferOutbox />
   
   
                   </TabPanel>
               </TabContext>
           </Card>
       )
}