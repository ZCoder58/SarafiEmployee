import { Autocomplete, ListItem, ListItemText, TextField } from '@mui/material'
import React from 'react'
import {axiosApi} from '../../axios'
CountriesDropdown.defaultProps={
    onValueChange:()=>{}
}
export default function CountriesDropdown({ defaultId, onValueChange, ...props }) {
    const [countries, setCountries] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await axiosApi.get('general/GetCountries').then(r => {
                setCountries(r)
                if (defaultId) {
                    const defaultValue=r.find(a => a.id === defaultId)
                    setValue(defaultValue)
                    onValueChange(defaultValue)
                }
            })
            setLoading(false)
        })()
        return () => {
            setCountries([])
        }
    }, [defaultId])

    return (
        <React.Fragment>
        <Autocomplete
            noOptionsText="انتخابی نیست"
            options={countries}
            loading={loading}
            loadingText="در حال بارگیری..."
            value={value}
            disableClearable
            onChange={(event, newValue) => {
                setValue(newValue)
                onValueChange(newValue)
            }}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => <TextField {...params} {...props}  />}
            renderOption={(props, option, { selected }) =>
                <ListItem {...props}>
                    <ListItemText
                    primary={`${option.name}`}
                    />
                </ListItem>}
        />

        </React.Fragment>
        
    )
}