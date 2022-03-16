import React from 'react'
import { Card, Grid, Stack, Typography, CardContent } from '@mui/material'
import authAxiosApi from '../../../../../axios'
import { FieldValue, SkeletonFull } from '../../../../../ui-componets'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
var StaticItem = ({ amount, text,children }) => (
    <Card>
        <CardContent>

        <Stack direction={"column"} spacing={1} justifyContent="center" alignItems="center" >
            <Typography variant="h5">{amount}</Typography>
            <Typography >{text}</Typography>
        </Stack>
            {children}
        </CardContent>
    </Card>

)
export default function CDTransfersStatics() {
    const [loading, setLoading] = React.useState(true)
    const [statics, setStatics] = React.useState(null)

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/dashboard/transfersStatic').then(r => {
                setStatics(r)
            })

            setLoading(false)
        })()
        return () => {
            setStatics(null)
        }
    }, [])
    return (
        <>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                {loading ? <SkeletonFull /> :
                    <StaticItem
                        amount={(statics.completedInTransfers+statics.pendingInTransfers)}
                        text="حواله های دریافتی" >
                            <Stack direction="column" spacing={1}>
                            <FieldValue variant="caption" icon={<CheckCircleOutlineIcon color="success" fontSize="small"/>} label="اجرا شده" value={statics.completedInTransfers}/>
                            <FieldValue variant="caption" icon={<PendingOutlinedIcon color="warning" fontSize="small"/>} label="اجرا نشده" value={statics.pendingInTransfers}/>
                            </Stack>
                            </StaticItem>}
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                {loading ? <SkeletonFull /> :
                    <StaticItem
                        amount={(statics.completedOutTransfers+statics.pendingOutTransfers)}
                        text="حواله های ارسالی" >
                             <Stack direction="column" spacing={1}>
                            <FieldValue variant="caption" icon={<CheckCircleOutlineIcon color="success" fontSize="small"/>} label="اجرا شده" value={statics.completedOutTransfers}/>
                            <FieldValue variant="caption"  icon={<PendingOutlinedIcon color="warning" fontSize="small"/>} label="اجرا نشده" value={statics.pendingOutTransfers}/>
                            </Stack>
                        </StaticItem>}
            </Grid>
        </>
    )
}