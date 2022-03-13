import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function LinkButton({link,text}){
    const navigate=useNavigate()
    return (
        <Button variant="contained" onClick={()=>navigate(link)}>{text}</Button>
    )
}