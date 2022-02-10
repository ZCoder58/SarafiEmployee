import React from 'react'
import { CCard, SkeletonFull,ImagePreview,CDialog, CTooltip } from '../../../ui-componets'
import { Grid, styled, Table, TableBody, TableCell, TableHead, TableRow,Stack,Typography,Chip,IconButton, TableContainer } from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import authAxiosApi from '../../../axios'
import CountriesRatesStatic from '../../../helpers/statics/CountriesRatesStatic'
import LocalDateStatic from '../../../helpers/statics/LocalDateStatic'
import {useParams} from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CUpdateExchangeRateForm from './CUpdateExchangeRateForm'
const TableCellHeaderStyled = styled(TableCell)({
    typography: "body1",
    fontWeight: 600
})
export default function VCRateExchangeRates() {
    var {rateId}=useParams()
    const [loading, setLoading] = React.useState(false)
    const [exchangeRates, setExchangeRates] = React.useState([])
    const [rate, setRate] = React.useState([])
    const [updateDialogOpen,setUpdateDialogOpen]=React.useState(false)
    const [refreshTable,setRefreshTable]=React.useState(false)
    const [updateRateId ,setUpdateRateId]=React.useState("")
    function handleEditClick(id){
        setUpdateRateId(id)
        setUpdateDialogOpen(true)
    }
    function toggleRefreshTable(){
        setRefreshTable(!refreshTable)
    }
    function handleSubmitDone(){
        setUpdateDialogOpen(false)
        toggleRefreshTable()
    }
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/rates/'+rateId).then(r => {
                setRate(r)
            })
            await authAxiosApi.get('customer/rates/exchangeRates',{
                params:{
                    rate:rateId
                }
            }).then(r => {
                setExchangeRates(r)
            })
            setLoading(false)
        })()
    }, [rateId,refreshTable])
    return (
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
        <CCard
            title={`نرخ اسعار معادل ${rate.priceName}`}
            subHeader={`نرخ اسعار ${LocalDateStatic.fullDate(new Date())}`}
            headerIcon={<CurrencyExchangeIcon />}>
                    {updateDialogOpen&&<CDialog
                    title="ویرایش نرخ ارز"
                    onClose={()=>setUpdateDialogOpen(false)}
                    open={updateDialogOpen}
                    >
                        <CUpdateExchangeRateForm onSubmitDone={handleSubmitDone} exchangeRateId={updateRateId}/>
                    </CDialog>}
                   { loading ? <SkeletonFull /> :
                  <TableContainer>
                        <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCellHeaderStyled>
                                    ارز
                                </TableCellHeaderStyled>
                                <TableCellHeaderStyled>
                                    معادل
                                </TableCellHeaderStyled>
                                <TableCellHeaderStyled>
                                    حالت
                                </TableCellHeaderStyled>
                                <TableCellHeaderStyled>
                                    گزینه ها
                                </TableCellHeaderStyled>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exchangeRates.map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <ImagePreview
                                                imagePath={CountriesRatesStatic.flagPath(e.fromRatesCountryFlagPhoto)}
                                                size={20}
                                                isWidthTheSame
                                            />
                                            <Typography variant="body2">{e.fromRatesCountryFaName}</Typography>
                                            <Typography variant="body2">{e.fromAmount}</Typography>
                                            <Typography variant="body2">{e.fromRatesCountryPriceName}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography variant="body2">{e.toExchangeRate}</Typography>
                                            <Typography variant="body2">{e.toRatesCountryPriceName}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        {e.updated?(
                                            <Chip label="آپدیت" size="small" variant='outlined' color="success"></Chip>
                                        ):(
                                            <Chip label="آپدیت نیست" size="small" variant='outlined' color="error"></Chip>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <CTooltip title="ویرایش">
                                            <IconButton onClick={()=>handleEditClick(e.id)}>
                                                <EditOutlinedIcon/>
                                            </IconButton>
                                        </CTooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  </TableContainer>
                    }
        </CCard>
                </Grid>
            </Grid>
    )
}