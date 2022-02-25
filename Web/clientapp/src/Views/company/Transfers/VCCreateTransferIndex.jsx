import { TabContext, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material';
import React from 'react'
import { TabsList } from '../../../ui-componets';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreateTransfer from './CreateTransfer';
import SubCustomerCreateTransfer from './SubCustomerCreateTransfer';
export default function VCCreateTransferIndex() {
    const [activeTab, setActiveTab] = React.useState("1");
    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    }
    return (
        <TabContext value={activeTab}>
            <TabsList onChange={handleTabChange}>
                <Tab label="از مشتری موقت" value="1" icon={<AccountBoxIcon />} />
                <Tab label="از مشتری داعمی" icon={<ContactsIcon />} value="2" />
            </TabsList>
            <TabPanel value="1">
                <CreateTransfer/>
            </TabPanel>
            <TabPanel value="2">
                <SubCustomerCreateTransfer/>
            </TabPanel>
        </TabContext>
    )
}