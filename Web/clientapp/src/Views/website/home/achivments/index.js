import { Grid, Card, Typography } from "@mui/material";
import React from 'react'

import {useTheme} from '@mui/material/styles'
import {PageSection, PageSectionTitle} from '../../../../ui-componets'
const AchivementItem = ({ theme, title, subTitle }) => {
    return (<Card sx={{
        borderRadius: 50,
        width: "220px",
        height: "220px",
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }}>
        <Typography variant="h4" color={theme.palette.common.white} fontWeight={600}>{title}</Typography>
        <Typography variant="body1" color={theme.palette.common.white}>{subTitle}</Typography>
    </Card>)

}
export default function Achivements() {
    const theme = useTheme()
    return (
        <PageSection alignContent="center" spacing={8} justifyContent="center" display="flex" flexDirection="row">
            <PageSectionTitle title="دستاورد ها"/>
                <Grid item>
                    <AchivementItem theme={theme} title="10" subTitle="کاربران"></AchivementItem>
                </Grid>
                <Grid item>
                    <AchivementItem theme={theme} title="1000+" subTitle="حواله ها"></AchivementItem>
                </Grid>
        </PageSection>

    )
}