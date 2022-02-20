import React from 'react'
import { ListItem, ListItemText, Stack, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { NotExist } from '../../../../ui-componets'

export default function SubCustomerTransactionsMobile({ transactions = [] }){
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                    انتقال
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {transactions.length > 0 ? transactions.map((e, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <ListItem>
                            <ListItemText
                                primary={`${e.amount} ${e.priceName}`}
                                primaryTypographyProps={{
                                    typography: "body1",
                                    fontWeight: 900
                                }}
                                secondary={
                                    <React.Fragment>
                                        <Stack component="span" spacing={1} direction="column">
                                            <Typography component="span">نوعیت انتقال - {e.transactionType === 1 ?
                                                <Chip component="span" label="انتقال به حساب" color="primary"></Chip> :
                                                <Chip component="span" label="برداشت از حساب" color="error"></Chip>}
                                                </Typography>
                                            <Typography component="span">تاریخ انتقال - {new Date(e.createdDate).toLocaleDateString()}</Typography>
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
}