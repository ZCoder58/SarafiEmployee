import { TabContext, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import React from 'react'
import { ConvertCurrency, TabsList } from '../../../ui-componets'
import CExchangeMoney from './CExchangeMoney'
CurrencyExchange.defaultProps={
    onSuccess:()=>{}
}
export default function CurrencyExchange({onSuccess}){
    const [activeTab,setActiveTab]=React.useState("1")
    return (
        <TabContext value={activeTab}>
            <TabsList onChange={(e,newTab)=>setActiveTab(newTab)}>
                <Tab label='محاسبه ارز' value="1"/>
                <Tab label='خرید/فروش' value="2"/>
            </TabsList>
            <TabPanel value="1">
                <ConvertCurrency/>
            </TabPanel>
            <TabPanel value="2">
                <CExchangeMoney onSuccess={onSuccess}/>
            </TabPanel>
        </TabContext>
    )
}