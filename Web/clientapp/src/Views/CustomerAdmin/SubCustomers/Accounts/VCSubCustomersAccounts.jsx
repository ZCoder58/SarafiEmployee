import React from 'react'
import { CCard, CDialog, CToolbar, SkeletonFull } from '../../../../ui-componets'
import authAxiosApi from '../../../../axios'
import { useParams, useNavigate } from 'react-router'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button, Card, Grid, IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { AddOutlined, ArrowBack, EditOutlined } from '@mui/icons-material';
import CreateSubCustomerAccountRateForm from './CreateSubCustomerAccountRateForm';
import EditSubCustomerAccountRateForm from './EditSubCustomerAccountRateForm';
import Util from '../../../../helpers/Util'
export default function VCSubCustomerAccounts() {
    const [subCustomer, setSubCustomer] = React.useState(null)
    const [refreshTableState, setRefreshTableState] = React.useState(false)
    const [createFormOpen, setCreateFormOpen] = React.useState(false)
    const [editFormOpen, setEditFormOpen] = React.useState(false)
    const [accountRateId, setAccountRateId] = React.useState(null)
    const [accounts, setAccounts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const { subCustomerId } = useParams()
    const navigate = useNavigate()
    function handleEditClick(subCustomerAccountRateId){
        setAccountRateId(subCustomerAccountRateId)
        setEditFormOpen(true)
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
            await authAxiosApi.get('subCustomers/accounts/list?id=' + subCustomerId)
                .then(r => {
                    setAccounts(r)
                })
                .catch(errors => navigate('/requestDenied'))
            setLoading(false)
        })()
    }, [subCustomerId, refreshTableState, navigate])
    return (
      <>
       <CCard
            title={`حسابات ارز ${subCustomer && subCustomer.name} ${subCustomer && subCustomer.lastName}`}
            headerIcon={<AccountBalanceWalletIcon />}
            enableActions
            enableCollapse={false}
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
                    onSubmit={(newAccount) => {
                        setCreateFormOpen(false)
                        setAccounts([...accounts,newAccount])
                    }} />
            </CDialog>}
            {editFormOpen && <CDialog title="ویرایش حساب"
                open={editFormOpen}
                onClose={() => setEditFormOpen(false)} >
                <EditSubCustomerAccountRateForm subCustomerAcccountRateId={accountRateId}
                    onSubmit={(editedAccount) => {
                        setEditFormOpen(false)
                        setAccounts(Util.updateArray(accounts,editedAccount,"id"))
                    }} />
            </CDialog>}
        </CCard>
        {loading ? <SkeletonFull /> :
                <Grid container spacing={2}>
                    {accounts.map((e, i) => (
                        <Grid item lg={4} sm={4} md={6} xs={12} key={i}>
                            <Card>
                                <ListItem secondaryAction={
                                    <IconButton onClick={()=>handleEditClick(e.id)}>
                                        <EditOutlined/>
                                    </IconButton>
                                }>
                                    <ListItemText
                                        primary={
                                            <Typography fontWeight={900}>{e.amount} {e.priceName}</Typography>
                                        }
                                        secondary={
                                            <Typography variant="caption">تاریخ ایجاد حساب : {new Date(e.createdDate).toLocaleDateString()}</Typography>
                                        }
                                    />
                                </ListItem>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            }
      </> 
    )
}