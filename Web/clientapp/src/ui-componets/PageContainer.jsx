import {Box} from '@mui/material'
import React from 'react'

/**
 * box for full page container
 * @param {*} param0 
 * @returns Box with pt={12}
 */
export default function PageContainer({children}){
    return (
        <Box pt={12}>
            {children}
        </Box>
    )
}