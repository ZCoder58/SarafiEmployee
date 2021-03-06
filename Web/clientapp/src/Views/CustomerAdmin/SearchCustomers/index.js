import React from 'react'
import { Box, Divider, Grid, InputBase, List, ListItem, ListItemAvatar, Paper, ListItemText, ListItemButton, Stack } from '@mui/material'
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import { LoadingButton } from '@mui/lab'
import { SearchOutlined } from '@mui/icons-material';
import authAxiosApi from '../../../axios'
import { CAvatar,FriendRequestButton } from '../../../ui-componets';
import CustomerStatic from '../../../helpers/statics/CustomerStatic'
import { useSelector } from 'react-redux';
export default function SearchCustomer() {
    const [searchText, setSearchText] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [searchResult, setSearchResult] = React.useState([])
    async function search() {
        setLoading(true)
        await authAxiosApi.get('customer/friends/search?phone=' + searchText).then(r => {
            setSearchResult(r)
        })
        setLoading(false)
    }
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    const ListItemViewDetect = ({ customer, children }) => (
        screenXs ?
            (  <Box>
            <ListItem>
                   {children}
            </ListItem>
            <Stack direction="row" justifyContent="flex-end" px={1} pb={1}>
            <FriendRequestButton
                                defaultState={customer.requestState} 
                                enableGotoProfile
                                customerId={customer.id}/>
                </Stack>
            </Box>) :
            (<ListItem secondaryAction={
                <FriendRequestButton
                defaultState={customer.requestState} 
                enableGotoProfile
                customerId={customer.id}/>
            }>
                {children}
            </ListItem>)
    )
    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Paper
                    elevation={2}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 1,
                        alignItems: "center"
                    }}>
                    <Box sx={{ mx: 1, display: "flex" }}>
                        <ContactPhoneOutlinedIcon />
                    </Box>
                    <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
                    <InputBase
                        sx={{ mx: 1, flexGrow: 1 }}
                        placeholder='?????????? ????????'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <LoadingButton
                        loading={loading}
                        loadingPosition='start'
                        variant='contained'
                        color='primary'
                        onClick={() => search()}
                        size="small"
                        startIcon={<SearchOutlined />}
                    >
                        ??????????
                    </LoadingButton>
                </Paper>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <List>
                    {searchResult.map((e, i) => (
                        <Paper elevation={1} key={i} sx={{ mb:1 }}>
                            
                            <ListItemViewDetect customer={e}>
                                <ListItemAvatar>
                                    <CAvatar src={CustomerStatic.profilePituresPath(e.id, e.photo)} size={40} variant="rounded" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${e.name} ${e.lastName}`}
                                    primaryTypographyProps={{
                                        typography: "body1"
                                    }}
                                    secondary={`${e.countryName} ${e.city}`}
                                >
                                </ListItemText>
                            </ListItemViewDetect>
                        </Paper>
                    ))}
                </List>
            </Grid>
        </Grid>
    )
}