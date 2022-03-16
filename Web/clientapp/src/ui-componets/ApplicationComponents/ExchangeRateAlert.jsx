import React from 'react'
import { Grow, Alert, Stack, Box, InputAdornment } from '@mui/material'
import { CSelect,CurrencyInput } from '..'
import authAxiosApi from '../../axios'
ExchangeRateAlert.defaultProps = {
    label: "مقدار پول دریافتی",
    onTypeChange:()=>{},
    onChange:()=>{},
    defaultType:"buy"
}
export default function ExchangeRateAlert({onChange, sourceRate, distRate, amount, label,onTypeChange,defaultType }) {
    const [amountResult, setAmountResult] = React.useState(0)
    const [exchangeType,setExhcangeType]=React.useState(defaultType)
    const [exchangeRate,setExchangeRate]=React.useState(null)
    function getExchangeRate(){
        if(exchangeType==="buy"){
            return exchangeRate.toExchangeRateBuy
        }
        return exchangeRate.toExchangeRateSell
    }
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
    React.useEffect(() => {
        onTypeChange(exchangeType)
        if(exchangeRate&& exchangeRate.reverse){
            setAmountResult(exchangeRate ?getExchangeRate()===1?(Number(amount)*Number(exchangeRate.fromAmount)):
            (Number(amount)/Number(getExchangeRate()) * Number(exchangeRate.fromAmount)): 0)

        }else{
            setAmountResult(exchangeRate ?exchangeRate.fromAmount===1?(Number(amount)*Number(getExchangeRate())):
            (Number(amount)/Number(exchangeRate.fromAmount) *Number(getExchangeRate())): 0)
        }
    }, [amount, sourceRate, distRate, exchangeRate,exchangeType])
    React.useEffect(() => {
        onChange({
            ...exchangeRate,
            result:amountResult
        })
    }, [amountResult])
    return (
        <>
            {exchangeRate && !exchangeRate.updated &&
                <Grow in={!exchangeRate.updated}>
                    <Alert variant='outlined' severity="warning">
                        <Stack direction="column">
                            <Box>نرخ {exchangeRate.reverse?getExchangeRate():exchangeRate.fromAmount} {sourceRate && sourceRate.priceName} </Box>
                            <Box>معادل {exchangeRate.reverse?exchangeRate.fromAmount:getExchangeRate()} {distRate && distRate.priceName}</Box>
                            <Box>نرخ ارز آپدیت نمیباشد!</Box>
                        </Stack>
                    </Alert>
                </Grow>}
            {exchangeRate && exchangeRate.updated &&
                <Grow in={exchangeRate.updated}>
                    <Alert variant='outlined' severity="success">
                        <Stack direction="column">
                        <Box>نرخ {exchangeRate.reverse?getExchangeRate():exchangeRate.fromAmount} {sourceRate && sourceRate.priceName} </Box>
                            <Box>معادل {exchangeRate.reverse?exchangeRate.fromAmount:getExchangeRate()} {distRate && distRate.priceName}</Box>
                            <Box sx={{ fontWeight: 900 }}>نرخ ارز آپدیت است</Box>
                        </Stack>
                    </Alert>
                </Grow>}
           {(sourceRate && distRate && sourceRate.id!==distRate.id)?
           <CSelect
           data={[
               { value: "buy", label: "خرید" },
               { value: "sell", label: "فروش" }
           ]}
           name="exchangeType"
           label="نوعیت معامله"
           size="small"
           defaultValue={exchangeType}
           value={exchangeType}
           onChange={(v)=>{
               onTypeChange(v.target.value)
               setExhcangeType(v.target.value)
           }}
       />:"" }
            <CurrencyInput
                label={label}
                value={amountResult}
                InputProps={{
                    readOnly: true,
                    endAdornment:
                        <InputAdornment position="end">
                            {distRate ? distRate.priceName : "هیچ"}
                        </InputAdornment>
                }}
            />
        </>
    )
}