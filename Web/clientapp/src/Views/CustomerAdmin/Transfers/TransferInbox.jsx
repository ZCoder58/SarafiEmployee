import {  TableGlobalSearch, CToolbar, CTable, CTooltip, AskDialog, CurrencyText } from '../../../ui-componets'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'; import React from 'react'
import { Box, Grid, Stack, Typography, useTheme, Chip, IconButton, ListItem, ListItemText, Button } from '@mui/material'
import { PhoneOutlined, RefreshOutlined } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router'
import authAxiosApi from '../../../axios';
import { useSelector } from 'react-redux';
import DoDisturbOffOutlinedIcon from '@mui/icons-material/DoDisturbOffOutlined';
export default function InnerTransferInbox() {
    // const [loading, setLoading] = React.useState(true)
    const [refreshTableState, setRefreshTableState] = React.useState(false)
    const [searchOpen, setSeachOpen] = React.useState(false)
    const [searchText, setSearchText] = React.useState("")
    const [askDenyOpen, setAskDenyOpen] = React.useState(false)
    const [transferIdForSetDeny, setTransferIdForDeny] = React.useState("")
    const theme = useTheme()
    const navigate = useNavigate()
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    const columnsMobile = [
        {
            name: <Typography variant="body2" fontWeight={600}>از طرف</Typography>,
            selector: row => (
                <ListItem sx={{ flexDirection: "column",alignItems:"normal",px:0 }} >
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Stack direction="row"  component="span" justifyContent="space-between">
                                    <Typography variant="subtitle1" component="span" fontWeight={900}>{row.fromName} {row.fromLastName}</Typography>
                                    {row.state === 0 ? (
                                        <Chip component="span" label="در جریان" color="warning" size="small"></Chip>
                                    ) : (
                                        <Chip component="span" label="اجرا شده" color="success" size="small"></Chip>
                                    )}
                                </Stack>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Stack direction="column" component="span">
                                    <Typography component="span" variant="subtitle2" color="GrayText">نمبر حواله - {row.codeNumber}</Typography>
                                    <Typography component="span" variant="subtitle2" color="GrayText">دریافت کننده - {row.toName} {row.toLastName}</Typography>
                                    <Typography component="span" variant="subtitle2" color="GrayText">مبلغ - <CurrencyText value={row.destinationAmount} priceName={row.toCurrency}/> </Typography>
                                    <Typography component="span" variant="subtitle2" color="GrayText">کد نمبر - {row.codeNumber}</Typography>
                                </Stack>
                            </React.Fragment>
                        } />
                   <Stack direction="row" spacing={1} justifyContent="flex-end">
                   <Button variant="contained" size="small" onClick={() => navigate("/customer/transfers/inbox/" + row.id)}>
                       {row.state===0?"اجرا کردن":"جزییات"}
                    </Button>
                    {row.state===0&&
                    <Button variant="contained" color="error" size="small" onClick={()=>askForDeny(row.id)}>
                        رد کردن
                    </Button>}
                   </Stack>

                </ListItem>

            ),
            sortable: false,
            reorder: true,
        },


    ]
    const columnsDesktop = [
        {
            name: <Typography variant="body2" fontWeight={600}>از طرف</Typography>,
            selector: row => (
                <Stack direction="column">
                    <Box>{row.fromName} {row.fromLastName}</Box>
                    <Box><PhoneOutlined sx={{ color: theme.palette.primary.main }} fontSize='14px' /> {row.fromPhone}</Box>
                </Stack>
            ),
            sortable: false,
            reorder: true,
            minWidth: "300px"
        },
        {
            name: <Typography variant="body2" fontWeight={600}>دریافت کننده</Typography>,
            selector: row => (
                <Box>{row.toName} {row.toLastName}</Box>
            ),
            sortable: false,
            reorder: true
        },
        {
            name: <Typography variant="body2" fontWeight={600}>مبلغ دریافتی</Typography>,
            selector: row => (
                <Box><CurrencyText value={row.destinationAmount} priceName={row.toCurrency}/></Box>
            ),
            sortable: false,
            reorder: true
        },
        {
            name: <Typography variant="body2" fontWeight={600}>کد نمبر</Typography>,
            selector: row => (
                <Box>{row.codeNumber}</Box>
            ),
            sortable: false,
            reorder: true
        },
        {
            sortField: "state",
            name: <Typography variant="body2" fontWeight={600}>وضعیت</Typography>,
            selector: row => row.state === 0 ? (
                <Chip color='warning' label="درجریان" size='small' />
            ) : (
                <Chip color='success' label="اجرا شده" size='small' />
            ),
            sortable: true,
            reorder: true
        },
        {
            name: <Typography variant="body2" fontWeight={600}>گزینه ها</Typography>,
            selector: row =>
               <>
                <CTooltip title={row.state===0?`اجرا کردن`:"جزییات"}>
                    <IconButton onClick={() => navigate("/customer/transfers/inbox/" + row.id)}>
                        <InfoOutlinedIcon />
                    </IconButton>
                </CTooltip>
               {row.state===0&&
                <CTooltip title="رد کردن">
                <IconButton onClick={() =>askForDeny(row.id)}>
                    <DoDisturbOffOutlinedIcon  />
                </IconButton>
            </CTooltip>}
               </>
            ,
            sortable: false,
            reorder: false
        }
    ]
 
    const globalSearch = React.useCallback((searchedText) => {
        setSearchText(s => s = searchedText)
    }, [])
    function askForDeny(transferId) {
        setTransferIdForDeny(transferId)
        setAskDenyOpen(true)
    }
    async function setTransferDeny() {
        await authAxiosApi.put(`customer/transfers/denyTransfer/${transferIdForSetDeny}`).then(r => {
            refreshTable()
        })
        setAskDenyOpen(false)
    }
    function refreshTable() {
        setRefreshTableState(!refreshTableState)
    }

    return (
        // loading ? <SkeletonFull /> :

        <Grid container spacing={2}>
            <AskDialog
                open={askDenyOpen}
                onNo={() => setAskDenyOpen(!askDenyOpen)}
                onYes={() => setTransferDeny()}
                message="ایا میخواهید این حواله را رد کنید؟" />
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <CToolbar>
                    <CTooltip title="حواله جدید">
                        <IconButton onClick={() => navigate('/customer/transfers/newTransfer')}>
                            <AddOutlinedIcon />
                        </IconButton>
                    </CTooltip>
                    <CTooltip title="تازه کردن جدول">
                        <IconButton onClick={() => refreshTable()}>
                            <RefreshOutlined />
                        </IconButton>
                    </CTooltip>
                    <CTooltip title="جستجو کردن">
                        <IconButton onClick={() => setSeachOpen(!searchOpen)}>
                            <SearchOutlinedIcon />
                        </IconButton>
                    </CTooltip>
                </CToolbar>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <TableGlobalSearch open={searchOpen} onSearch={globalSearch} />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <CTable
                    striped={true}
                    searchText={searchText}
                    columns={screenXs?columnsMobile:columnsDesktop}
                    serverUrl={`customer/transfers/inbox`}
                    refreshState={refreshTableState}
                />
            </Grid>
        </Grid>

    )
}