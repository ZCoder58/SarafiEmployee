import {Box, styled } from "@mui/material"
import { shouldForwardProp } from "@mui/system"
const StyledBox=styled(Box,{shouldForwardProp})({
    width: "80px",
    height: "80px",
    display: "flex",
    textAlign: "center",
    lineHeight: "108px",
    borderRadius: "50%",
    boxShadow: "0px 0px 20px rgb(0 0 0 / 10%)",
    webkittransition: "all .5s",
    alignItems:"center",
    alignContent:"center",
    justifyContent:"center",
    transition: "all .5s",
    '& img':{
        maxWidth:"40px"
    }
})
export default function ImageIcon({children}){
    return (
        <StyledBox>
            {children}
        </StyledBox>
    )
}