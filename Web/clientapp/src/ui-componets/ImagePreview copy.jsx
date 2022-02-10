import { Box, CircularProgress } from '@mui/material';
import React, { Suspense } from 'react'
import { fromImage } from 'imtool';
import PropTypes from 'prop-types'
import imageIcon from '../assets/images/imageicon2.jpg'
ImagePreview.defaultProps = {
    isWidthTheSame: false,
    rounded:false
}
ImagePreview.propTypes = {
    isWidthTheSame: PropTypes.bool
}
export default function ImagePreview({ imagePath, isWidthTheSame, size,rounded, props }) {
    const [image, _setImage] = React.useState()
    React.useEffect(() => {
        (async () => {
            if (imagePath) {
                try {
                    const tool = await fromImage(imagePath)
                    var result = await tool.thumbnail(size, true).toDataURL()
                    _setImage(result)
                } catch { }
            }
        })()

    }, [imagePath, size])
    React.useEffect(() => {
        return () => {
            _setImage()
        }
    }, [])
    return (
        <Box display="flex" width={isWidthTheSame ? size : "100%"} {...props} justifyContent="center" sx={{
            background: "#f0f1f3",
            margin: isWidthTheSame ? "6px" : 0,
            backgroundImage: `url(${imageIcon})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: size,
            borderRadius:rounded?"50%":""
        }}>

            <Box maxWidth={size}  maxHeight={size} src={imagePath && image} component="img" />

        </Box>
    )
}
