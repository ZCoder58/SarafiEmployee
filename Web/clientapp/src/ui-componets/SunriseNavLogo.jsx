import {Box} from '@mui/material'
import logoSm from '../assets/images/logoSm.png'
export default function SunriseNavLogo({...prop}){
    return (
    <Box component="img" src={logoSm} {...prop}></Box>
    )
}