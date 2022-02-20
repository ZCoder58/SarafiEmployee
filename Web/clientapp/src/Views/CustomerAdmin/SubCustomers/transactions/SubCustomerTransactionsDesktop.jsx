import React from 'react'
import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { NotExist } from '../../../../ui-componets'

export default function SubCustomerTransactionsDesktop({ transactions }) {
    return (
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
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions.length > 0 ? transactions.map((e, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            {e.amount} {e.priceName}
                        </TableCell>
                        <TableCell>
                            {e.transactionType===1?
                            <Chip label="انتقال به حساب" color="primary"></Chip>:
                            <Chip label="برداشت از حساب" color="error"></Chip>}
                        </TableCell>
                        <TableCell>
                            {new Date(e.createdDate).toLocaleDateString()}
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
    )
}