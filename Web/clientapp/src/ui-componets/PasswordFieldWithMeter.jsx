import React from 'react'
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material'
import PasswordStrengthBar from 'react-password-strength-bar';
export default function PasswordFieldWithMeter({ helperText, ...props }) {
    const uId = Math.random()
    return (
        <FormControl error={props.error}>
            <InputLabel htmlFor={`input-${uId}`} error={props.error} required={props.required}>{props.label}</InputLabel>
            <OutlinedInput id={`input-${uId}`} {...props} aria-describedby={`input-${uId}`} />
            <PasswordStrengthBar password={props.value}
                scoreWords={['خیلی ضعیف', 'ضعیف', 'خوب', 'متوسط', 'قوی']}
                shortScoreWord="خیلی کوتاه"
                minLength={8} />
            <FormHelperText id={`input-${uId}`} error={props.error} >{helperText}</FormHelperText>
        </FormControl>

    )
}