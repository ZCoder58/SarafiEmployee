import React from 'react'
import { Grow, Alert, Stack, Box, TextField, InputAdornment } from '@mui/material'
ExchangeRateAlert.defaultProps={
    label:"مقدار پول دریافتی"
}
export default function ExchangeRateAlert({ exchangeRate, sourceRate, distRate,amount,label }) {
    const [amountResult,setAmountResult]=React.useState(0)
        React.useEffect(()=>{
            setAmountResult(exchangeRate ? (Number(exchangeRate.toExchangeRate) / Number(exchangeRate.fromAmount) * Number(amount)).toFixed(2) : 0)
        },[amount,sourceRate,distRate,exchangeRate])
    return (
        <>
            {exchangeRate && !exchangeRate.updated &&
                <Grow in={!exchangeRate.updated}>
                    <Alert variant='outlined' severity="warning">
                        <Stack direction="column">
                            <Box>نرخ {exchangeRate.fromAmount} {sourceRate && sourceRate.priceName} </Box>
                            <Box>معادل {exchangeRate.toExchangeRate} {distRate && distRate.priceName}</Box>
                            <Box>نرخ ارز آپدیت نمیباشد!</Box>
                        </Stack>
                    </Alert>
                </Grow>}
            {exchangeRate && exchangeRate.updated &&
                <Grow in={exchangeRate.updated}>
                    <Alert variant='outlined' severity="success">
                        <Stack direction="column">
                            <Box>نرخ {exchangeRate.fromAmount} {sourceRate && sourceRate.priceName} </Box>
                            <Box>معادل {exchangeRate.toExchangeRate} {distRate && distRate.priceName}</Box>
                            <Box sx={{ fontWeight: 900 }}>نرخ ارز آپدیت است</Box>
                        </Stack>
                    </Alert>
                </Grow>}
                <TextField
                label={label}
                required
                size="small"
                value={amountResult}
                InputProps={{
                    readOnly: true,
                    endAdornment: 
                    <InputAdornment position="end">
                        { distRate? distRate.priceName : "هیچ"}
                    </InputAdornment>                    
                }}
            />
        </>
    )
}