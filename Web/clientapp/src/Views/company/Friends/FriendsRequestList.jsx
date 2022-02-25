import React from 'react'
import { Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material'
import { CAvatar, FriendRequestButton, NotExist, SkeletonFull } from '../../../ui-componets'
import authAxiosApi from '../../../axios';
import CustomerStatics from '../../../helpers/statics/CustomerStatic';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useSelector } from 'react-redux'
export default function FriendsRequestList() {
    const [loading, setLoading] = React.useState(false)
    const [requests, setRequests] = React.useState([])
    const [hasNext, setHasNext] = React.useState(false)
    const [hasPrevious, setHasPrevious] = React.useState(false)
    const [filterList, setFilterList] = React.useState({
        page: 1,
    })
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    const ListItemViewDetect = ({ request, children }) => (
        screenXs ?
            (  <Box>
            <ListItem>
                   {children}
            </ListItem>
            <Stack direction="row" justifyContent="flex-end" px={1} pb={1}>
                    <FriendRequestButton 
                    enableGotoProfile 
                    defaultState={request.state} 
                    reverseState
                    customerId={request.customerId} 
                    onClick={() => removeRequest(request.customerId)} />
                </Stack>
            </Box>) :
            (<ListItem secondaryAction={
                <FriendRequestButton 
                enableGotoProfile 
                defaultState={request.state} 
                reverseState
                customerId={request.customerId} 
                onClick={() => removeRequest(request.customerId)} />
            }>
                {children}
            </ListItem>)
    )

    function removeRequest(customerId) {
        setRequests(r => r.filter(e => e.customerId !== customerId))
    }

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get("customer/friends/requests", {
                params: filterList
            }).then(r => {
                setRequests(r.items)
                setHasPrevious(r.hasPrevious)
                setHasNext(r.hasNext)
            })
            setLoading(false)
        })()
    }, [filterList])

    return (
        <Stack spacing={2} direcetion="column">
            {loading ? <SkeletonFull /> :
                <>
                    <List>
                        {requests.length > 0 ? requests.map((request, i) => (
                            <Box key={i}>
                                <ListItemViewDetect request={request}>
                                    <ListItemAvatar>
                                        <CAvatar src={CustomerStatics.profilePituresPath(request.custm, request.customerPhoto)}
                                            variant="rounded"
                                            size={50} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${request.customerName} ${request.customerLastName}`}
                                        secondary={`آدرس -${request.customerCountryName} ${request.customerCity} ${request.customerDetailedAddress}`}
                                    />
                                </ListItemViewDetect>
                                <Divider orientation='horizontal' flexItem />
                            </Box>
                        )) : <NotExist />}
                    </List>
                    <Stack justifyContent="space-around" direction="row" spaceing={2}>
                        <Button
                            disabled={!hasPrevious ? true : false}
                            startIcon={<NavigateNextIcon />}
                            onClick={() => {
                                setFilterList(s => s = {
                                    ...s,
                                    page: (s.page - 1)
                                })
                            }}
                        >
                            صفحه قبل
                        </Button>
                        <Button
                            disabled={!hasNext ? true : false}
                            endIcon={<NavigateBeforeIcon />}
                            onClick={() => {
                                setFilterList(s => s = {
                                    ...s,
                                    page: (s.page + 1)
                                })
                            }}
                        >
                            صفحه بعد
                        </Button>
                    </Stack>
                </>
            }
        </Stack>
    )
}