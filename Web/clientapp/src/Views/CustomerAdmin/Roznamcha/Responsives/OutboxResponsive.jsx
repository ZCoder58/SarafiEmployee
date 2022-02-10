import { ListItem, ListItemText, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { NotExist } from '../../../../ui-componets'
export const TableRoznamchaOutboxDesktop = ({ transfers=[] }) => (
    <Table>
    <TableHead>
        <TableRow>
            <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                مقدار
            </TableCell>
            <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                تعداد حواله
            </TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
    {transfers.length>0? transfers.map((e, i) => (
                <TableRow key={i}>
                    <TableCell>
                        {e.totalAmount} {e.currencyName}
                    </TableCell>
                    <TableCell>
                        {e.totalTransfers}
                    </TableCell>
                </TableRow>
            )):
            <TableRow >
                    <TableCell colSpan={3}>
                       <NotExist/>
                    </TableCell>
                </TableRow>}
    </TableBody>
</Table>
)

export const TableRoznamchaOutboxMobile = ({transfers=[]}) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                    رفت ها
                </TableCell>
               
            </TableRow>
        </TableHead>
        <TableBody>

            {transfers.length > 0 ? transfers.map((e, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <ListItem>
                            <ListItemText
                            primary={`${e.totalAmount} ${e.currencyName}`}
                            secondary={
                                <React.Fragment>
                                    <Stack component="span" spacing={1} direction="column">
                                        <Typography component="span">مجموع حواله - {e.totalTransfers}</Typography>                                   
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
    )