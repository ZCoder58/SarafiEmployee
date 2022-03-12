import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react' 
import authAxiosApi from '../../../../axios'
import { CurrencyText, SkeletonFull } from '../../../../ui-componets'
export default function InTransfersProfits(){
    const [inProfits, setInProfits] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/dashboard/todayInProfits').then(r => {
                setInProfits(r)
            })
           
            setLoading(false)
        })()
        return () => {
            setInProfits([])
        }
    }, [])
    return(
        loading ? <SkeletonFull /> :
            <List>
                {inProfits.map((e, i) => (
                    <ListItem key={i}>
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Stack component="span" direction="row" spacing={1} alignItems="flex-end">
                                        <Typography component="span" variant="h5"><CurrencyText value={e.totalProfit}/></Typography>
                                        <Typography component="span" variant="h5">{e.currencyName}</Typography>
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

            </List>
    )
}