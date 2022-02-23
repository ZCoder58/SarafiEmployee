import { Autocomplete, ListItem, ListItemText, TextField } from '@mui/material'
import React from 'react'
import authAxiosApi from '../../axios'

export default function SubCustomerAccountRatesSelect({ subCustomerId,defaultAccountRateId, onValueChange, ...props }) {
    const [subCustomersAccountRate, setSubCustomersAccountRate] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
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
                        setValue(r.find(a => a.id === defaultAccountRateId))
                    }
                })
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
            // disableClearable
            onChange={(event, newValue) => {
                setValue(newValue)
                onValueChange(newValue)
            }}
            getOptionLabel={(option) => `${option.priceName}`}
            renderInput={(params) => <TextField {...params} {...props}  />}
            renderOption={(props, option, { selected }) =>
                <ListItem {...props}>
                    <ListItemText
                    primary={`${option.amount} ${option.priceName}`}
                    />
                   
                </ListItem>}
        />

        </React.Fragment>
        
    )
}