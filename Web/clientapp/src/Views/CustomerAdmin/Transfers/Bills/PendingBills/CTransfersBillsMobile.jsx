import React from 'react'
import { ListItem, ListItemText, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { NotExist } from '../../../../../ui-componets'

export default function CTransfersBillsMobile({ transfers=[] }) {

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
                    {transfers.length > 0 ? transfers.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell sx={{ p: 0 }}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <>
                                            {e.billResult<0?
                                <Typography fontWeight={900} color="error">{e.billResult} {e.currencyName}</Typography>:
                                <Typography fontWeight={900}>{e.billResult} {e.currencyName}</Typography>
                            }</>
                                        }
                                        primaryTypographyProps={{
                                            typography: "body1",
                                            fontWeight: 900
                                        }}
                                        secondary={
                                            <React.Fragment>
                                                <Stack component="span" spacing={1} direction="column">
                                                   
                                                    <Typography variant="body2" component="span">طلب : {e.talab} {e.currencyName}</Typography>
                                                    <Typography variant="body2" component="span">بدهی : {e.bedehi} {e.currencyName}</Typography>
                                                    
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