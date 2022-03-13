import React from 'react'
import { ListItem, Box, ListItemText, Stack, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography, ButtonGroup, IconButton, Button } from '@mui/material'
import { NotExist, CDialog, AskDialog, CurrencyText } from '../../../../ui-componets'
import authAxiosApi from '../../../../axios'
import { TransactionTypesStatics } from '../../../../helpers/statics'

export default function CustomerTransactionsMobile({ transactions }) {
    const [infoOpen, setInfoOpen] = React.useState(false)
    const [infoData, setInfoData] = React.useState(null)
    const [transactionsList, setTransactionsList] = React.useState(transactions)
    const [openAskRollback, setOpenAskRollback] = React.useState(false)
    const [transactionId, setTransactionId] = React.useState(null)
    function handleInfoClick(info) {
        setInfoData(info)
        setInfoOpen(true)
    }
    async function rollback() {
        await authAxiosApi.post('customers/accounts/transactions/rollback', {
            transactionId: transactionId
        }).then(r => {
            if(r){
                setTransactionsList(transactionsList.filter(t => t.id !== transactionId))
            }
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
                    <Typography vaiant="body1">{infoData.comment}</Typography>
                </Box>
            </CDialog>}
            <AskDialog
                open={openAskRollback}
                message={"این تغیرات به حساب شما بازگردانده خواهد شد"}
                onYes={() => rollback()}
                onNo={() => setOpenAskRollback(false)} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            انتقال
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionsList.length > 0 ? transactionsList.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell sx={{ p: 0 }}>
                                <ListItem>
                                    <ListItemText
                                        primary={<CurrencyText value={e.amount} priceName={e.priceName}/>}
                                        primaryTypographyProps={{
                                            typography: "body1",
                                            fontWeight: 900
                                        }}
                                        secondary={
                                            <React.Fragment>
                                                <Stack component="span" spacing={1} direction="column">
                                                    <Typography variant="body2" component="span">نوعیت انتقال -
                                                        {e.transactionType === TransactionTypesStatics.Deposit ?
                                                            <Chip label="اضافه شده به حساب" component="span" size="small" color="primary"></Chip> :
                                                            e.transactionType === TransactionTypesStatics.Transfer ?
                                                                <Chip label="ارسال حواله" component="span" size="small" color="info"></Chip> :
                                                                e.transactionType === TransactionTypesStatics.TransferWithDebt ?
                                                                    <Chip label="ارسال حواله به قرض" component="span" size="small" color="error"></Chip> :
                                                                    e.transactionType === TransactionTypesStatics.TransferToAccount ?
                                                                        <Chip label="انتقال به دیگر حساب" component="span" size="small" color="warning"></Chip> :
                                                                        e.transactionType === TransactionTypesStatics.TransferToAccountWithDebt ?
                                                                            <Chip label="انتقال به دیگر حساب به قرض" component="span" size="small" color="error"></Chip> :
                                                                            e.transactionType === TransactionTypesStatics.ReceivedFromAccount ?
                                                                                <Chip label="انتقال از دیگر حساب" component="span" size="small" color="success"></Chip> :
                                                                                e.transactionType === TransactionTypesStatics.Withdrawal ?
                                                                                    <Chip label="برداشت از حساب" component="span" size="small" color="info"></Chip> :
                                                                                    e.transactionType === TransactionTypesStatics.WithdrawalWithDebt ?
                                                                                        <Chip label="برداشت از حساب به قرض" component="span" size="small" color="error"></Chip> :
                                                                                        e.transactionType === TransactionTypesStatics.TransferComplete?
                                    <Chip label="اجرای حواله" size="small" color="info"></Chip>:
                                                                                        <Chip label="برداشت از حساب" size="small" component="span" color="error"></Chip>
                                                        }
                                                    </Typography>
                                                    <Typography variant="body2" component="span">تاریخ انتقال - {new Date(e.createdDate).toLocaleDateString()}</Typography>
                                                    <Stack component="span" direction="row">
                                                        <ButtonGroup component="span" fullWidth>
                                                            <Button onClick={() => handleInfoClick(e)}>
                                                                جزییات بیشتر
                                                            </Button>
                                                            {e.canRollback && <Button onClick={() => {
                                                                setTransactionId(e.id)
                                                                setOpenAskRollback(true)
                                                            }}>
                                                                بازگشت عملیه
                                                            </Button>}
                                                        </ButtonGroup>
                                                    </Stack>
                                                </Stack>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </TableCell>
                        </TableRow>
                    )) :
                        <TableRow >
                            <TableCell>
                                <NotExist />
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </>
    )
}