import { Divider, ListItem , ListItemIcon, ListItemButton} from '@mui/material'
import {  shouldForwardProp,styled } from '@mui/system'

export const CSideBarMenuItem=styled(ListItem,{shouldForwardProp})({
        padding: " 7px 10px",
        display: "block"  ,
        '&>a':{
            color: "black",
            textDecoration:"none"
        }
})
export const CSideBarMenuItemButton=styled(ListItemButton,{shouldForwardProp})(({theme})=>({
    padding:"3px",
    borderRadius:"7px",
    
    '&.muirtl-xjaxcw-MuiButtonBase-root-MuiListItemButton-root':{
        textAlign: "right",
    },
    '&:hover':{
        backgroundColor:theme.palette.primaryTransparent.main,
    },
    '& .MuiListItemText-root': {
        fontSize: "0.90625rem",
        paddingLeft:"3px"
    },
    '& .MuiTypography-root': {
        fontSize: "0.90625rem"
    }
}))
export const CSideBarMenuItemDivider=styled(Divider,{shouldForwardProp})({
    margin:"6px 0"
})
export const CSideBarMenuItemIconContainer=styled(ListItemIcon,{shouldForwardProp})({
    display: "flex",
    alignItems: "center",
    height: "100%",
    minWidth: "16px", 
    padding:"4px",
    marginRight:"4px",
    borderRadius: "5px",
    '& .MuiSvgIcon-root':{
        fontSize:23
    },
    '&.simple-icon':{
        padding:"0px",
        '.MuiSvgIcon-root':{
            fontSize:"10px"
            },
        
    }
})


