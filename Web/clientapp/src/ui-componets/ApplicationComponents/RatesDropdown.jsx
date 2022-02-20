import { Autocomplete, ListItem, ListItemText, TextField,Stack,Typography } from '@mui/material'
import React from 'react'
import authAxiosApi from '../../axios'
export default function CountriesDropdown({defaultId, onValueChange, ...props }) {
    const [rates, setRates] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('general/rates').then(r => {
                setRates(r)
                if (defaultId) {
                   const newValue=r.find(a => a.id === defaultId)
                    setValue(newValue)
                    onValueChange(newValue)
                }
            })
            setLoading(false)
        })()
        return () => {
            setRates([])
        }
    }, [defaultId])

    return (
        <React.Fragment>
        <Autocomplete
            noOptionsText="انتخابی نیست"
            options={rates}
            loading={loading}
            loadingText="در حال بارگیری..."
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
                onValueChange(newValue)
            }}
            getOptionLabel={(option) => `${option.faName} (${option.priceName})`}
            renderInput={(params) => <TextField {...params} {...props}  />}
            renderOption={(props, option, { selected }) =>
                <ListItem {...props}>
                    <ListItemText
                    primary={
                    <Stack direction="row" >
                        <Typography>{option.faName}</Typography>
                        <Typography>({option.priceName})</Typography>
                    </Stack>
                    }
                    />
                </ListItem>}
        />

        </React.Fragment>
        
    )
}