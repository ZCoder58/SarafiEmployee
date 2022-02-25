import React from 'react'
import menuItems from '../../../menuItems/companyUser'
import {MenuListGroup} from './MenuListGroup'
function MenuList() {
    return (
        <>
            {menuItems.items.map((group)=>
                <MenuListGroup key={group.title} groupItem={group}/>
            )}
        </>
    )
}

export default MenuList
