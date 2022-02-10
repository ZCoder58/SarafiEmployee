import React from 'react';
import { fromImage } from 'imtool';
import { Avatar } from '@mui/material';
export default function CAvatar({ src, size,variant,props }) {
    const [imgSrc, setImgSrc] = React.useState("")
    React.useEffect(() => {
        (async () => {
            try {
                const tool = await fromImage(src);
                var result= await tool.thumbnail(size,true).toDataURL();
                setImgSrc(result)
            }catch{
                setImgSrc("")
            } 
        })()
        
    }, [size, src])
    React.useEffect(()=>{
        return()=>(
            setImgSrc(null)
        )
    },[])
    return (
        <Avatar src={imgSrc} {...props} variant={variant}/>
    )
}