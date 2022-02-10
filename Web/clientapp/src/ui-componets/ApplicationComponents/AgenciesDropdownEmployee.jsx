import { Autocomplete, Stack, TextField, Typography } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete';
import React from 'react'
import authAxiosApi from '../../axios'
const filterOptions = createFilterOptions({
    stringify: (option) => `${option.cityName}${option.detailedAddress}`,

  });
/**
 * only for employee use
 * @param {} param0 
 * @returns 
 */
export default function AgenciesDropdownEmployee({ defaultValueId, onValueChange, ...props }) {
    const [agencies, setAgencies] = React.useState([])
    const [value, setValue] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            await authAxiosApi.get('agencies/agenciesList').then(r => {
                setAgencies(r)
                if (defaultValueId) {
                    setValue(r.find(a => a.id === defaultValueId))
                }
                setLoading(false)
            })
        })()
        return () => {
            setAgencies(s => s = [])
        }
    }, [])

    return (
        <Autocomplete
        filterOptions={filterOptions}
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
            getOptionLabel={(option) => `${option.countryName} (${option.cityName})`}
            renderInput={(params) => <TextField {...params} {...props} />}
            renderOption={(props, option, { selected }) =>
                <li {...props}>
                    <Stack direction="column" spacing={1} width="100%" key={option.id}>
                        <Typography variant="body1">{option.countryName} ({option.cityName})</Typography>
                        <Typography variant="subtitle2">{option.detailedAddress}</Typography>
                    </Stack>
                </li>}
        />
    )
}