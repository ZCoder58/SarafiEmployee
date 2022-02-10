import { Tooltip } from "@mui/material";
import  Zoom  from "@mui/material/Zoom";

export default function CTooltip({title,children}){
    return (
      
        <Tooltip TransitionComponent={Zoom} title={title}>
            {children}
            </Tooltip>
         
    )
}