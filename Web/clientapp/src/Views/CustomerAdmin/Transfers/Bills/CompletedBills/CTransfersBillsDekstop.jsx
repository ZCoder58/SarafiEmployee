import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { CurrencyText, NotExist } from '../../../../../ui-componets'
export default function CTransfersBillsDekstop({ transfers = [] }) {
    return (
        <>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            طلب
                        </TableCell>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            بدهی
                        </TableCell>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            بیلانس
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transfers.length > 0 ? transfers.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <CurrencyText
                                    value={e.talab}
                                    priceName={e.currencyName}
                                />

                            </TableCell>
                            <TableCell>
                                <CurrencyText
                                    value={e.bedehi}
                                    priceName={e.currencyName}
                                />
                            </TableCell>
                            <TableCell>
                                {e.billResult < 0 ?
                                    <Typography fontWeight={900} color="error"><CurrencyText
                                        value={e.billResult}
                                        priceName={e.currencyName}
                                    /></Typography> :
                                    <Typography fontWeight={900}>
                                        <CurrencyText
                                            value={e.billResult}
                                            priceName={e.currencyName}
                                        /></Typography>
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