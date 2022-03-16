import { AddOutlined, RefreshOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
import { CCard, CDialog, CTable, CToolbar, CurrencyText, SkeletonFull } from '../../../ui-componets'
import CreateBalance from './CreateBalance'
import BalanceIcon from '@mui/icons-material/Balance';

export default function AccountsBalance({friendId}){
    const [refreshState, setRefreshState] = React.useState(false)
    const [friend, setFriend] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
    const navigate = useNavigate()
    const columns = [
        {
            name: <Typography fontWeight={900}>بیلانس ها</Typography>,
            selector: row => <Typography color={row.amount < 0 ? "error" : "black"}><CurrencyText value={row.amount} priceName={row.ratesCountryPriceName} /></Typography>
        }
    ]
    function refreshTable() {
        setRefreshState(!refreshState)
    }
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get("customer/friends/info", {
                params: {
                    friendId: friendId
                }
            }).then(r => setFriend(r))
                .catch(error => navigate("/requestDenied"))
            setLoading(false)
        })()

        return () => setFriend([])
    }, [friendId, navigate])

    return (
        <CCard
            title={`بیلانس های ${friend && friend.customerFriendName} ${friend && Util.displayTextNull(friend.customerFriendLastName)}`}
            subHeader={`ولد : ${friend && Util.displayText(friend.customerFriendFatherName)}`}
            headerIcon={<BalanceIcon />}
            enableActions
            actions={<IconButton onClick={refreshTable}>
                <RefreshOutlined />
            </IconButton>}
            enableCollapse
        >
            {loading ? <SkeletonFull /> : <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    {createDialogOpen && <CDialog
                        title="بیلانس جدید"
                        onClose={() => setCreateDialogOpen(false)}
                        open={createDialogOpen}
                    >
                        <CreateBalance fId={friendId} onSubmitDone={() => {
                            setCreateDialogOpen(false)
                            refreshTable()
                        }} />
                    </CDialog>}
                    <CToolbar>
                        <Button startIcon={<AddOutlined />} onClick={() => setCreateDialogOpen(true)}>جدید</Button>
                    </CToolbar>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CTable
                        refreshState={refreshState}
                        serverUrl={"customer/balances?friendId=" + friendId}
                        striped
                        columns={columns}
                    />
                </Grid>
            </Grid>}
        </CCard>
    )
}