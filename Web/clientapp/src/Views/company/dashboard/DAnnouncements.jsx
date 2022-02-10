import React from 'react'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import authAxiosApi from '../../../axios'
import { HtmlToText, SkeletonFull } from '../../../ui-componets'
import LocalDateStatic from '../../../helpers/statics/LocalDateStatic'
export default function DAnnouncements() {
    const [announcements, setAnnouncements] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('dashboard/announcements').then(r => {
                setAnnouncements(r)
            })
            setLoading(false)
        })()
    }, [])
    return (
        loading ? <SkeletonFull /> :
            <Grid container spacing={2}>
                {announcements.map((d, i) => (
                    <Grid key={i} item lg={12} md={12} sm={12} xs={12}>
                        <Card>
                            <CardHeader
                             title="اعلان عمومی" 
                            subheader={
                                `از تاریخ ${LocalDateStatic.getDayName(d.startDate)} 
                            ${LocalDateStatic.getDate(d.startDate)}
                             ${LocalDateStatic.getMonthName(d.startDate)}
                              ${LocalDateStatic.getYear(d.startDate)}
                              تا
                              ${LocalDateStatic.getDayName(d.endDate)} 
                              ${LocalDateStatic.getDate(d.endDate)}
                               ${LocalDateStatic.getMonthName(d.endDate)}
                                ${LocalDateStatic.getYear(d.endDate)}`}/>
                            <CardContent>
                                <HtmlToText htmlText={d.content} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

    )
}