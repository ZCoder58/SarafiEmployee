import { TableGlobalSearch, CToolbar, CTable, CTooltip, AskDialog, CurrencyText } from '../../../ui-componets'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'; import React from 'react'
import { Box, Grid, Stack, Typography, useTheme, Chip, IconButton, ListItem, ListItemText, Button } from '@mui/material'
import { PhoneOutlined, RefreshOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import authAxiosApi from '../../../axios';
import ReplayIcon from '@mui/icons-material/Replay';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
export default function TransferOutbox() {
    const [refreshTableState, setRefreshTableState] = React.useState(false)
    const [searchOpen, setSeachOpen] = React.useState(false)
    const [searchText, setSearchText] = React.useState("")
    const theme = useTheme()
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    const navigate = useNavigate()
    const columnsMobile = [
        {
            name: <Typography variant="body2" fontWeight={600}>از طرف</Typography>,
            selector: row => (
                <ListItem sx={{ flexDirection: "column", alignItems: "normal", px: 0 }} >
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Stack direction="row" component="span" justifyContent="space-between">
                                    <Typography variant="subtitle1" component="span" fontWeight={900}>{row.fromName} {row.fromLastName}</Typography>
                                    {row.state === 0 ? (
                                        <Chip component="span" label="در جریان" color="warning" size="small"></Chip>
                                    ) : row.state === 1 ? (
                                        <Chip component="span" label="اجرا شده" color="success" size="small"></Chip>
                                    ) : (
                                        <Chip component="span" label="رد شده" color="error" size="small"></Chip>
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
                        <Button variant="contained" size="small" onClick={() => navigate("/customer/transfers/outbox/" + row.id)}>
                            جزییات
                        </Button>
                        {row.state === -1 &&
                            <Button variant="contained" size="small" onClick={() => askForResend(row.id)}>
                                ارسال دوباره
                            </Button>}
                        {(row.state === 0 ||row.state===-1) &&
                            <Button variant="contained" size="small" onClick={() =>navigate(`/customer${row.accountType===1?"/subCustomers":""}/transfers/edit/${row.id}`)}>
                                ویرایش
                            </Button>}
                    </Stack>
                </ListItem>
            ),
            sortable: false,
            reorder: true,
        }
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
            ) : row.state === 1 ? (
                <Chip component="span" label="اجرا شده" color="success" size="small"></Chip>
            ) : (
                <Chip component="span" label="رد شده" color="error" size="small"></Chip>
            ),
            sortable: true,
            reorder: true
        },
        {
            name: <Typography variant="body2" fontWeight={600}>گزینه ها</Typography>,
            selector: row =>
                <>
                    <CTooltip title="جزییات">
                        <IconButton onClick={() => navigate("/customer/transfers/outbox/" + row.id)}>
                            <InfoOutlinedIcon />
                        </IconButton>
                    </CTooltip>
                    {row.state === -1 &&
                        <CTooltip title="ارسال دوباره">
                            <IconButton onClick={() => askForResend(row.id)}>
                                <ReplayIcon />
                            </IconButton>
                        </CTooltip>}
                    {(row.state === 0 || row.state===-1)&&
                        <CTooltip title="ویرایش">
                            <IconButton onClick={() => navigate(`/customer${row.accountType===1?"/subCustomers":""}/transfers/edit/${row.id}`)}>
                                <ModeEditOutlineOutlinedIcon />
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
    function refreshTable() {
        setRefreshTableState(!refreshTableState)
    }
    const [askResendOpen, setAskResendOpen] = React.useState(false)
    const [transferIdForResend, setTransferIdForResend] = React.useState("")
    function askForResend(transferId) {
        setTransferIdForResend(transferId)
        setAskResendOpen(true)
    }
    async function setTransferResend() {
        await authAxiosApi.put(`customer/transfers/resendTransfer/${transferIdForResend}`).then(r => {
            refreshTable()
        })
        setAskResendOpen(false)
    }
    return (
        // loading ? <SkeletonFull /> :

        <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <AskDialog
                    open={askResendOpen}
                    onNo={() => setAskResendOpen(false)}
                    onYes={() => setTransferResend()}
                    message="ارسال دوباره حواله ؟" />
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
                    columns={screenXs ? columnsMobile : columnsDesktop}
                    serverUrl={`customer/transfers/outbox`}
                    refreshState={refreshTableState}
                />
            </Grid>
        </Grid>
    )
}