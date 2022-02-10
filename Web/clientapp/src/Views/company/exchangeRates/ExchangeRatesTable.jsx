import { Box, Grid, Stack, Typography, useTheme } from "@mui/material"
import CountriesRatesStatics from "../../../helpers/statics/CountriesRatesStatic"
import { CTable } from "../../../ui-componets"
import React from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
export default function ExchangeRateTable({ baseCountryRate, refreshTableState,exchangeReverse ,rateAmount }) {
    const theme = useTheme()
    const columns = [
        {
            name: <Typography variant="body1" fontWeight={600}>ارز</Typography>,
            selector: row => (
                <Stack direction="row" spacing={1} sx={{ fontSize: "14px" }}>
                    <img alt={row.abbr} src={CountriesRatesStatics.flagPath(row.flagPhoto)} width="25px" height="25px" />
                    <Box>{row.countryName}</Box>
                    <Box fontWeight={700}>({exchangeReverse?row.defaultExchangeRateAmount:""} {row.priceName} )</Box>
                </Stack>
            ),
            sortable: false,
            reorder: true
        },
        {
            sortField: "exchangeRate",
            name: <Typography variant="body1" fontWeight={600}>معادل بدون هزینه اضافه</Typography>,
            selector: row => (
                <Stack sx={{ fontSize: "14px", color: theme.palette.primary.main }} direction="row" spacing={1}>
                    <Box sx={{ fontWeight: 800 }}>
                        {row.exchangeRate} 
                    </Box> 
                   <Box>
                    ({exchangeReverse?baseCountryRate.priceName:row.priceName})
                   </Box>
                </Stack>
            ),
            sortable: false,
            reorder: true
        },
        {
            sortField: "tax",
            name: <Typography variant="body1" fontWeight={600}>هزینه اضافه</Typography>,
            selector: row => (
                <Stack spacing={1} direction="row" alignItems="center" justifyContent="center" sx={{ fontSize: "14px" }}>
                    {row.tax === 0 ? (
                        "0"
                    ) : row.tax < 0 ? (
                        <>
                            <TrendingDownIcon color="error" /> {row.tax} {exchangeReverse?baseCountryRate.priceName:row.priceName}
                        </>
                    ) : (
                        <>
                            <TrendingUpIcon color="success" /> {row.tax} {exchangeReverse?baseCountryRate.priceName:row.priceName}
                        </>
                    )}
                </Stack>
            ),
            sortable: false,
            reorder: true
        },
        {
            sortField: "exchangeRate",
            name: <Typography variant="body1" fontWeight={600}>معادل با هزینه اضافه</Typography>,
            selector: row => (
                <Stack spacing={1} direction="row" sx={{ fontSize: "14px" }}>
                    <Box sx={{ fontWeight: 800 }}>
                        {row.withTaxExchangeRate} 
                    </Box> 
                   <Box>
                    ({exchangeReverse?baseCountryRate.priceName:row.priceName})
                   </Box>
                </Stack>

            ),
            sortable: false,
            reorder: true
        },
    ]
    return (
        <Grid container spacing={2}>
            
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <CTable
                    striped={true}
                    columns={columns}
                    serverUrl={`exchangeRates/${baseCountryRate.id}/${rateAmount}/${exchangeReverse}`}
                    refreshState={refreshTableState}
                />
            </Grid>
        </Grid>
    )
}