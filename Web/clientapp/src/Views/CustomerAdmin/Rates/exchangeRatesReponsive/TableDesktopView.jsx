import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CountriesRatesStatic from '../../../../helpers/statics/CountriesRatesStatic'
import { styled, Table, TableBody, TableCell, TableHead, TableRow,Stack,Typography,Chip,IconButton, } from '@mui/material'
import { ImagePreview, CTooltip } from '../../../../ui-componets'

const TableCellHeaderStyled = styled(TableCell)({
    typography: "body1",
    fontWeight: 600
})
export default function TableDesktopview({exchangeRates,handleEditClick}){
    return (
        <Table size="small" stickyHeader>
        <TableHead>
            <TableRow>
                <TableCellHeaderStyled>
                    ارز
                </TableCellHeaderStyled>
                <TableCellHeaderStyled>
                    معادل
                </TableCellHeaderStyled>
                <TableCellHeaderStyled>
                    حالت
                </TableCellHeaderStyled>
                <TableCellHeaderStyled>
                    گزینه ها
                </TableCellHeaderStyled>
            </TableRow>
        </TableHead>
        <TableBody>
            {exchangeRates.map((e, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <ImagePreview
                                imagePath={CountriesRatesStatic.flagPath(e.fromRatesCountryFlagPhoto)}
                                size={20}
                                isWidthTheSame
                            />
                            <Typography variant="body2">{e.fromRatesCountryFaName}</Typography>
                            <Typography variant="body2">{e.fromAmount}</Typography>
                            <Typography variant="body2">{e.fromRatesCountryPriceName}</Typography>
                            <Typography variant="body2">به</Typography> 
                            <Typography variant="body2">{e.toRatesCountryPriceName}</Typography>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        <Stack direction="column" spacing={1}>
                            <Stack direction="row" spacing={1}>
                            <Typography variant="body2">فروش : </Typography>
                            <Typography variant="body2">{e.toExchangeRateSell}</Typography>
                            <Typography variant="body2">{e.toRatesCountryPriceName}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                            <Typography variant="body2">خرید : </Typography>
                            <Typography variant="body2">{e.toExchangeRateBuy}</Typography>
                            <Typography variant="body2">{e.toRatesCountryPriceName}</Typography>
                            </Stack>
                        </Stack>
                    </TableCell>
                    <TableCell>
                        {e.updated?(
                            <Chip label="آپدیت" size="small" variant='outlined' color="success"></Chip>
                        ):(
                            <Chip label="آپدیت نیست" size="small" variant='outlined' color="error"></Chip>
                        )}
                    </TableCell>
                    <TableCell>
                        <CTooltip title="ویرایش">
                            <IconButton onClick={()=>handleEditClick(e.id)}>
                                <EditOutlinedIcon/>
                            </IconButton>
                        </CTooltip>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    )
}