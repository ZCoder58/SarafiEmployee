import { Box } from "@mui/material";
import { TabList } from '@mui/lab'

export default function TabsList({ children,onChange }) {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={onChange} >
                {children}
            </TabList>
        </Box>
    )
}