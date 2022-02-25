import React from 'react'
import {CAvatar, CCard, CTable, CToolbar, CTooltip} from '../../../ui-componets'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Button, Chip, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { AddOutlined, EditOutlined } from '@mui/icons-material';
import CustomerStatics from '../../../helpers/statics/CustomerStatic';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router';
export default function VEmployees(){
    const [refreshTableState,setRefreshTableState]=React.useState(false)
    const navigate=useNavigate()
    function refreshTable(){
        setRefreshTableState(!refreshTableState)
    }
    const columns=[
        {
            sortField:"name",
            name:<Typography>کارمند</Typography>,
            selector:row=><ListItem>
                <ListItemAvatar>
                    <CAvatar size={50} src={CustomerStatics.profilePituresPath(row.id,row.photo)}></CAvatar>
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
        columns={columns}
        striped
        serverUrl="company/employees"
        refreshState={refreshTableState}
        />
        </CCard>
    )
}