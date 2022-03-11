import { TabContext, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import React from 'react'
import { TabsList } from '../../../../ui-componets'
import VCTransfersCompletedBills from './CompletedBills/VCTransfersCompletedBills'
import VCTransfersPendingBills from './PendingBills/VCTransfersPendingBills'
export default function VCTransfersBills() {
    const [activeTab, setActiveTab] = React.useState("1")
    return (
        <>
            <TabContext value={activeTab}>
                <TabsList onChange={(v, t) => setActiveTab(t)}>
                    <Tab label="اجرا شده" value="1" />
                    <Tab label="نا اجرا" value="2" />
                </TabsList>
                <TabPanel value='1'>
                    <VCTransfersCompletedBills />
                </TabPanel>
                <TabPanel value='2'>
                    <VCTransfersPendingBills />
                </TabPanel>
            </TabContext>
        </>
    )
}