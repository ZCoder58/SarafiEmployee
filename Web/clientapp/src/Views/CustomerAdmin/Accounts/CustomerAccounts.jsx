import React from 'react'
import { CCard, CDialog, CToolbar, SkeletonFull,CTooltip, TabsList, CTable } from '../../../ui-componets'
import authAxiosApi from '../../../axios'
import { useNavigate } from 'react-router'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Button, ButtonGroup, Card, Grid, IconButton, ListItem, ListItemText, Stack, Tab, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import CreateCustomerAccountRateForm from './CreateCustomerAccountRateForm';
import AddCardIcon from '@mui/icons-material/AddCard';
import { TabContext, TabPanel } from '@mui/lab';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import SCustomerNewTransactionFormWithdrawal from './TransactionTypesForm/SCustomerNewTransactionFormWithdrawal';
import SCustomerNewTransactionFormDeposit from './TransactionTypesForm/SCustomerNewTransactionFormDeposit';
import SCustomerNewTransactionFormTransferToAccount from './TransactionTypesForm/SCustomerNewTransactionFormTransferToAccount';
import { useSelector } from 'react-redux';
export default function CustomerAccounts() {
    const [createFormOpen, setCreateFormOpen] = React.useState(false)
    const navigate = useNavigate()
    const [activeTab,setActiveTab]=React.useState("0")
    const [refreshTableState, setRefreshTableState] = React.useState(false)
    const [transactionDialogOpen,setTransactionDialogOpen]=React.useState(false)
    const [customerAccount,setCustomerAccount]=React.useState(null)
    const {screenXs}=useSelector(states=>states.R_AdminLayout)

    const desktopColumns = [
        {
            name: <Typography variant="body2" fontWeight={600}>حساب</Typography>,
            selector: row => <Typography fontWeight={900}>{row.amount} {row.priceName}</Typography>,
            reorder: true
        },
        {
            name: "گزینه ها",
            selector: row => (
                <>
                    <CTooltip title="انتقال جدید">
                        <IconButton onClick={() => {
                            updateAmount(row)
                        }}>
                            <AddCardIcon />
                        </IconButton>
                    </CTooltip>
                </>
            ),
            minWidth: "122px"
        }
    ]
    const mobileColumns = [
        {
            name: <Typography variant="body2" fontWeight={600}>حساب</Typography>,
            selector: row => <Stack direction="column" spacing={1}>
              <Typography fontWeight={900}>{row.amount} {row.priceName}</Typography>
                 <ButtonGroup fullWidth variant='outlined'>
                        <Button onClick={() => {
                            updateAmount(row)
                        }}
                        size="small"
                        >
                         انتقال جدید
                        </Button>
                    </ButtonGroup>
            </Stack>
        }
    ]
    function updateAmount(customerAc){
        setCustomerAccount(customerAc)
        setTransactionDialogOpen(true)
    }
    function handleAmountUpdated(){
        setTransactionDialogOpen(false)
        setCustomerAccount(null)
        refreshTable()
    }
    function refreshTable(){
        setRefreshTableState(s=>!s)
    }
    return (
      <>
       <CCard
            title={`حسابات ارز من`}
            headerIcon={<AccountBalanceWalletIcon />}
            enableActions
            enableCollapse
        >
            <CToolbar>
                <Button onClick={() => setCreateFormOpen(true)}
                    startIcon={<AddOutlined />}>جدید</Button>
            </CToolbar>
            {createFormOpen && <CDialog title="حساب ارز جدید"
                open={createFormOpen}
                onClose={() => setCreateFormOpen(false)} >
                <CreateCustomerAccountRateForm
                    onSubmit={() => {
                        setCreateFormOpen(false)
                        refreshTable()
                    }} />
            </CDialog>}
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
                            <SCustomerNewTransactionFormWithdrawal customerAccount={customerAccount} onSuccess={handleAmountUpdated}/>
                        </TabPanel>
                        <TabPanel value="1" sx={{ p:0 }}>
                            <SCustomerNewTransactionFormDeposit customerAccount={customerAccount} onSuccess={handleAmountUpdated}/>
                        </TabPanel>
                        {/* <TabPanel value="2" sx={{ p:0 }}>
                            <SCustomerNewTransactionFormTransferToAccount customerAccount={customerAccount} onSuccess={handleAmountUpdated}/>
                        </TabPanel> */}
                  </TabContext>
            </CDialog>}
           <CTable
           columns={screenXs?mobileColumns:desktopColumns}
           serverUrl='customer/accounts'
           striped
           refreshState={refreshTableState}
           />
        </CCard>
      </> 
    )
}