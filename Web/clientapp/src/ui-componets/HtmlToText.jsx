import {Skeleton} from '@mui/material'
import React from 'react'
import DOMPurify from "dompurify";
import parse from "html-react-parser";

// const HtmlToReactParser = require('html-to-react').Parser;
// const htmlToReactParser = new HtmlToReactParser();
export default function HtmlToText({ htmlText }) {
    const [text,setText]=React.useState("")
    const [loading,setLoading]=React.useState(true)
  
    React.useEffect(()=>{
        (async()=>{
            setLoading(true)
            await setText( DOMPurify.sanitize(htmlText, {
                USE_PROFILES: { html: true },
              }))

            setLoading(false)
        })()
    },[htmlText])
    return (
        <>
            {loading?<Skeleton width="100%" height={100}/>:parse(text)}
        </>
    )
}