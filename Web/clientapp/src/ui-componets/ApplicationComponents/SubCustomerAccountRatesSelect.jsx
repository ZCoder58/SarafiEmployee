import { Autocomplete, ListItem, ListItemText, TextField,Typography,Alert,AlertTitle } from '@mui/material'
import React from 'react'
import { CurrencyText } from '..'
import authAxiosApi from '../../axios'


export default function SubCustomerAccountRatesSelect({subCustomerId,defaultAccountRateId, onValueChange, ...props }) {
    const [subCustomersAccountRate, setSubCustomersAccountRate] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    function handleValueChange(newValue){
        setValue(newValue)
        onValueChange(newValue)
    }
    
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            if(subCustomerId){
                await authAxiosApi.get('subCustomers/accounts/list',{
                    params:{
                        id:subCustomerId
                    }
                }).then(r => {
                    setSubCustomersAccountRate(r)
                    if (defaultAccountRateId) {
                        const defaultValue=r.find(a => a.id === defaultAccountRateId)
                        setValue(defaultValue)
                        onValueChange(defaultValue)
                    }
                })
            }else{
                if(value){
                    handleValueChange(null)
                }
            }
           
            setLoading(false)
        })()
        return () => {
            setSubCustomersAccountRate([])
        }
    }, [defaultAccountRateId,subCustomerId])

    return (
        <React.Fragment>
        <Autocomplete
            noOptionsText="انتخابی نیست"
            options={subCustomersAccountRate}
            loading={loading}
            loadingText="در حال بارگیری..."
            value={value}
            disablePortal
            // disableClearable
            onChange={(event, newValue) => {
                handleValueChange(newValue)
            }}
            getOptionLabel={(option) => `حساب ${option.priceName}`}
            renderInput={(params) => <TextField {...params} {...props}  />}
            renderOption={(props, option, { selected }) =>
                <ListItem {...props}>
                    <ListItemText
                    primary={`${option.amount} ${option.priceName}`}
                    />
                   
                </ListItem>}
        />

       {value&&value.amount<1?
        <>
        <Typography variant="caption" color="error" >{value&&`موجودی حساب : `} <CurrencyText value={value&&value.amount} priceName={value&&value.priceName}/></Typography>
        <Alert severity='warning'>
            <AlertTitle>هشدار!</AlertTitle>
            <Typography>موجودی حساب مشتری صفر است هرگونه برداشت ازین حساب مشتری را قرض دار خواهد کرد</Typography>
        </Alert>
        </>:
        <Typography variant="caption" >{value&&`موجودی حساب : `} <CurrencyText value={value&&value.amount} priceName={value&&value.priceName}/></Typography>
        }
        </React.Fragment>
        
    )
}