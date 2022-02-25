import React from 'react'
import {CAvatar, CCard, CTable, CToolbar, CTooltip} from '../../../ui-componets'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Button, ButtonGroup, Chip, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { AddOutlined, EditOutlined } from '@mui/icons-material';
import CustomerStatics from '../../../helpers/statics/CustomerStatic';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
export default function VEmployees(){
    const [refreshTableState,setRefreshTableState]=React.useState(false)
    const navigate=useNavigate()
    const {screenXs}=useSelector(states=>states.R_AdminLayout)
    function refreshTable(){
        setRefreshTableState(!refreshTableState)
    }
    const desktopColumns=[
        {
            sortField:"name",
            name:<Typography>کارمند</Typography>,
            selector:row=><ListItem>
                <ListItemAvatar>
                    <CAvatar size={45} src={CustomerStatics.profilePituresPath(row.id,row.photo)}></CAvatar>
                </ListItemAvatar>
                <ListItemText 
                primary={`${row.name} ${row.fatherName}`}
                secondary={`${row.countryName} ${row.city}`}
                />
            </ListItem>,
            sortable:true,
            reorder:true
        },
        {
            sortField:"phone",
            name:<Typography>شماره تماس</Typography>,
            selector:row=>`${row.phone}`,
            sortable:true,
            reorder:true
        },
        {
            sortField:"isActive",
            name:<Typography>وضعیت</Typography>,
            selector:row=>row.isActive?<Chip label="فعال" color="success" size="small"></Chip>:<Chip size="small" label="غیر فعال" color="secondary"></Chip>,
            sortable:true,
            reorder:true
        },
        {
            name:<Typography>گزینه ها</Typography>,
            selector:row=><CTooltip title="ویرایش کارمند">
                <IconButton onClick={()=>navigate('/company/employees/edit/'+row.id)}>
                <EditOutlined/>
            </IconButton>
            </CTooltip>
        }
    ]
    const mobileColumns=[
        {
            name:<Typography>کارمند</Typography>,
            selector:row=><ListItem>
                <ListItemAvatar>
                    <CAvatar src={CustomerStatics.profilePituresPath(row.id,row.photo)}></CAvatar>
                </ListItemAvatar>
                <ListItemText 
                primary={`${row.name} ${row.fatherName}`}
                secondary={
                    <React.Fragment>
                        <Stack component="span" direction="column" spacing={1}>
                            <Typography component="span">آدرس : {`${row.countryName} ${row.city}`}</Typography>
                            <Typography component="span">وضعیت : {row.isActive?<Chip label="فعال" component="span" color="success" size="small"></Chip>:<Chip component="span" size="small" label="غیر فعال" color="secondary"></Chip>}</Typography>
                            <ButtonGroup component="span" fullWidth>
                                <Button size="small" onClick={()=>navigate('/company/employees/edit/'+row.id)}>ویرایش</Button>
                            </ButtonGroup>
                        </Stack>
                    </React.Fragment>
                }
                />
            </ListItem>
        }
    ]
    return (
        <CCard 
        title="جدول کارمندان"
        enableActions
        headerIcon={<ListAltOutlinedIcon/>}
        >
        <CToolbar>
            <CTooltip title="کارمند جدید">
            <Button 
            onClick={()=>navigate('/company/employees/newEmployee')}
            startIcon={<AddOutlined/> }>جدید</Button>
            </CTooltip>
            <CTooltip title="تازه کردن جدول">
            <IconButton 
            onClick={()=>refreshTable()}>
                <RefreshIcon/>
            </IconButton>
            </CTooltip>
        </CToolbar>
        <CTable
        columns={screenXs?mobileColumns:desktopColumns}
        striped
        serverUrl="company/employees"
        refreshState={refreshTableState}
        />
        </CCard>
    )
}