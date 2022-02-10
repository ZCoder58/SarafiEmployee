import React from 'react'
import { CircularProgress,Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    loading: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 'calc(50% - 20px)',
        margin: 'auto',
        height: '40px',
        width: '40px',
        zIndex:2,
        '& img': {
            position: 'absolute',
            height: '25px',
            width: 'auto',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
        },
    },
}))

const Loading = (props) => {
    const classes = useStyles()

    return (
        <Box className={classes.loading} {...props}>
            {/* <img src="/assets/images/logo-circle.svg" alt="" /> */}
            <CircularProgress />
        </Box>
    )
}

export default Loading
