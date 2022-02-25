import React from 'react'
import authAxiosApi from '../../../axios'
import { useParams } from 'react-router'
import {  Card, CardContent, Grid, List, ListItem,styled, ListItemText, Stack, Typography } from '@mui/material'
import { CAvatar, SkeletonFull, FriendRequestButton } from '../../../ui-componets'
import CustomerStatics from '../../../helpers/statics/CustomerStatic'
import Util from '../../../helpers/Util'
const StyledListItem=styled(ListItemText)({
    '& .MuiTypography-root.MuiListItemText-secondary':{
        fontSize:15
    }
})
export default function VCOtherCustomerProfile() {
    const [profile, setProfile] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const { customerId } = useParams()
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get(`general/profile?customerId=${customerId}`).then(r => {
                setProfile(r)
            })
            setLoading(false)
        })()
    }, [customerId])
    return (
        <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={4} xs={12}>
                <Card>
                    <CardContent>
                        {loading ? <SkeletonFull /> :
                            <Stack direction="column" spacing={1} alignItems="center">
                                <CAvatar src={CustomerStatics.profilePituresPath(customerId, profile.photo)} size={150}/>
                                <Typography fontWeight={900} variant="h5">{profile.userName}</Typography>
                                <Typography fontWeight={900} fontSize={15}>{profile.name} {profile.lastName}</Typography>
                               <FriendRequestButton
                               defaultState={profile.state}
                               reverseState
                               customerId={profile.id} />
                            </Stack>
                        }
                    </CardContent>
                </Card>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={12}>
                <Card>
                    <CardContent>
                        {loading ? <SkeletonFull /> :
                            <Stack
                                direction={{
                                    xs: "column",
                                    lg: "row",
                                    md: "row",
                                    sm: "row"
                                }}
                                justifyContent="space-evenly"
                                spacing={2}>
                                <List>
                                    <ListItem>
                                        <StyledListItem
                                            primary={`نام :`}
                                            secondary={Util.displayText(profile.name)}/>
                                    </ListItem>
                                    <ListItem>
                                        <StyledListItem
                                            primary={`تخلص :`}
                                            secondary={Util.displayText(profile.lastName)} />
                                    </ListItem>
                                    <ListItem>
                                        <StyledListItem
                                            primary={`ولد :`}
                                            secondary={Util.displayText(profile.fatherName)} />
                                    </ListItem>
                                    <ListItem>
                                        <StyledListItem
                                            primary={`شماره تماس :`}
                                            secondary={Util.displayText(profile.phone)} />
                                    </ListItem>
                                </List>
                                <List>
                                    <ListItem>
                                        <StyledListItem
                                            primary={`ایمیل :`}
                                            secondary={Util.displayText(profile.email)} />
                                    </ListItem>
                                    <ListItem>
                                        <StyledListItem
                                            primary={`کشور :`}
                                            secondary={Util.displayText(profile.countryName)} />
                                    </ListItem>
                                    <ListItem>
                                        <StyledListItem
                                            primary={`آدرس :`}
                                            secondary={`${profile.city} ${profile.detailedAddress}`} />
                                    </ListItem>
                                    <ListItem>
                                        <StyledListItem
                                            primary={`وضعیت پروفایل :`}
                                            secondary={profile.isActive?"فعال":"غیر فعال"} />
                                    </ListItem>
                                </List>
                            </Stack>
                        }
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}