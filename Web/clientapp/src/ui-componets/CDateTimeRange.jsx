import React from 'react'
import { TextField, Grid } from '@mui/material'
import DatePicker from '@mui/lab/DatePicker';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

CDateTimeRange.defaultProps = {
  value: [null, null]
}
export default function CDateTimeRange({ onChange, value, startOptions, endOptions }) {
  const [dateValue, setDateValue] = React.useState(value)
  React.useEffect(() => {
    onChange(dateValue[0], dateValue[1])
  }, [dateValue])
  return (
    <>
    <Grid item lg={4} md={4} sm={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={dateValue[0]}
            label="از تاریخ"
            onChange={(e) => setDateValue([new Date(e), dateValue[1]])}
            renderInput={(startProps) => (
              <TextField {...startProps} {...startOptions} />
            )}
          />
          </LocalizationProvider>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="تا تاریخ"
            value={dateValue[1]}
            onChange={(e) => setDateValue([dateValue[0], new Date(e)])}
            renderInput={(startProps) => (
              <TextField {...startProps} {...endOptions} />
              )}
              />
              </LocalizationProvider>
        </Grid>
    </>
  )
}