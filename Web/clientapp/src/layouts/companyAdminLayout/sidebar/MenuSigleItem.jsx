import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { ListItemText, useMediaQuery, useTheme } from '@mui/material'
import { CircleSharp } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { CSideBarMenuItem, CSideBarMenuItemButton, CSideBarMenuItemIconContainer } from '../../../ui-componets/SidebarMenu'
import { A_CloseSideMenu } from '../../../redux/actions/LayoutActions'
function MenuSigleItem({ item, level }) {
    const dispatch = useDispatch()
    const theme=useTheme()
    const screenMachedMd=useMediaQuery(theme.breakpoints.down("md"))
    const isLevelOne = level === 1
    const Icon = item.icon
    const ItemIcon = (isLevelOne ? (item.icon ? <Icon /> : <CircleSharp />) : <CircleSharp />)

    function setMenuClose() {
        if(screenMachedMd){
            dispatch(A_CloseSideMenu())
        }
    }
    return (
        <>
            <CSideBarMenuItem>
                <Link to={item.url} onClick={()=>setMenuClose()}>
                    <CSideBarMenuItemButton sx={{
                        pr: `${(!isLevelOne) && (level - 1) * 3}px`,
                    }}>
                        <CSideBarMenuItemIconContainer className={`${(!isLevelOne) && "simple-icon"}`}>
                            {ItemIcon}
                        </CSideBarMenuItemIconContainer>
                        <ListItemText>
                            {item.title}
                        </ListItemText>
                    </CSideBarMenuItemButton>
                </Link>
            </CSideBarMenuItem>
            {/* {isLevelOne &&
                <li>
                    <CSideBarMenuItemDivider />
                </li>
            } */}
        </>
    )
}
MenuSigleItem.propTypes = {
    item: PropTypes.object.isRequired,
    level: PropTypes.number
}
export default MenuSigleItem
