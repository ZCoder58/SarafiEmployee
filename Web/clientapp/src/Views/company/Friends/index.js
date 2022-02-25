import React from 'react'
import { Card, Tab } from '@mui/material'
import { TabsList } from '../../../ui-componets'
import { TabContext, TabPanel } from '@mui/lab'
import { useParams } from 'react-router'
import FriendsList from './FriendsList'
import FriendsRequestList from './FriendsRequestList'
export default function VCFriends() {
    const { queryTab } = useParams()
    const [activeTab, setActiveTab] = React.useState(queryTab)
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