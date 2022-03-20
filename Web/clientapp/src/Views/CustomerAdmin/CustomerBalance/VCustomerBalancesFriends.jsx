import React from 'react'
import { Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, InputAdornment, IconButton,Typography } from '@mui/material'
import { CAvatar, CCard, NotExist, SkeletonFull } from '../../../ui-componets'
import authAxiosApi from '../../../axios';
import CustomerStatics from '../../../helpers/statics/CustomerStatic';
import BalanceIcon from '@mui/icons-material/Balance';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { CloseOutlined } from '@mui/icons-material';
import {useNavigate} from 'react-router'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
export default function VCustomerBalacesFriends() {
    const [loading, setLoading] = React.useState(false)
    const [friends, setFriends] = React.useState([])
    const [hasNext, setHasNext] = React.useState(false)
    const [hasPrevious, setHasPrevious] = React.useState(false)
    const navigate=useNavigate()
    const [filterList, setFilterList] = React.useState({
        page: 1,
        search: ""
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get("customer/friends", {
                params: filterList
            }).then(r => {
                setFriends(r.items)
                setHasPrevious(r.hasPrevious)
                setHasNext(r.hasNext)
            })
            setLoading(false)
        })()
    }, [filterList])
    return (
       <CCard 
       title="لیست همکاران"
       headerIcon={<PeopleOutlineIcon/>}
       enableActions
       enableCollapse>
            <Stack spacing={2} direcetion="column">
            <Stack direction="row" spacing={2}>
                <TextField
                    variant="outlined"
                    label="جستجو"
                    value={filterList.search}
                    onChange={(e) => setFilterList(s => s = {
                        ...s,
                        search: e.target.value
                    })}
                    InputProps={{
                        endAdornment:filterList.search?<InputAdornment position="end">
                            <IconButton onClick={() =>setFilterList(s => s = {
                                ...s,
                                search: ""
                            }) }>
                                <CloseOutlined />
                            </IconButton>
                        </InputAdornment>:""
                    }}
                />
            </Stack>
            {loading ? <SkeletonFull /> :
                <>

                    <List>
                        {friends.length>0?friends.map((friend, i) => (
                            <Box key={i}>
                                <ListItem sx={{ p:0 ,alignItems:"flex-start"}}>
                                    <ListItemAvatar>
                                        <CAvatar src={CustomerStatics.profilePituresPath(friend.customerFriendId, friend.customerFriendPhoto)}
                                            variant="rounded"
                                            size={50} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${friend.customerFriendName} ${friend.customerFriendLastName}`}
                                        secondary={
                                        <Stack component="span" direction={{ lg:"row",sm:"row",md:"row",xs:"column" }} justifyContent={"space-between"} spacing={1}>
                                            <Typography component={"span"}>آدرس -{friend.customerFriendCountryName} {friend.customerFriendCity} {friend.customerFriendDetailedAddress}</Typography>
                                            <Box component="span" sx={{ justifyContent:"flex-end",display:"flex" }}>
                                            <Button size="small" startIcon={<BalanceIcon/>} fullWidth={false} variant="contained" color="primary" onClick={()=>navigate(`/customer/balances/${friend.id}`)}>بیلانس</Button>
                                            </Box>
                                        </Stack>
                                        }
                                    />
                                </ListItem>

                                <Divider orientation='horizontal' flexItem />
                            </Box>
                        )):<NotExist/>}
                    </List>
                    <Stack justifyContent="space-around" direction="row" spaceing={2}>
                        <Button
                            disabled={!hasPrevious ? true : false}
                            startIcon={<NavigateNextIcon />}
                            onClick={() => {
                                setFilterList(s=>s={
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
                                setFilterList(s=>s={
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
       </CCard>
    )
}