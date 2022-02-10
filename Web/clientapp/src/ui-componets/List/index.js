import { ListItemButton, ListItemIcon } from "@mui/material";
import {  shouldForwardProp,styled } from '@mui/system'
export const CListItemIcon=styled(ListItemIcon,{shouldForwardProp})({
    minWidth:"30px"
})
export const CListItemButton=styled(ListItemButton,{shouldForwardProp})({
    padding: "3px 10px",
})