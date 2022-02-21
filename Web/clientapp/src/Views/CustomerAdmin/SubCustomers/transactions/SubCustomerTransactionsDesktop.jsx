import React from 'react'
import { Chip, Table, Box, TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from '@mui/material'
import { NotExist, CDialog, CTooltip } from '../../../../ui-componets'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
export default function SubCustomerTransactionsDesktop({ transactions }) {
    const [infoOpen, setInfoOpen] = React.useState(false)
    const [infoData, setInfoData] = React.useState(null)
    function handleInfoClick(info){
        setInfoData(info)
        setInfoOpen(true)
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
            <Table>
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
                    {transactions.length > 0 ? transactions.map((e, i) => (
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