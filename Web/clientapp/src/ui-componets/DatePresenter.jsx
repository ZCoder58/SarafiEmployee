import { Stack, Typography } from '@mui/material'
import localDate from '../helpers/statics/LocalDateStatic'
export default function DatePresenter(){  
  const date=new Date()
  
    return (
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        
        <Typography variant="body1" fontWeight={900}>{localDate.getDayName(date)}</Typography>
        <Typography variant="body2">{localDate.getDate(date)} {localDate.getMonthName(date)}</Typography>
        <Typography variant="body1" fontWeight={900}>{localDate.getYear(date)}</Typography>
      </Stack>
    )
}
