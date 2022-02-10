import { MenuSharp } from "@mui/icons-material"
import { Button, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { A_CloseSideMenu, A_OpenSideMenu } from "../../redux/actions/LayoutActions.jsx"
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
export default function AdminMenutoggle() {
    const { menuOpen } = useSelector(state => state.R_AdminLayout)
    const theme=useTheme()
    const dispatch = useDispatch()
    const isMachedDownMd = useMediaQuery(theme.breakpoints.down("md"))
    React.useEffect(()=>{
        if(isMachedDownMd && menuOpen){
            dispatch(A_CloseSideMenu())
        }else if(!isMachedDownMd && !menuOpen){
            dispatch(A_OpenSideMenu())
        }
    },[isMachedDownMd])
    function toggleSidebar() {
        menuOpen ? dispatch(A_CloseSideMenu()) : dispatch(A_OpenSideMenu())
    }
    return (
        <IconButton size="small" onClick={() => toggleSidebar()}>
           {menuOpen?<CloseIcon />:<MenuSharp />} 
        </IconButton>
    )
}