import React from "react";
import {
    Avatar,
    Card,
    CardContent,
    Button,
    CardHeader
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from "@mui/system";
import { PropTypes } from "prop-types";
import { fromImage } from 'imtool';
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
export default function ProfileImageUploader({ label, name, onChangeHandle, defaultImagePath, ...props }) {
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
                }catch{
                }
            }
        })()
    }, [defaultImagePath])
    return (
        <Card sx={{
            width: "100%",
        }}>
            <StyledCardHeader title={label} />
            <CardContent sx={{
                p: "1px", alignItems: "center", display: 'flex', flexDirection: "column",
                height: "174px"
            }}>
                <Avatar
                    src={image}
                    variant="square"
                    sx={{
                        width: "100%",
                        height: "130px",
                        '& .MuiAvatar-img': {
                            objectFit: "contain"
                        }
                    }}
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
                        {image ? <EditIcon mr={2} /> : <UploadIcon mr={2} />}
                    </Button>
                </label>
            </CardContent>
        </Card>
    )
}
ProfileImageUploader.propTypes = {
    onChangeHandle: PropTypes.func
}
