import { RefreshOutlined } from '@mui/icons-material'
import { Grid, IconButton, Typography, Chip, Stack } from '@mui/material'
import React from 'react'
import { CCard, CTable, CurrencyText, FieldValue } from '../../../ui-componets'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { useSelector } from 'react-redux';
export default function BalancesTransactions({ friendId }) {
    const [refreshState, setRefreshState] = React.useState(false)
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    function refreshTable() {
        setRefreshState(!refreshState)
    }
    const desktopColumns = [
        {
            name: <Typography fontWeight={900}>مقدار</Typography>,
            selector: row => <Typography color={row.amount < 0 ? "error" : "black"}>
                <CurrencyText value={row.amount} priceName={row.priceName} />
            </Typography>
        },
        {
            name: <Typography fontWeight={900}>تاریخ</Typography>,
            selector: row => new Date(row.createdDate).toLocaleDateString()
        },
        {
            name: <Typography fontWeight={900}>نوعیت</Typography>,
            selector: row => row.type === 1 ?
                <Chip component="span" color="success" size="small" label="رسید"></Chip> :
                <Chip component="span" color="info" size="small" label="طلب"></Chip>
        },
        {
            name: <Typography fontWeight={900}>ایجاد کننده</Typography>,
            selector: row =><Typography>{row.creator}</Typography>
        }

    ]
    const mobileColumns = [
        {
            name: <Typography fontWeight={900}>مقدار</Typography>,
            selector: row =>
                <Stack direction={"column"} spacing={1}>
                    <Typography color={row.amount < 0 ? "error" : "black"}>
                        <CurrencyText value={row.amount} priceName={row.priceName} />
                    </Typography>
                    <FieldValue label="تاریخ" value={new Date(row.createdDate).toLocaleDateString()} />
                    <FieldValue label="نوعیت" value={row.type === 1 ?
                        <Chip component="span" color="success" size="small" label="رسید"></Chip> :
                        <Chip component="span" color="info" size="small" label="طلب"></Chip>} />
                    <FieldValue label="ایجاد کننده" value={row.creator} />
                </Stack>
        }
    ]
    const ExpandedRowComponent = ({ data }) => (
        <Stack p={3} direction="column" spacing={2}>
            <FieldValue label="توضیحات" value={data.comment}/>
        </Stack>
    )
    return (
        <CCard
            title=""
            headerIcon={<ReceiptOutlinedIcon />}
            enableActions
            actions={<IconButton onClick={refreshTable}>
                <RefreshOutlined />
            </IconButton>}
            enableCollapse
        >
            <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CTable
                        refreshState={refreshState}
                        serverUrl={"customer/balances/transactions?fId=" + friendId}
                        striped
                        columns={screenXs ? mobileColumns : desktopColumns}
                        expandableRows={true}
                        ExpandedComponent={ExpandedRowComponent}
                    />
                </Grid>
            </Grid>
        </CCard>
    )
}