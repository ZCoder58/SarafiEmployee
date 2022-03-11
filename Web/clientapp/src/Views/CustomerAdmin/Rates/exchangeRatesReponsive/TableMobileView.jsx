import CountriesRatesStatic from '../../../../helpers/statics/CountriesRatesStatic'
import { Table, TableBody, TableCell, TableHead, TableRow, Stack, Typography, Chip, Box, Button } from '@mui/material'
import { ImagePreview } from '../../../../ui-componets'

export default function TableMobileView({ exchangeRates, handleEditClick }) {
    return (
        <Table size="small" stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>
                        ارز
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {exchangeRates.map((e, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <Stack direction="column" spacing={1} >
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
                                <Stack direction="row" justifyContent="space-between" >
                                    <Stack direction="column" spacing={1} alignItems="center">
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
                                    <Box>
                                        {e.updated ? (
                                            <Chip label="آپدیت" size="small" variant='outlined' color="success"></Chip>
                                        ) : (
                                            <Chip label="آپدیت نیست" size="small" variant='outlined' color="error"></Chip>
                                        )}
                                    </Box>
                                </Stack>
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