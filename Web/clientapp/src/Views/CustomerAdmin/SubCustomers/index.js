import { AddOutlined, EditOutlined } from '@mui/icons-material'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { CCard, CDialog, CTable, CToolbar, CTooltip } from '../../../ui-componets'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router'
import NewSubCustomerTransactionFrom from './NewSubCustomerTransactionFrom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
export default function VCSubCustomers() {
    const [refreshTableState, setRefreshTableState] = React.useState(false)
    const [transactionDialogOpen,setTransactionDialogOpen]=React.useState(false)
    const [subCustomerUpdateAmount,setSubCustomerUpdateAmount]=React.useState(null)
    const {screenXs}=useSelector(states=>states.R_AdminLayout)
    const navigate = useNavigate()
    const desktopColumns = [
        {
            name: <Typography variant="body2" fontWeight={600}>مشتری</Typography>,
            selector: row => <Stack direction="column" spacing={1}>
                <Typography>{row.name} {row.fatherName}</Typography>
                <Typography variant="body2">آدرس- {row.address}</Typography>
            </Stack>,
            reorder: true
        },
        {
            name: <Typography variant="body2" fontWeight={600}>شماره تماس</Typography>,
            selector: row => row.phone,
            reorder: true
        },
        {

            sortField: "amount",
            name: <Typography variant="body2" fontWeight={600}>مقدار پول در حساب</Typography>,
            selector: row => <Stack direction="column" spacing={1}>
                <Typography>{row.amount} {row.ratesCountryPriceName}</Typography>
            </Stack>,
            sortable: true,
            reorder: true
        },
        {
            name: "گزینه ها",
            selector: row => (
                <>
                    <CTooltip title="ویرایش مشتری">
                        <IconButton onClick={() => navigate('/customer/subCustomers/edit/' + row.id)}>
                            <EditOutlined />
                        </IconButton>
                    </CTooltip>
                    <CTooltip title="انتقال جدید">
                        <IconButton onClick={() => {
                            updateAmount(row)
                        }}>
                            <ReceiptIcon />
                        </IconButton>
                    </CTooltip>
                    <CTooltip title="تاریخچه انتقالات">
                        <IconButton onClick={() => {
                            navigate('/customer/subCustomers/transactions/'+row.id)
                        }}>
                            <EventNoteOutlinedIcon />
                        </IconButton>
                    </CTooltip>
                </>
            ),
            minWidth: "122px"
        }
    ]
    const mobileColumns = [
        {
            name: <Typography variant="body2" fontWeight={600}>مشتری</Typography>,
            selector: row => <Stack direction="column" spacing={1}>
                <Typography fontWeight={900}>{row.name} {row.fatherName}</Typography>
                <Typography variant="body2">آدرس: {row.address}</Typography>
                <Typography variant="body2">شماره تماس: {row.phone}</Typography>
                <Typography variant="body2">مقدار پول در حساب: {row.amount} {row.ratesCountryPriceName}</Typography>
                 <Stack direction="row" spacing={1}>
                        <Button onClick={() => navigate('/customer/subCustomers/edit/' + row.id)} 
                        variant="contained"
                        color="primary"
                        size="small"
                        >
                            ویرایش
                        </Button>
                        <Button onClick={() => {
                            updateAmount(row)
                        }}
                        variant="contained"
                        color="primary"
                        size="small"
                        >
                           ثبت انتقال
                        </Button>
                        <Button onClick={() => {
                           navigate('/customer/subCustomers/transactions/'+row.id)
                        }}
                        variant="contained"
                        color="primary"
                        size="small"
                        >
                            تاریخچه انتقالات
                        </Button>
                    </Stack>
            </Stack>
        }
    ]
    function updateAmount(customer){
        setSubCustomerUpdateAmount(customer)
        setTransactionDialogOpen(true)
    }
    function refreshTable() {
        setRefreshTableState(!refreshTableState)
    }
    function handleAmountUpdated(){
        setTransactionDialogOpen(false)
        refreshTable()
        setSubCustomerUpdateAmount(null)
    }
    return (
        <CCard
            title="لیست حسابات مشتریان"
            subHeader={"جدول حسابات مشتریان داعمی"}
            headerIcon={<BallotOutlinedIcon />}
            enableActions
        >
            <CToolbar>
                <Button onClick={() => navigate('/customer/subCustomers/newSubCustomer')} startIcon={<AddOutlined />}>جدید</Button>
            </CToolbar>
           {transactionDialogOpen&&<CDialog title="ثبت انتقال"
              open={transactionDialogOpen}
               onClose={()=>setTransactionDialogOpen(false)} >
                   <NewSubCustomerTransactionFrom customer={subCustomerUpdateAmount} onSuccess={handleAmountUpdated}/>
            </CDialog>}
            <CTable
                serverUrl={'subCustomers'}
                striped
                columns={screenXs?mobileColumns:desktopColumns}
                refreshState={refreshTableState}
            />
        </CCard>
    )
}