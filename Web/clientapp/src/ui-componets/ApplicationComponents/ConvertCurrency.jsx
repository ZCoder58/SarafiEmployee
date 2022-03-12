import { Grid, InputAdornment } from '@mui/material'
import React from 'react'
import { CurrencyInput, ExchangeRateAlert, RatesDropdown } from '..'

export default function ConvertCurrecy() {
    const [sourceRate, setSourceRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
    const [amount, setAmount] = React.useState(0)
    return (
        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>

                <RatesDropdown
                    label="ارز"
                    size="small"
                    onValueChange={v => setSourceRate(v)}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>

                <RatesDropdown
                    label="ارز معادل"
                    size="small"
                    onValueChange={v => setDistRate(v)}
                />
            </Grid>
            <Grid item xs={12}>
                <CurrencyInput
                    onChange={(v) =>setAmount(v)}
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
                    sourceRate={sourceRate}
                    distRate={distRate}
                    amount={amount}
                    label="نتیجه تبدیل ارز"
                />
            </Grid>
        </Grid>
    )
}