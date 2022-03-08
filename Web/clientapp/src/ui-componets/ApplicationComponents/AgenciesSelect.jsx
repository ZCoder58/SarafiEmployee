import { Autocomplete, ListItem, ListItemText, TextField } from '@mui/material'
import React from 'react'
import authAxiosApi from '../../axios'
AgenciesSelect.defaultProps={
    onValueChange:()=>{}
}
export default function AgenciesSelect({ defaultId, onValueChange, ...props }) {
    const [agencies, setAgencies] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('company/agencies/select').then(r => {
                setAgencies(r)
                if (defaultId) {
                    const defaultValue=r.find(a => a.id === defaultId)
                    setValue(defaultValue)
                    onValueChange(defaultValue)
                }
            })
            setLoading(false)
        })()
        return () => {
            setAgencies([])
        }
    }, [defaultId])

    return (
        <React.Fragment>
        <Autocomplete
            noOptionsText="انتخابی نیست"
            options={agencies}
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