import { AddOutlined, EditOutlined } from '@mui/icons-material'
import { Button, IconButton, Stack, Typography,ButtonGroup, Tab } from '@mui/material'
import React from 'react'
import { CCard, CDialog, CTable, CToolbar, CTooltip, TabsList } from '../../../ui-componets'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router'
import AddCardIcon from '@mui/icons-material/AddCard';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { TabContext, TabPanel } from '@mui/lab';
import SCNewTransactionFormWithdrawal from './TransactionTypesForm/SCNewTransactionFormWithdrawal';
import SCNewTransactionFormDeposit from './TransactionTypesForm/SCNewTransactionFormDeposit';
import SCNewTransactionFormTransferToAccount from './TransactionTypesForm/SCNewTransactionFormTransferToAccount';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
export default function VCSubCustomers() {
    const [refreshTableState, setRefreshTableState] = React.useState(false)
    const [transactionDialogOpen,setTransactionDialogOpen]=React.useState(false)
    const [subCustomerUpdateAmount,setSubCustomerUpdateAmount]=React.useState(null)
    const [activeTab,setActiveTab]=React.useState("0")
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

            name: <Typography variant="body2" fontWeight={600}>تعداد حسابات</Typography>,
            selector: row => <Stack direction="column" spacing={1}>
                <Typography>{row.totalRatesAccounts}</Typography>
            </Stack>,
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
                            <AddCardIcon />
                        </IconButton>
                    </CTooltip>
                    <CTooltip title="تاریخچه انتقالات">
                        <IconButton onClick={() => {
                            navigate('/customer/subCustomers/transactions/'+row.id)
                        }}>
                            <EventNoteOutlinedIcon />
                        </IconButton>
                    </CTooltip>
                    <CTooltip title="حسابات">
                        <IconButton onClick={() => {
                            navigate('/customer/subCustomers/accounts/'+row.id)
                        }}>
                            <AccountBalanceIcon />
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
                <Typography variant="body2">تعداد حسابات: {row.totalRatesAccounts}</Typography>
                 <ButtonGroup fullWidth variant='text'>
                        <Button onClick={() => navigate('/customer/subCustomers/edit/' + row.id)} 
                        size="small"
                        >
                            <EditOutlined/>
                        </Button>
                        <Button onClick={() => {
                            updateAmount(row)
                        }}
                        size="small"
                        >
                          <AddCardIcon/>
                        </Button>
                        <Button onClick={() => {
                           navigate('/customer/subCustomers/transactions/'+row.id)
                        }}
                        size="small"
                        >
                           <EventNoteOutlinedIcon/>
                        </Button>
                        <Button onClick={() => {
                           navigate('/customer/subCustomers/accounts/'+row.id)
                        }}
                        size="small"
                        >
                           <AccountBalanceIcon/>
                        </Button>
                    </ButtonGroup>
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
                  <TabContext value={activeTab}>
                        <TabsList onChange={(e,t)=>setActiveTab(t)}>
                          <Tab label={<TextDecreaseIcon/>} value="0" />
                          <Tab label={<TextIncreaseIcon/>} value="1" />
                          {/* <Tab label={<MoveDownOutlinedIcon/>} value="2" /> */}
                        </TabsList>
                        <TabPanel value="0" sx={{ p:0 }}>
                            <SCNewTransactionFormWithdrawal subCustomer={subCustomerUpdateAmount} onSuccess={handleAmountUpdated}/>
                        </TabPanel>
                        <TabPanel value="1" sx={{ p:0 }}>
                            <SCNewTransactionFormDeposit subCustomer={subCustomerUpdateAmount} onSuccess={handleAmountUpdated}/>
                        </TabPanel>
                        {/* <TabPanel value="2" sx={{ p:0 }}>
                            <SCNewTransactionFormTransferToAccount subCustomer={subCustomerUpdateAmount} onSuccess={handleAmountUpdated}/>
                        </TabPanel> */}
                  </TabContext>
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