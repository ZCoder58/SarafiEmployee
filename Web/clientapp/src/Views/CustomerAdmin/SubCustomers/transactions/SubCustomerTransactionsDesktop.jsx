import React from 'react'
import { Chip, Table, Box, TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from '@mui/material'
import { NotExist, CDialog, CTooltip,AskDialog } from '../../../../ui-componets'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Util from '../../../../helpers/Util';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import authAxiosApi from '../../../../axios';
export default function SubCustomerTransactionsDesktop({ transactions=[] }) {
    const [infoOpen, setInfoOpen] = React.useState(false)
    const [infoData, setInfoData] = React.useState(null)
    const [openAskRollback,setOpenAskRollback]=React.useState(false)
    const [transactionId,setTransactionId]=React.useState(null)
    const [transactionsList,setTransactionsList]=React.useState(transactions)

    function handleInfoClick(info){
        setInfoData(info)
        setInfoOpen(true)
    }
    async function rollback(){
        await authAxiosApi.post('subCustomers/transactions/rollback',{
            transactionId:transactionId
        }).then(r=>{
            setTransactionsList(transactionsList.filter(t => t.id !== transactionId))
            setOpenAskRollback(false)
        })
    }
    return (
        <>
            {infoOpen && <CDialog
                open={infoOpen}
                onClose={() => setInfoOpen(false)}
                title={"جزییات بیشتر"}
            >
                <Typography vaiant="body1" fontWeight={900}>ملاحظات :</Typography>
                <Box>
                <Typography vaiant="body1">{Util.displayText(infoData.comment)}</Typography>
                </Box>
            </CDialog>}
            <AskDialog 
            open={openAskRollback}
            onYes={()=>rollback()}
            onNo={()=>setOpenAskRollback(false)}/>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            مقدار
                        </TableCell>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            نوعیت انتقال
                        </TableCell>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            تاریخ انتقال
                        </TableCell>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            گزینه ها
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionsList.length > 0 ? transactionsList.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                {e.amount} {e.priceName}
                            </TableCell>
                            <TableCell>
                                {e.transactionType === 1 ?
                                    <Chip label="انتقال به حساب" size="small" color="primary"></Chip> :
                                    <Chip label="برداشت از حساب" size="small" color="error"></Chip>}
                            </TableCell>
                            <TableCell>
                                {new Date(e.createdDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <CTooltip title="جزییات بیشتر">
                                <IconButton onClick={()=>handleInfoClick(e)}>
                                    <InfoOutlinedIcon />
                                </IconButton>
                                </CTooltip>
                               {e.canRollback&&
                                    <CTooltip title="بازگشت عملیه">
                                    <IconButton onClick={()=>{
                                        setTransactionId(e.id)
                                        setOpenAskRollback(true)
                                        }}>
                                        <SettingsBackupRestoreIcon />
                                    </IconButton>
                                    </CTooltip>
                               }
                            </TableCell>
                        </TableRow>
                    )) :
                        <TableRow >
                            <TableCell colSpan={3}>
                                <NotExist />
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </>
    )
}