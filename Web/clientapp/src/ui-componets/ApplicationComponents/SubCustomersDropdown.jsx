import { Autocomplete, ListItem, ListItemText, TextField } from '@mui/material'
import React from 'react'
import authAxiosApi from '../../axios'
SubCustomersDropdown.defaultProps={
    onValueChange:()=>{},
    defaultSubCustomerId:undefined
}
export default function SubCustomersDropdown({ defaultSubCustomerId, onValueChange, ...props }) {
    const [subCustomers, setSubCustomers] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('subCustomers/list').then(r => {
                if (defaultSubCustomerId) {
                    const defaultValue=r.find(a => a.id === defaultSubCustomerId)
                    setValue(defaultValue)
                    if(props.disabled){
                        setSubCustomers([defaultValue,...subCustomers])
                    }else{
                        setSubCustomers(r)
                    }
                }else{
                    setSubCustomers(r)
                }
            })
            setLoading(false)
        })()
        return () => {
            setSubCustomers([])
        }
    }, [defaultSubCustomerId])

    return (
        <React.Fragment>
        <Autocomplete
            noOptionsText="انتخابی نیست"
            options={subCustomers}
            loading={loading}
            loadingText="در حال بارگیری..."
            value={value}
            disableClearable
            onChange={(event, newValue) => {
                setValue(newValue)
                onValueChange(newValue)
            }}
            getOptionLabel={(option) => `${option.name} ${option.lastName}`}
            renderInput={(params) => <TextField {...params} {...props}  />}
            renderOption={(props, option, { selected }) =>
                <ListItem {...props}>
                    <ListItemText
                    primary={`${option.name} ${option.lastName}`}
                    secondary={`نام پدر : ${option.fatherName}`}
                    />
                   
                </ListItem>}
        />

        </React.Fragment>
        
    )
}