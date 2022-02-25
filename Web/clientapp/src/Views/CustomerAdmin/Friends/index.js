import React from 'react'
import { Card, Grid, Tab } from '@mui/material'
import { TabsList } from '../../../ui-componets'
import { TabContext, TabPanel } from '@mui/lab'
import { Navigate, useParams } from 'react-router'
import FriendsList from './FriendsList'
import FriendsRequestList from './FriendsRequestList'
import useAuth from '../../../hooks/useAuth'
export default function VCFriends() {
    const { queryTab } = useParams()
    const auth=useAuth()
    const [activeTab, setActiveTab] = React.useState(queryTab)
    if(auth.isEmployee()){
        console.log("is employee:",auth.isEmployee())
       return <Navigate to={auth.getRelatedLayoutPath()}/>
    }
    return (
       
                <Card>
                    <TabContext value={activeTab}>
                        <TabsList onChange={(e, v) => setActiveTab(v)}>
                            <Tab label={`همکاران`} value="1" />
                            <Tab label="درخواست ها" value="2" />
                        </TabsList>
                        <TabPanel value="1">
                            <FriendsList />
                        </TabPanel>
                        <TabPanel value="2">
                            <FriendsRequestList />
                        </TabPanel>
                    </TabContext>
                </Card>
    )
}