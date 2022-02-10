import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import authAxiosApi from '../axios'

export default function CountrySelect({defaultValueId,onValueChange,...props}){
    const [countries,setCountries]=React.useState([])
    const [value,setValue]=React.useState(null)
    const [loading,setLoading]=React.useState(true)
    React.useEffect(()=>{
        (async()=>{
            await authAxiosApi.get('countries').then(r=>{
                setCountries(s=>s=r)
                
                if(defaultValueId){
                    setValue(r.find(a=>a.id===defaultValueId))
                }
                setLoading(false)
            })
        })()
        return ()=>{
            setCountries(s=>s=[])
        }
    },[])
  
    return (
     <Autocomplete
        noOptionsText="انتخابی نیست"
        options={countries}
        loading={loading}
        loadingText="در حال بارگیری..."
        value={value}
        disableClearable
        onChange={(event, newValue) => {
            setValue(newValue)
            onValueChange(newValue)
        }}
        getOptionLabel={(option) => `${option.name}`}
        renderInput={(params) => <TextField {...params} {...props} />}
    />
    )
}