import React from "react";
import {
    Avatar,
    Card,
    Box,
    Button,
    CardHeader,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from "@mui/system";
import { PropTypes } from "prop-types";
import { fromImage } from 'imtool';
import ImagePreview from './ImagePreview'
const StyledCardHeader = styled(CardHeader)({
    '&': {
        textAlign: "center",
        padding: "5px",
        border: 0,
    },
    '&>.MuiCardHeader-content>.MuiTypography-root': {
        fontSize: 15,
        color: "#7c7c7c",
        fontWeight: "normal"
    }
})
export default function ImageUpload({ label, name, onChangeHandle,error, defaultImagePath,helperText, ...props }) {
    const [image, _setImage] = React.useState(null);
    const inputFileRef = React.createRef(null);

    const cleanup = () => {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
    };

    const setImage = newImage => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
    };

    const handleOnChange = event => {
        const newImage = event.target?.files?.[0];
        if (newImage) {
            onChangeHandle(newImage)
            setImage(URL.createObjectURL(newImage));
        }
    };

    React.useEffect(() => {
        (async () => {
            if (defaultImagePath) {
                try{
                    const tool = await fromImage(defaultImagePath)
                    var result = await tool.toBlobURL()
                    _setImage(result)
                }catch{}
            }
        })()
    }, [defaultImagePath])

    return (
        <Box>
        <Card sx={{
            width: "100%",
            border:error?"1px solid red":" "
        }}>
            <StyledCardHeader title={label} />
            <Box sx={{
                p: "1px", 
                alignItems: "center",
                 display: 'flex', 
                 flexDirection: "column",
                 pb:0,
                 
            }}>
                <ImagePreview 
                imagePath={image}
                size={130}
                />
                <input
                    ref={inputFileRef}
                    accept="image/*"
                    hidden
                    id="avatar-image-upload"
                    type="file"
                    
                    onChange={handleOnChange}
                    name={name}
                    {...props}
                />
                <label htmlFor="avatar-image-upload">
                    <Button
                        variant="text"
                        color={image ? "warning" : "primary"}
                        component="span"
                        sx={{
                            m: "6px"
                        }}
                    >
                        {image ? <Button size="small" variant="text" component="span" startIcon={<EditIcon/>}>ویرایش</Button> :<Button size="small" component="span" variant="text" startIcon={<UploadIcon/>}>آپلود</Button>}
                    </Button>
                </label>
            </Box>
        </Card>
        {error&& <Typography fontSize="0.75rem" color="red" >{helperText}</Typography>}

        </Box>
    )
}
ImageUpload.propTypes = {
    onChangeHandle: PropTypes.func,
    error:PropTypes.bool,
    helperText:PropTypes.string
}

ImageUpload.defaultProps = {
    onChangeHandle:()=>{},
    error:false,
    helperText:""
}
