import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { styled, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton } from '@mui/material'
import { CTooltip } from '../../../../ui-componets'

const TableCellHeaderStyled = styled(TableCell)({
    typography: "body1",
    fontWeight: 600
})
export default function AgenciesTableDesktopview({ agencies, handleEditClick }) {
    return (
        <Table size="small" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCellHeaderStyled>
                        نام نمایندگی
                    </TableCellHeaderStyled>
                    <TableCellHeaderStyled>
                        تعداد کارمند
                    </TableCellHeaderStyled>
                    <TableCellHeaderStyled>
                        گزینه ها
                    </TableCellHeaderStyled>
                </TableRow>
            </TableHead>
            <TableBody>
                {agencies.map((e, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Typography variant="body2">{e.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2">{e.totalEmployees}</Typography>
                        </TableCell>
                        <TableCell>
                            <CTooltip title="ویرایش">
                                <IconButton onClick={() => handleEditClick(e.id)}>
                                    <EditOutlinedIcon />
                                </IconButton>
                            </CTooltip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}