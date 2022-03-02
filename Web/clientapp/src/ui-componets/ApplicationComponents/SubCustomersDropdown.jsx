import { Autocomplete, ListItem, ListItemText, TextField } from '@mui/material'
import React from 'react'
import authAxiosApi from '../../axios'
SubCustomersDropdown.defaultProps={
    onValueChange:()=>{},
    defaultSubCustomerId:undefined,
}
export default function SubCustomersDropdown({ exceptCustomerId,defaultSubCustomerId, onValueChange, ...props }) {
    const [subCustomers, setSubCustomers] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('subCustomers/list').then(r => {
                const data=exceptCustomerId?r.filter(c=>c.id!==exceptCustomerId):r
                if (defaultSubCustomerId) {
                    const defaultValue=data.find(a => a.id === defaultSubCustomerId)
                    setValue(defaultValue)
                    if(props.disabled){
                        setSubCustomers([defaultValue,...subCustomers])
                    }else{
                        setSubCustomers(data)
                    }
                }else{
                    setSubCustomers(data)
                }
            })
            setLoading(false)
        })()
        return () => {
            setSubCustomers([])
        }
    }, [defaultSubCustomerId,exceptCustomerId,props.disabled])

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