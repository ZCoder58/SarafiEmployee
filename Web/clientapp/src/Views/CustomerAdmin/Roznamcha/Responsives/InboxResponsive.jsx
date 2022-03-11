import { ListItem, ListItemText, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { CurrencyText, NotExist } from '../../../../ui-componets'
export const TableRoznamchaInboxDesktop = ({ transfers=[] }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                    مقدار
                </TableCell>
                <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                    تعداد حواله
                </TableCell>
                <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                    مجموع کمیشن
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>

            {transfers.length > 0 ? transfers.map((e, i) => (
                <TableRow key={i}>
                    <TableCell>
                    <CurrencyText value={e.totalAmount} priceName={e.currencyName}/>
                    </TableCell>
                    <TableCell>
                        {e.totalTransfers}
                    </TableCell>
                    <TableCell>
                    <CurrencyText value={e.totalFee} priceName={e.currencyName}/>
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

export const TableRoznamchaInboxMobile = ({transfers=[]}) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                    آمد ها 
                </TableCell>
               
            </TableRow>
        </TableHead>
        <TableBody>

            {transfers.length > 0 ? transfers.map((e, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <ListItem>
                            <ListItemText
                            primary={<CurrencyText value={e.totalAmount} priceName={e.currencyName}/>}
                            primaryTypographyProps={{ 
                                typography:"body1",
                                fontWeight:900
                             }}
                            secondary={
                                <React.Fragment>
                                    <Stack component="span" spacing={1} direction="column">
                                        <Typography component="span">مجموع حواله - {e.totalTransfers}</Typography>
                                        <Typography component="span">مجموع کمیشن - <CurrencyText value={e.totalFee} priceName={e.currencyName}/></Typography>
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