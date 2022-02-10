import React from 'react'
import {TextField ,Box} from '@mui/material'
import DateRangePicker from '@mui/lab/DateRangePicker';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

CDateTimeRange.defaultProps={
  value:[null,null]
}
export default function CDateTimeRange({onChange,value,startOptions,endOptions}){
    
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
        
        startText="از تاریخ"
        endText="تا تاریخ"
        value={value}
        // mask="____/__/__"
        onChange={(newValue) => {
          const startDate=newValue[0]&&new Date(newValue[0]).toLocaleDateString()
          const endDate=newValue[1]&&new Date(newValue[1]).toLocaleDateString()
          onChange(startDate,endDate)
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} {...endOptions}/>
            <Box sx={{ mx: 2 }}> تا </Box>
            <TextField {...endProps} {...startOptions}/>
          </React.Fragment>
        )}
      />

      </LocalizationProvider>
    )
}