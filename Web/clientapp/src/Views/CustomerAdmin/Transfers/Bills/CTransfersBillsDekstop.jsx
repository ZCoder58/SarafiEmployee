import React from 'react'
import { Chip, Table, Box, TableBody, TableCell, TableHead, TableRow, IconButton, Typography } from '@mui/material'
import { NotExist, CDialog, CTooltip,AskDialog } from '../../../../ui-componets'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Util from '../../../../helpers/Util';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import authAxiosApi from '../../../../axios';
import { TransactionTypesStatics } from '../../../../helpers/statics';
export default function CTransfersBillsDekstop({ transfers=[] }) {
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
                                {e.talab} {e.currencyName}
                            </TableCell>
                            <TableCell>
                                {e.bedehi} {e.currencyName}
                            </TableCell>
                            <TableCell>
                                {e.billResult<0?
                                <Typography fontWeight={900} color="error">{e.billResult} {e.currencyName}</Typography>:
                                <Typography fontWeight={900}>{e.billResult} {e.currencyName}</Typography>
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