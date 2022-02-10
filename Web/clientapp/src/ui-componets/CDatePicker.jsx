import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/lab"
import {TextField} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment'
import React from 'react'
export default function CDatePicker({onChange,label,value,...props}){
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
            views={['year', 'month', 'day']}
            onChange={(e) => {
               onChange(moment(e).format('YYYY-MM-DD'))
            }}
            label={label}
            value={value}
            // inputFormat="yyyy-MM-dd"
            renderInput={(params) => <TextField {...params} {...props}
            />}
        />
    </LocalizationProvider>
    )
}