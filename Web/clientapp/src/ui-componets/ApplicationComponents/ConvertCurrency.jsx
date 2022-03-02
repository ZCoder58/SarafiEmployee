import { Box, Grid, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import authAxiosApi from '../../axios'
import { ExchangeRateAlert, RatesDropdown } from '..'
export default function ConvertCurrecy() {
    const [sourceRate, setSourceRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
    const [exchangeRate, setExchangeRate] = React.useState(null)
    const [amount, setAmount] = React.useState(0)
    React.useEffect(() => {
        (async () => {
            if (sourceRate && distRate) {
                await authAxiosApi.get('customer/rates/exchangeRate', {
                    params: {
                        from: sourceRate.id,
                        to: distRate.id
                    }
                }).then(r => {
                    setExchangeRate(r)
                })
            }
        })()
        return () => setExchangeRate(null)
    }, [sourceRate, distRate])
    return (
        <Grid container spacing={2}>
            <Grid item  lg={6} md={6} sm={6} xs={12}>

                <RatesDropdown
                    label="ارز"
                    size="small"
                    onValueChange={v => setSourceRate(v)}
                />
            </Grid>
            <Grid item  lg={6} md={6} sm={6} xs={12}>

                <RatesDropdown
                    label="ارز معادل"
                    size="small"
                    onValueChange={v => setDistRate(v)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={(e) => setAmount(e.target.value)}
                    label="مقدار پول"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {sourceRate ? sourceRate.priceName : "هیچ"}
                        </InputAdornment>
                    }}
                />

            </Grid>
            <Grid item xs={12}>
            <ExchangeRateAlert
                exchangeRate={exchangeRate}
                sourceRate={sourceRate}
                distRate={distRate}
                amount={amount}
                label="نتیجه تبدیل ارز"
            />
            </Grid>
        </Grid>
    )
}