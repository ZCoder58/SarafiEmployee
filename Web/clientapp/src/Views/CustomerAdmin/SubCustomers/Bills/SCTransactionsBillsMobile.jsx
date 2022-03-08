import React from 'react'
import { ListItem, ListItemText, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { NotExist } from '../../../../ui-componets'

export default function SCTransactionsBillsMobile({ transactions=[],isPersonReport=false }) {

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ typography: "body1", fontWeight: 900 }}>
                            بیلانس ها
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.length > 0 ? transactions.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell sx={{ p: 0 }}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <>
                                            {
                                            isPersonReport?(e.totalBills<0?
                                <Typography fontWeight={900} color="error">{e.totalBills} {e.currencyName}</Typography>:
                                <Typography fontWeight={900}>{e.totalBills} {e.currencyName}</Typography>):
                                <>
                                <Typography fontWeight={900}>طلب : {e.totalTalab} {e.currencyName}</Typography>
                                <Typography fontWeight={900} color="error">بدهی : {e.totalBedehi} {e.currencyName}</Typography>
                                </>
                            }</>
                                        }
                                        primaryTypographyProps={{
                                            typography: "body1",
                                            fontWeight: 900
                                        }}
                                        secondary={
                                            <React.Fragment>
                                                <Stack component="span" spacing={1} direction="column">
                                                   
                                                    <Typography variant="body2" component="span">رسید : {e.totalRasid} {e.currencyName}</Typography>
                                                    <Typography variant="body2" component="span">برد : {e.totalBord} {e.currencyName}</Typography>
                                                    <Typography variant="body2" component="span">حواله : {e.totalHawala} {e.currencyName}</Typography>
                                                    
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