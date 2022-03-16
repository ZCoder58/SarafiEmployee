import {   Tab } from '@mui/material'
import React from 'react'
import {   useParams } from 'react-router'
import { TabsList } from '../../../ui-componets'
import { TabContext, TabPanel } from '@mui/lab'
import AccountsBalance from './AccountsBalance'
import BalancesTransactions from './BalancesTransactions'
export default function VCustomerBalance() {
    const { friendId } = useParams()
    const [activeTab,setActiveTab]=React.useState("0")
 return(
     <TabContext value={activeTab}>
         <TabsList onChange={(e,t)=>setActiveTab(t)}>
            <Tab label="بیلانس ها" value="0"></Tab>
            <Tab label="بل ها" value="1"></Tab>
         </TabsList>
         <TabPanel value="0">
            <AccountsBalance friendId={friendId}/>
         </TabPanel>
         <TabPanel value="1">
                <BalancesTransactions friendId={friendId}/>
         </TabPanel>
     </TabContext>
 )
}