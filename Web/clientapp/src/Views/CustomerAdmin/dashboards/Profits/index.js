import React from 'react'
import { Card, CardHeader, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import authAxiosApi from '../../../../axios'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import { CurrencyText, SkeletonFull } from '../../../../ui-componets'
export default function Profits() {
    const [inProfits, setInProfits] = React.useState([])
    const [outProfits, setOutProfits] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/dashboard/todayInProfits').then(r => {
                setInProfits(r)
            })
            await authAxiosApi.get('customer/dashboard/todayOutProfits').then(r => {
                setOutProfits(r)
            })
            setLoading(false)
        })()
        return () => {
            setInProfits([])
            setOutProfits([])
        }
    }, [])
    return (
        <>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Card>
                    <CardHeader
                        title="مفاد امروز از معاملات رفت"
                        avatar={<UnarchiveOutlinedIcon />}
                        subheader={<React.Fragment>
                            امروز {new Date().toLocaleDateString()}
                        </React.Fragment>}
                        titleTypographyProps={{ typography: "body1" }}
                    />
                    {loading ? <SkeletonFull /> :
                        <List>
                            {outProfits.map((e, i) => (
                                <ListItem key={i}>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Stack component="span" direction="row" spacing={1} alignItems="flex-end">
                                                    <Typography component="span" variant="h3"><CurrencyText value={e.totalProfit} priceName={<Typography component="span" variant="h5">{e.currencyName}</Typography>}/></Typography>
                                                    
                                                </Stack>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Stack component="span" direction="row" spacing={1}>
                                                    <Typography component="span" variant="body2">مجموع حواله :</Typography>
                                                    <Typography component="span" variant="body2">{e.totalTransfer}</Typography>
                                                </Stack>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            ))}

                        </List>}
                </Card>

            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Card>
                    <CardHeader
                        title="مفاد از معاملات آمد"
                        subheader={<React.Fragment>
                            امروز {new Date().toLocaleDateString()}
                        </React.Fragment>}
                        avatar={<ArchiveOutlinedIcon />}
                        titleTypographyProps={{ typography: "body1" }}
                    />
                    {loading ? <SkeletonFull /> :
                        <List>
                            {inProfits.map((e, i) => (
                                <ListItem key={i}>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Stack component="span" direction="row" spacing={1} alignItems="flex-end">
                                                <Typography component="span" variant="h3"><CurrencyText value={e.totalProfit} priceName={<Typography component="span" variant="h5">{e.currencyName}</Typography>}/></Typography>

                                                </Stack>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Stack component="span" direction="row" spacing={1}>
                                                    <Typography component="span" variant="body2">مجموع حواله :</Typography>
                                                    <Typography component="span" variant="body2">{e.totalTransfer}</Typography>
                                                </Stack>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            ))}

                        </List>}
                </Card>

            </Grid>
        </>
    )
}