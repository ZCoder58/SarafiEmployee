import React from 'react'
import styled from '@emotion/styled';
import { shouldForwardProp } from '@mui/system';
const StyledFiledSet=styled("fieldset",{shouldForwardProp})({
    borderColor:"#fbfbfb",
    borderRadius:"8px",
    fontWeight:900,
    '& legend':{
        color:"#363636",
    }
})
export default function FieldSet({label,children,...props}){
    return <StyledFiledSet {...props}>
        <legend>{label}</legend>
        {children}
    </StyledFiledSet>
}