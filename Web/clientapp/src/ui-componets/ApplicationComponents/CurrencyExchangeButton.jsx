import React from 'react'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {IconButton} from '@mui/material';
import { CDialog, CTooltip } from '..';
import CurrencyExchange from '../../Views/CustomerAdmin/BuyAndSellMoney/CurrencyExchange'
export default function CurrencyExchangeButton() {
    const [open, setOpen] = React.useState(false)
    return (
        <>
            <CTooltip title="تبدیل ارز">
                <IconButton onClick={()=>setOpen(!open)} size="small">
                    <CurrencyExchangeIcon />
                </IconButton>
            </CTooltip>
            <CDialog open={open}
                title="تبدیل ارز"
                onClose={() => setOpen(false)}>
                <CurrencyExchange onSuccess={()=>setOpen(!open)}/>
            </CDialog>          
        </>
    )
}