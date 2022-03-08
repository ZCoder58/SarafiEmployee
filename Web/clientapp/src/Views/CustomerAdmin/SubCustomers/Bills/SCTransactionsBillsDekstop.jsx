import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { NotExist } from '../../../../ui-componets'
export default function SCTransactionsBillsDekstop({ transactions = [], isPersonReport = false }) {
    return (
        <>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            برد
                        </TableCell>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            رسید
                        </TableCell>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            حواله
                        </TableCell>
                        {
                            isPersonReport ?
                                <>
                                    <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                                        بیلانس
                                    </TableCell>
                                </> :
                                <>
                                    <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                                        طلب
                                    </TableCell>
                                    <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                                        بدهی
                                    </TableCell>
                                </>
                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.length > 0 ? transactions.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                {e.totalBord} {e.currencyName}
                            </TableCell>
                            <TableCell>
                                {e.totalRasid} {e.currencyName}

                            </TableCell>
                            <TableCell>
                                {e.totalHawala} {e.currencyName}
                            </TableCell>
                            {
                                isPersonReport ?
                                    <>
                                        <TableCell>
                                            {e.totalBills < 0 ?
                                                <Typography fontWeight={900} color="error">{e.totalBills} {e.currencyName}</Typography> :
                                                <Typography fontWeight={900}>{e.totalBills} {e.currencyName}</Typography>
                                            }
                                        </TableCell>
                                    </> :
                                    <>
                                        <TableCell>
                                        <Typography fontWeight={900}>{e.totalTalab} {e.currencyName}</Typography>
                                        </TableCell>
                                        <TableCell>
                                        <Typography fontWeight={900} color="error">{e.totalBedehi} {e.currencyName}</Typography>
                                        </TableCell>
                                    </>
                            }
                        </TableRow>
                    )) :
                        <TableRow >
                            <TableCell colSpan={isPersonReport?4:6}>
                                <NotExist/>
                            </TableCell>
                        </TableRow>}
                </TableBody>
            </Table>
        </>
    )
}