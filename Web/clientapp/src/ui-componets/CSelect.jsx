import {Select,FormControl,InputLabel,MenuItem} from '@mui/material'

import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
const useStyle=makeStyles({
    root:{
        marginTop:"16px",
    marginBottom:"8px"
    }
})
CSelect.defaultProps={
    data:[]
}
CSelect.propTypes={
    data:PropTypes.array.isRequired
}
/**
 * 
 * @param {data=[{value,label}]} param0 
 * @returns 
 */
export default function CSelect({data=[],...props}){
    const id=Math.random()
    const classess=useStyle()
    return (
        <FormControl fullWidth className={classess.root}>
            <InputLabel id={"select-"+id.toString()}>{props.label}</InputLabel>
            <Select
            {...props}
            labelId={"select-"+id.toString()}
            >
                {data.map((e,i)=>(
                    <MenuItem key={i} value={e.value}>{e.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}