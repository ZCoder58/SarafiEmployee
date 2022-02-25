import React from 'react'
import { Badge, IconButton, Tooltip } from '@mui/material'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Friends() {
    const navigate=useNavigate()
    const {friendsRequestsCount}=useSelector(states=>states.R_Customer)
    return (
        <Tooltip title="درخواست ها">
            <IconButton size="small" onClick={()=>navigate('/company/friends/2')}>
                <Badge badgeContent={friendsRequestsCount} max={99} color="primary" anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}>
                    <GroupOutlinedIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    )
}