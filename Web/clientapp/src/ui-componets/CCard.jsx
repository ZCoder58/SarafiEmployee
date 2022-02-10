
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Avatar, Card, CardContent, CardHeader, Collapse, IconButton,useTheme } from '@mui/material'
import React from 'react'
import { CTooltip } from '.'

 const CCard=({title,subHeader,headerIcon,actions,children,enableActions,...props})=> {
    const [isShown,setCollapseCard]=React.useState(true)
    const theme=useTheme()
    return (
        <Card {...props} elevation={0} sx={{ 
          border:0,
         }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.primaryTransparent.main,color:theme.palette.primary.main }} variant="square">
              {headerIcon}
            </Avatar>
          }
          title={title}
          subheader={subHeader}
          action={(
           enableActions&& <>
            {actions}
           <CTooltip title={isShown?"بستن":"بازکردن"}>
           <IconButton onClick={()=>setCollapseCard(!isShown)}>{isShown?<ExpandMore/>:<ExpandLess/>}</IconButton>
           </CTooltip>
            </>
          )}
        />
        <Collapse in={isShown} timeout="auto">
        <CardContent>
            {children}
        </CardContent>
        </Collapse>
      </Card>
    )
}
CCard.defaultProps={
  enableActions:false
}
export default CCard
