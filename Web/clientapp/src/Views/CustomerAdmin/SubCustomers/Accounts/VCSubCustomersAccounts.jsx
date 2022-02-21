import React from 'react'
import { CCard, CDialog, CTable, CToolbar, SkeletonFull } from '../../../../ui-componets'
import authAxiosApi from '../../../../axios'
import { useParams, useNavigate } from 'react-router'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button, Card, Grid, IconButton, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { AddOutlined, ArrowBack, SignalCellularNull } from '@mui/icons-material';
import CreateSubCustomerAccountRateForm from './CreateSubCustomerAccountRateForm';
export default function VCSubCustomerAccounts() {
    const [subCustomer, setSubCustomer] = React.useState(null)
    const [refreshTableState, setRefreshTableState] = React.useState(false)
    const [createFormOpen, setCreateFormOpen] = React.useState(false)
    const [accounts, setAccounts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const { subCustomerId } = useParams()
    const navigate = useNavigate()

    function refreshTable() {
        setRefreshTableState(!refreshTableState)
    }

    React.useEffect(() => {
        (async () => {
            await authAxiosApi.get('subCustomers/' + subCustomerId)
                .then(r => {
                    setSubCustomer(r)
                })
                .catch(errors => navigate('/requestDenied'))
        })()
    }, [subCustomerId, navigate])
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('subCustomers/accounts?id=' + subCustomerId)
                .then(r => {
                    setAccounts(r)
                })
                .catch(errors => navigate('/requestDenied'))
            setLoading(false)
        })()
    }, [subCustomerId, refreshTableState])
    return (
        <CCard
            title={`حسابات ارز ${subCustomer && subCustomer.name} ${subCustomer && subCustomer.lastName}`}
            headerIcon={<AccountBalanceWalletIcon />}
            enableActions
            actions={<IconButton onClick={() => navigate('/customer/subCustomers')}>
                <ArrowBack />
            </IconButton>}
        >
            <CToolbar>
                <Button onClick={() => setCreateFormOpen(true)}
                    startIcon={<AddOutlined />}>جدید</Button>
            </CToolbar>
            {createFormOpen && <CDialog title="حساب ارز جدید"
                open={createFormOpen}
                onClose={() => setCreateFormOpen(false)} >
                <CreateSubCustomerAccountRateForm subCustomerId={subCustomerId}
                    onSubmit={() => {
                        setCreateFormOpen(false)
                        refreshTable()
                    }} />
            </CDialog>}
            {loading ? <SkeletonFull /> :
            <Grid container spacing={2}>
               { accounts.map((e, i) => (
                <Grid item lg={4} sm={4} md={6} xs={12} key={i}>
                        <Card>
                            <ListItem>
                                <ListItemText
                                primary={
                                   <Typography fontWeight={900}>{e.amount} {e.ratesCountryPriceName}</Typography>
                                }
                                secondary={
                                    <Typography variant="body2">تاریخ ایجاد حساب : {new Date(e.createdDate).toLocaleDateString()}</Typography>
                                }
                                />
                            </ListItem>
                        </Card>
                </Grid>
                ))}

            </Grid>
}
        </CCard>
    )
}