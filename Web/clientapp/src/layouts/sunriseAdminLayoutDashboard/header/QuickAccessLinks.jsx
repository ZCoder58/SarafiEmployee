import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';
import { IconButton, Tooltip } from '@mui/material';
export default function QuickAccessLinks() {
    return (
        <Tooltip title="لینک های سریع">
            <IconButton>
                <AssistantPhotoOutlinedIcon />
            </IconButton>
        </Tooltip>
    )
}