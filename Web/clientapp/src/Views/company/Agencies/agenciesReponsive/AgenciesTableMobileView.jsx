import {  Table, TableBody, TableCell, TableHead, TableRow, Stack, Typography, Button } from '@mui/material'

export default function AgenciesTableMobileView({ agencies, handleEditClick }) {
    return (
        <Table size="small" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>
                        نمایندگی
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {agencies.map((e, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Stack direction="column" spacing={1} >
                                    <Typography variant="body2">{e.name}</Typography>
                                <Typography>تعداد کارمند - {e.totlaEmployees}</Typography>
                                <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(e.id)}>
                                   ویرایش
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}