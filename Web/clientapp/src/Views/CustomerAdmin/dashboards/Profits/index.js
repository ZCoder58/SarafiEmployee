import React from 'react'
import { Card, CardHeader, Grid } from '@mui/material'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import InTransfersProfits from './InTransfersProfits';
import OutTransfersProfits from './OutTransfersProfits';
import PInTransfersProfits from './PInTransfersProfits';
import POutTransfersProfits from './POutTransfersProfits';
import CDTransfersStatics from './Statics/CDTransfersStatics';
export default function Profits() {
    return (
        <>
            <CDTransfersStatics/>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Card>
                    <CardHeader
                        title="کمیشن حواله های اجرا شده دریافتی"
                        avatar={<ArchiveOutlinedIcon/>}
                        titleTypographyProps={{ typography: "body1" }}
                    />
                   <InTransfersProfits/>
                </Card>

            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Card>
                    <CardHeader
                        title="کمیشن حواله های اجرا شده ارسالی"
                        avatar={<UnarchiveOutlinedIcon />}
                        titleTypographyProps={{ typography: "body1" }}
                    />
                    <OutTransfersProfits/>
                </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Card>
                    <CardHeader
                        title="کمیشن حواله های اجرا نشده دریافتی"
                        avatar={<ArchiveOutlinedIcon />}
                        titleTypographyProps={{ typography: "body1" }}
                    />
                   <PInTransfersProfits/>
                </Card>

            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Card>
                    <CardHeader
                        title="کمیشن حواله های اجرا نشده ارسالی"
                        avatar={<UnarchiveOutlinedIcon />}
                        titleTypographyProps={{ typography: "body1" }}
                    />
                    <POutTransfersProfits/>
                </Card>
            </Grid>
        </>
    )
}