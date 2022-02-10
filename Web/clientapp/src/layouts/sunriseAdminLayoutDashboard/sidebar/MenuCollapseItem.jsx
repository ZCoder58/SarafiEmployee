import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Collapse, List,  ListItemText } from '@mui/material'
import {  CircleSharp, ExpandLess ,ExpandMore} from '@mui/icons-material'
import MenuSigleItem from './MenuSigleItem'
import { CSideBarMenuItem, CSideBarMenuItemButton, CSideBarMenuItemDivider, CSideBarMenuItemIconContainer } from '../../../ui-componets/SidebarMenu'

function MenuCollapseItem({ item, level }) {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false)
   
    const isLevelOne = (level === 1)
    function toggleCollapse() {
        setIsCollapseOpen(!isCollapseOpen)
   
    }

    const items = item.children.map(childItem => {
        switch (childItem.type) {
            case "item":
                return <MenuSigleItem key={childItem.title} item={childItem} level={level + 1} />
            case "collapse":
                return <MenuCollapseItem key={childItem.title} item={childItem} level={level + 1} />
            default:
                return <span color="red">menu type error</span>
        }
    })
    const Icon = item.icon
    const ItemIcon = (isLevelOne ? (item.icon ? <Icon /> : <CircleSharp />) : <CircleSharp />)
    return (
        <>
            <CSideBarMenuItem>
                <CSideBarMenuItemButton onClick={() => toggleCollapse()} sx={{
                    pr: `${(!isLevelOne) && (level - 1) * 3}px`,
                }}>
                    <CSideBarMenuItemIconContainer className={`${(!isLevelOne) && "simple-icon"}`}>
                        {ItemIcon}
                    </CSideBarMenuItemIconContainer>
                    <ListItemText>
                        {item.title}
                    </ListItemText>
                    {isCollapseOpen ? <ExpandMore /> : <ExpandLess />}
                </CSideBarMenuItemButton>
                <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
                    <List>
                        {items}
                    </List>
                </Collapse>
            </CSideBarMenuItem>
            {/* {isLevelOne &&
                <li>
                    <CSideBarMenuItemDivider />
                </li>
            } */}
        </>
    )
}
MenuCollapseItem.propTypes = {
    item: PropTypes.object.isRequired,
    level: PropTypes.number
}
export default MenuCollapseItem
