import React from 'react'
import { CCard, SkeletonFull, CDialog } from '../../../ui-componets'
import { Grid, IconButton, TableContainer } from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import authAxiosApi from '../../../axios'
import LocalDateStatic from '../../../helpers/statics/LocalDateStatic'
import { useParams } from 'react-router-dom'
import CUpdateExchangeRateForm from './CUpdateExchangeRateForm'
import TableDesktopview from './exchangeRatesReponsive/TableDesktopView'
import { useSelector } from 'react-redux'
import TableMobileView from './exchangeRatesReponsive/TableMobileView'
import { ArrowBack } from '@mui/icons-material'
import {useNavigate} from 'react-router'
export default function VCRateExchangeRates() {
    var { rateId } = useParams()
    const [loading, setLoading] = React.useState(false)
    const [exchangeRates, setExchangeRates] = React.useState([])
    const [rate, setRate] = React.useState([])
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false)
    const [refreshTable, setRefreshTable] = React.useState(false)
    const [updateRateId, setUpdateRateId] = React.useState("")
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    const navigate=useNavigate()
    const handleEditClick = React.useCallback((id) => {
        setUpdateRateId(id)
        setUpdateDialogOpen(true)
    }, [])
    function toggleRefreshTable() {
        setRefreshTable(!refreshTable)
    }
    function handleSubmitDone() {
        setUpdateDialogOpen(false)
        toggleRefreshTable()
    }
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/rates/' + rateId).then(r => {
                setRate(r)
            })
            await authAxiosApi.get('customer/rates/exchangeRates', {
                params: {
                    rate: rateId
                }
            }).then(r => {
                setExchangeRates(r)
            })
            setLoading(false)
        })()
    }, [rateId, refreshTable])
    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <CCard
                    title={`نرخ اسعار معادل ${rate.priceName}`}
                    subHeader={`نرخ اسعار ${LocalDateStatic.fullDate(new Date())}`}
                    enableActions
                    headerIcon={<CurrencyExchangeIcon />}
                    actions={<IconButton onClick={()=>navigate("/customer/rates")}>
                        <ArrowBack/>
                    </IconButton>}
                    >
                    {updateDialogOpen && <CDialog
                        title="ویرایش نرخ ارز"
                        onClose={() => setUpdateDialogOpen(false)}
                        open={updateDialogOpen}
                    >
                        <CUpdateExchangeRateForm onSubmitDone={handleSubmitDone} exchangeRateId={updateRateId} />
                    </CDialog>}
                    {loading ? <SkeletonFull /> :
                        <TableContainer>
                            {screenXs ?
                            <TableMobileView exchangeRates={exchangeRates} handleEditClick={handleEditClick} /> :
                            <TableDesktopview exchangeRates={exchangeRates} handleEditClick={handleEditClick} />}
                        </TableContainer>
                    }
                </CCard>
            </Grid>
        </Grid>
    )
}