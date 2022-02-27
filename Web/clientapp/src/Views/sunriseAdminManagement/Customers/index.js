import React from 'react'
import { AskDialog, CCard, CTable, CToolbar, CTooltip} from '../../../ui-componets'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Button, ButtonGroup, Chip, IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { EditOutlined } from '@mui/icons-material'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import authAxiosApi from '../../../axios';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
export default function VMCustomers(){
    const [refreshTableState,setRefreshTableState]=React.useState(false)
    const [premiumAskOpen,setPremiumaskOpen]=React.useState(false)
    const [tempCustomerId,setTempCustomerId]=React.useState(null)
    const navigate=useNavigate()
    const {screenXs}=useSelector(states=>states.R_AdminLayout)
    function refreshTable(){
        setRefreshTableState(!refreshTableState)
    }
    const desktopColumns=[
        {
            sortField:"name",
            name:<Typography>مشتری</Typography>,
            selector:row=><ListItem>
                <ListItemText 
                primary={`${row.userName}`}
                />
            </ListItem>,
            sortable:true,
            reorder:true
        },
        {
            sortField:"phone",
            name:<Typography>نوع کاربر</Typography>,
            selector:row=>row.userType,
            sortable:true,
            reorder:true
        },
        {
            sortField:"phone",
            name:<Typography>نوع حساب</Typography>,
            selector:row=>row.isPremiumAccount?"طلایی":"ساده",
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
            selector:row=>!row.isPremiumAccount&&<CTooltip title="طلایی سازی">
                <IconButton onClick={()=>setAskPremium(row.id)}>
                <AdminPanelSettingsOutlinedIcon/>
            </IconButton>
            </CTooltip>
        }
    ]
    const mobileColumns=[
        {
            name:<Typography>کارمند</Typography>,
            selector:row=><ListItem>
                <ListItemText 
                primary={`${row.userName}`}
                secondary={
                    <React.Fragment>
                        <Stack component="span" direction="column" spacing={1}>
                            <Typography component="span">نوع کاربر : {row.userType}</Typography>
                            <Typography component="span">نوع حساب : {row.isPremiumAccount?"طلایی":"ساده"}</Typography>
                            <Typography component="span">وضعیت : {row.isActive?<Chip label="فعال" component="span" color="success" size="small"></Chip>:<Chip component="span" size="small" label="غیر فعال" color="secondary"></Chip>}</Typography>
                            <ButtonGroup component="span" fullWidth>
                              {!row.isPremiumAccount&&  <Button size="small" onClick={()=>setAskPremium(row.id)}>طلایی سازی</Button>}
                            </ButtonGroup>
                        </Stack>
                    </React.Fragment>
                }
                />
            </ListItem>
        }
    ]
    function setAskPremium(id){
        setTempCustomerId(id)
        setPremiumaskOpen(true)
    }
    async function handlerPremiumClick(){
        await authAxiosApi.put("management/customers/setAccountPremium",{
            id:tempCustomerId
        }).then(r=>{
            setTempCustomerId(null)
            setPremiumaskOpen(false)
            refreshTable()
        })
    }
    return (
        <CCard 
        title="جدول مشتریان"
        enableActions
        headerIcon={<ListAltOutlinedIcon/>}
        >
            <AskDialog 
            onNo={()=>setPremiumaskOpen(false)}
            onYes={()=>handlerPremiumClick()}
            open={premiumAskOpen}
            />
        <CToolbar>
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
        serverUrl="management/customers"
        refreshState={refreshTableState}
        />
        </CCard>
    )
}