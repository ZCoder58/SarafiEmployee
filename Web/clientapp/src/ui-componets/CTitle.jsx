import { Typography } from "@mui/material";

export default function CTitle({children}){
    return <Typography fontWeight={900} sx={{ my:2 }}>{children}</Typography>
}