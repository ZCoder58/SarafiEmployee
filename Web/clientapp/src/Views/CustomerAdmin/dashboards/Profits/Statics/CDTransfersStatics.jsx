import React from 'react'
import { Card, Grid, Stack, Typography, CardContent } from '@mui/material'
import authAxiosApi from '../../../../../axios'
import { SkeletonFull } from '../../../../../ui-componets'
var StaticItem = ({ amount, text }) => (
    <Card>
        <CardContent>

        <Stack direction={"column"} spacing={1} justifyContent="center" alignItems="center" >
            <Typography variant="h5">{amount}</Typography>
            <Typography >{text}</Typography>
        </Stack>
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
            <Grid item lg={3} md={3} sm={3} xs={12}>
                {loading ? <SkeletonFull /> :
                    <StaticItem
                        amount={statics.completedInTransfers}
                        text="حواله های اجرا شده دریافتی" />}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                {loading ? <SkeletonFull /> :
                    <StaticItem
                        amount={statics.completedOutTransfers}
                        text="حواله های اجرا شده ارسالی" />}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                {loading ? <SkeletonFull /> :
                    <StaticItem
                        amount={statics.pendingInTransfers}
                        text="حواله های اجرا نشده دریافتی" />}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                {loading ? <SkeletonFull /> :
                    <StaticItem
                        amount={statics.pendingOutTransfers}
                        text="حواله های اجرا نشده ارسالی" />}
            </Grid>
        </>
    )
}