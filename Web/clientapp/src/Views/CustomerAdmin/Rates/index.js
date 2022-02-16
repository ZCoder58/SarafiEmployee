import React from 'react'
import { CCard, SkeletonFull, CDialog, CToolbar } from '../../../ui-componets'
import { Grid, Button, TableContainer } from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import authAxiosApi from '../../../axios'
import CUpdateExchangeRateForm from './CUpdateExchangeRateForm'
import CCreateExchangeRateForm from './CCreateExchangeRateForm'
import TableDesktopview from './exchangeRatesReponsive/TableDesktopView'
import { useSelector } from 'react-redux'
import TableMobileView from './exchangeRatesReponsive/TableMobileView'
import {AddOutlined} from '@mui/icons-material'
export default function VCRateExchangeRates() {
    const [loading, setLoading] = React.useState(false)
    const [exchangeRates, setExchangeRates] = React.useState([])
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false)
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false)
    const [refreshTable, setRefreshTable] = React.useState(false)
    const [updateRateId, setUpdateRateId] = React.useState("")
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    const handleEditClick = React.useCallback((id) => {
        setUpdateRateId(id)
        setUpdateDialogOpen(true)
    }, [])
    function toggleRefreshTable() {
        setRefreshTable(!refreshTable)
    }
    function handleSubmitDone() {
        setUpdateDialogOpen(false)
        setCreateDialogOpen(false)
        toggleRefreshTable()
    }
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/rates/todayExchangeRates').then(r => {
                setExchangeRates(r)
            })
            setLoading(false)
        })()
    }, [refreshTable])
    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <CCard
                    title={`نرخ اسعار معادل`}
                    subHeader={`نرخ اسعار ${new Date().toLocaleDateString()}`}
                    headerIcon={<CurrencyExchangeIcon />}
                >
                    {updateDialogOpen && <CDialog
                        title="ویرایش نرخ ارز"
                        onClose={() => setUpdateDialogOpen(false)}
                        open={updateDialogOpen}
                    >
                        <CUpdateExchangeRateForm onSubmitDone={handleSubmitDone} exchangeRateId={updateRateId} />
                    </CDialog>}
                    {createDialogOpen && <CDialog
                        title="نرخ ارز جدید"
                        onClose={() => setCreateDialogOpen(false)}
                        open={createDialogOpen}
                    >
                        <CCreateExchangeRateForm onSubmitDone={handleSubmitDone} />
                    </CDialog>}
                    {loading ? <SkeletonFull /> :
                        <>
                            <CToolbar>
                                <Button startIcon={<AddOutlined/>} onClick={() => setCreateDialogOpen(true)}>جدید</Button>
                            </CToolbar>
                            <TableContainer>
                                {screenXs ?
                                    <TableMobileView exchangeRates={exchangeRates} handleEditClick={handleEditClick} /> :
                                    <TableDesktopview exchangeRates={exchangeRates} handleEditClick={handleEditClick} />}
                            </TableContainer>
                        </>
                    }
                </CCard>
            </Grid>
        </Grid>
    )
}