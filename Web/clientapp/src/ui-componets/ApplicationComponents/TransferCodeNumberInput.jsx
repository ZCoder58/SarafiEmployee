import { Box, TextField, Typography } from '@mui/material';
import React from 'react'
import authAxiosApi from '../../axios';
export default function TransferCodeNumberInput({ customerId, ...props }) {
    const [lastCodeNumber, setLastCodeNumber] = React.useState(null)
    React.useEffect(() => {
        (async () => {
            if (customerId) {
                await authAxiosApi.get('customer/transfers/lcn', {
                    params: {
                        cId: customerId
                    }
                }).then(r => {
                    setLastCodeNumber(r)
                }).catch(error => {
                    console.log("no internet connection");
                })
            } else {
                setLastCodeNumber(null)
            }
        })()
    }, [customerId])
    return (
        <Box>
            <TextField
                {...props}
            />
            <Typography variant="subtitle2">{lastCodeNumber && lastCodeNumber >= 0 ? `آخرین کد نمبر : ${lastCodeNumber}` : ""}</Typography>
        </Box>
    )
}