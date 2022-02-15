import React from 'react';
import { Card, Box, CardContent, styled, Stack, Typography, useTheme, CardActions } from '@mui/material'
import { shouldForwardProp } from '@mui/system'
const StyledCard = styled(Card, { shouldForwardProp })(({ theme }) => ({
    height:"310px",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    border: `1px solid ${theme.palette.primaryTransparent.main}`,
    transition: ".2s all ease-in",
    '&:hover': {
        border: `1px solid ${theme.palette.primary.main}`,
        transition: "0.2s all ease-in",
    }

}))
export default function ShopItem({amount,extraCharge,price}) {
    const [usImage,setUcImage]=React.useState();
    // React.useEffect(()=>{
    //     if(amount<=100){
    //         setUcImage(s=>s=uc32)
    //     }
    //     else if(amount<=300){
    //         setUcImage(s=>s=uc300)
    //     }
    //     else if(amount<=600){
    //         setUcImage(s=>s=uc600)
    //     }
    //     else if(amount<=1500){
    //         setUcImage(s=>s=uc1500)
    //     }
    //     else if(amount>1500){
    //         setUcImage(s=>s=uc3000)
    //     }
    // },[amount])
    const theme=useTheme()
    return (
        <StyledCard width="100%">
            <CardContent>
                <Stack direction="column" spacing={3} py={2} justifyContent="center" alignItems="center">
                    <Box display="flex" flexDirection="row-reverse">
                        {/* <Box component="img" src={ucXs} pl={1}></Box> */}
                        <Typography variant="h5" color="primary" display="flex" alignItems="center">{amount}</Typography>
                       {extraCharge&&(<Typography variant="h6" color="warning">{extraCharge}+</Typography>)}
                    </Box>
                    <Box component="img"src={usImage}/>
                </Stack>
            </CardContent>
            <CardActions>
            <Box sx={{ 
                        backgroundColor:theme.palette.primaryTransparent.main,
                        p:1,
                        color:"white",
                        width:"100%",
                        textAlign:"center"
                     }}>
                        {price} افغانی
                    </Box>
            </CardActions>
        </StyledCard>
    )
}