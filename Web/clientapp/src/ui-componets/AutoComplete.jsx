import { TextField, Autocomplete } from '@mui/material'
import React from 'react'
import { PropTypes } from 'prop-types'
AutoComplete.defaultProps = {
    data: [],
    disableClearable:false
}
AutoComplete.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.array.isRequired,
    defaultValue:PropTypes.object,
    onChange:PropTypes.func,
    getOptionLabel:PropTypes.func.isRequired,
    renderOption:PropTypes.func.isRequired,
    disableClearable:PropTypes.bool
}

export default function AutoComplete({ data, defaultValue, loading, onChange, getOptionLabel, renderOption,disableClearable, ...props }) {
    const [value, setValue] = React.useState(null)
    React.useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue)
        }
    }, [defaultValue])
    return (
        <Autocomplete
            noOptionsText="انتخابی نیست"
            options={data}
            loading={loading}
            loadingText="در حال بارگیری..."
            value={value}
            disableClearable={disableClearable}
            onChange={(event, newValue) => {
                setValue(newValue)
                onChange(newValue)
            }}
            getOptionLabel={(option) => getOptionLabel(option)}
            renderOption={(props, option, { selected }) =>
                <li {...props}>
                    {renderOption(option, selected)}
                </li>}
            renderInput={(params) => <TextField {...params} {...props} />}
        />
    )
}