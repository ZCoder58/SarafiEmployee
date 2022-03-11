import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';
CurrencyInput.defaultProps={
    onChange:()=>{}
}
export default function CurrencyInput({ onChange, ...inputProps }) {
    return (
        <NumberFormat
            thousandSeparator
            decimalScale={2}
            onValueChange={(v,e) => onChange(v.value)}
            {...inputProps}
            customInput={TextField}
        />
    )
}