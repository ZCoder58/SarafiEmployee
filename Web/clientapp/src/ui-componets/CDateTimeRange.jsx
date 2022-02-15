import React from 'react'
import { TextField, Box } from '@mui/material'
import DatePicker from '@mui/lab/DatePicker';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

CDateTimeRange.defaultProps = {
  value: [null, null]
}
export default function CDateTimeRange({ onChange, value, startOptions,endOptions }) {
  const [dateValue, setDateValue] = React.useState(value)
  React.useEffect(()=>{
    console.log("value :",value)
    console.log("date :",dateValue)
    onChange(dateValue[0],dateValue[1])
  },[dateValue])
  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={dateValue[0]}
        label="از تاریخ"
        onChange={(e)=>setDateValue([new Date(e),dateValue[1]])}
        renderInput={(startProps) => (
          
            <TextField {...startProps} {...startOptions}/>
          
        )}
      />
      <DatePicker
      label="تا تاریخ"
          value={dateValue[1]}
          onChange={(e)=>setDateValue([dateValue[0],new Date(e)])}
          renderInput={(startProps) => (
            <TextField {...startProps} {...endOptions} />
          )}
        />
    </LocalizationProvider>
 
  )
}