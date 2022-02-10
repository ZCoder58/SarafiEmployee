import React from 'react'
import { List, Typography, useTheme } from '@mui/material'
import { PropTypes } from 'prop-types'
import MenuSigleItem from './MenuSigleItem'
import MenuCollapseItem from './MenuCollapseItem'
export const MenuListGroup = ({ groupItem }) => {
 
    const theme = useTheme()
    const items = groupItem.children.map(item => {
        switch (item.type) {
            case "item":
                return <MenuSigleItem key={item.title} item={item} level={1} />
            case "collapse":
                return <MenuCollapseItem key={item.title} item={item} level={1} />
            default:
                return <span color="red">menu type error</span>
        }
    })
    return (
        <List 
        subheader={<Typography variant="caption" sx={{
                ...theme.typography.menuCaption,
                pl: "12px",
                height: '35px',
                pt: '3px',
                fontWeight: 600,
                fontSize: ' 18px',
            }} display="block" gutterBottom>
                {groupItem.title}
            </Typography>
        }>
            
            {items} 
         </List> 
           
    )
}
MenuListGroup.propTypes = {
    groupItem: PropTypes.object.isRequired
}

