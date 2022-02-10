import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Skeleton, styled, CardContent, Card } from '@mui/material'
import React from 'react'
import authAxiosApi from '../../../axios'
import CountriesRatesStatics from '../../../helpers/statics/CountriesRatesStatic'
import { AutoComplete, SkeletonFull } from '../../../ui-componets'
const StyledTableCell = styled(TableCell)({
    padding: 10
})
export default function DRates() {
    const [countriesRates, setCountriesRates] = React.useState([])
    const [baseCountryRate, setBaseCountryRate] = React.useState(null)
    const [exchangeRates, setExchangeRates] = React.useState([])
    const [loadingTable, setLoadingTable] = React.useState(true)
    const [loadingCountries, setLoadingCountries] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            await authAxiosApi.get('exchangeRates/countries').then(r => {
                setCountriesRates(r)
                setBaseCountryRate(r[0])
            })
            setLoadingCountries(false)
        })()
        return () => {
            setCountriesRates([])
            setLoadingCountries(true)
        }
    }, [])
    React.useEffect(() => {
        (async () => {
            if (baseCountryRate) {
                setLoadingTable(true)
                await authAxiosApi.get(`dashboard/exchangeRates/${baseCountryRate.id}`).then(r => {
                    setExchangeRates(s => s = r)
                })
            }
            setLoadingTable(false)
        })()
        return () => {
            setExchangeRates([])
            setLoadingTable(true)
        }
    }, [baseCountryRate])
    return (
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>

                        {loadingCountries ? <Skeleton width="100%" height={70} /> : <AutoComplete
                            loading={loadingCountries}
                            size="small"
                            disableClearable
                            data={countriesRates}
                            defaultValue={baseCountryRate}
                            label="بر اساس"
                            name="id"
                            required
                            onChange={(newValue) => {
                                setBaseCountryRate(newValue)
                            }}
                            getOptionLabel={(option) => `${option.countryName} (${option.priceName})`}
                            renderOption={(option, selected) => {
                                return (
                                    <Stack direction="row" spacing={1} justifyContent="space-between" width="100%">
                                        <Typography variant="caption">{option.countryName} ({option.priceName})</Typography>
                                        <img width="20px" height="20px" alt="" src={CountriesRatesStatics.flagPath(option.flagPhoto)} />
                                    </Stack>
                                )
                            }}
                        />}

                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {loadingTable ? <SkeletonFull /> :
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 900 }}>ارز</TableCell>
                                        <TableCell sx={{ fontWeight: 900 }}>معادل</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {exchangeRates.map((d, i) => (
                                        <TableRow key={i}>
                                            <StyledTableCell>
                                                <Stack direction="row" spacing={1} sx={{ fontSize: "14px" }}>
                                                    <img alt={d.abbr} src={CountriesRatesStatics.flagPath(d.flagPhoto)} width="25px" height="25px" />
                                                    <Box>{d.countryName}</Box>
                                                    <Box fontWeight={700}>({d.defaultExchangeRateAmount} {d.priceName} )</Box>
                                                </Stack>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Stack spacing={1} direction="row" sx={{ fontSize: "14px" }}>
                                                    <Box sx={{ fontWeight: 800 }}>
                                                        {d.exchangeRate}
                                                    </Box>
                                                    <Box>
                                                        ({baseCountryRate.priceName})
                                                    </Box>
                                                </Stack>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}