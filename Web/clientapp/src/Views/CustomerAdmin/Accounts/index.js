import React from 'react'
import { TabsList } from '../../../ui-componets'
import { Tab } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import CustomerAccounts from './CustomerAccounts';
import VCustomerTransactions from './Transactions/VCustomerTransactions'
export default function VCCustomerAccounts() {
    const [activeTab, setActiveTab] = React.useState("0")
  
    return (
      <>
        <TabContext value={activeTab}>
            <TabsList onChange={(e,newTab)=>setActiveTab(newTab)}>
                <Tab value="0" label="حسابات"></Tab>
                <Tab value="1" label="انتقالات"></Tab>
            </TabsList>
            <TabPanel value="0">
                <CustomerAccounts/>
            </TabPanel>
            <TabPanel value="1">
            <VCustomerTransactions/>
            </TabPanel>
        </TabContext>
      </> 
    )
}