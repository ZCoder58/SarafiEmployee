import React from 'react'
import { CCard, CTooltip, DatePresenter } from '../../../ui-componets'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Box, Tab, Grid, Stack, Typography, TextField, Divider, IconButton, Switch, FormControlLabel } from "@mui/material"
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ExchangeRateTable from './ExchangeRatesTable';
import { AutoComplete, SkeletonFull } from '../../../ui-componets'
import CountriesRatesStatics from '../../../helpers/statics/CountriesRatesStatic';
import authAxiosApi from '../../../axios'
import useToast from '../../../hooks/useToast';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ConvertCurrency from './CustomerCurrencyConvert';

export default function VExchangeRates() {
  const [value, setValue] = React.useState('1');
  const [loading, setLoading] = React.useState(true)
  const [countryRateBase, setCountryRateBase] = React.useState({})
  const [countries, setCountries] = React.useState([])
  const [refreshTableState, setRefreshTableState] = React.useState(false)
  const [rateAmount, setRateAmount] = React.useState(1)
  const [exchangeReverse, setExchangeReverse] = React.useState(false)
  const [dateTime,setDatetime]=React.useState(new Date())
  const toast = useToast()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const refreshTable = () => {
    setRefreshTableState(s => !s)
  }
  const handleBaseChange = (counrtyRateObj) => {
    if (counrtyRateObj === null) {
      setCountryRateBase(s => s = countryRateBase)
    } else {
      setCountryRateBase(counrtyRateObj)
    }
    refreshTable()
  }
  const handleRateAmountChange = (newAmount) => {
    if (newAmount >= 1 && newAmount <= 5000) {
      setRateAmount(newAmount)
      refreshTable()
    } else {
      toast.showError("نرخ باید بین 1-5000 باشد")
      setRateAmount(1)
    }
  }
  const handleExchangeReverseChange=(reverse)=>{
    setExchangeReverse(s=>!s)
    if(reverse){
      setRateAmount(1)
    }
    refreshTable()
  }
  
  React.useEffect(() => {
    (async () => {
      await authAxiosApi.get('exchangeRates/countries').then(r => {
        setCountries(r)
        if (r.length > 0) {
          var afgRate=r.find(a=>a.abbr==="AFN")
          var usdRate=r.find(a=>a.abbr==="USD")
          if(afgRate){
            setCountryRateBase(afgRate)
          }else if(usdRate){
            setCountryRateBase(usdRate)
          }else{
            setCountryRateBase(r[0])
          }
        }
      })
      setLoading(false)
    })()
  }, [])
  return (
    <CCard
      headerIcon={<CurrencyExchangeIcon />}
      title="تبادل ارز"
      subHeader={<Stack spacing={1} direction="row">
        <Typography>ارزش نرخ اسعار امروز</Typography>
        <DatePresenter/>
        </Stack> }
      actions={
        <CTooltip title="راهنمای بخش">
          <IconButton><HelpOutlineOutlinedIcon /></IconButton>
        </CTooltip>
      }>
      {countries.length>0&&(
        <Grid container spacing={2}>
        <Grid item lg={12} md={12} ms={12} xs={12}>
        </Grid>
        <Grid item lg={12} md={12} ms={12} xs={12}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} >
                <Tab label="نرخ ارز ها" value="1" sx={{ typography: "body1" }} />
                <Tab label="تبدیل نرخ" value="2" sx={{ typography: "body1" }} />
              </TabList>
            </Box>
            <TabPanel value="1">{loading ? <SkeletonFull /> : (
              <Grid container spacing={1}>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <AutoComplete
                    loading={loading}
                    size="small"
                    disableClearable
                    data={countries}
                    defaultValue={countryRateBase}
                    label="بر اساس"
                    name="id"
                    required
                    onChange={(newValue) => handleBaseChange(newValue)}
                    getOptionLabel={(option) => `${option.countryName} (${option.priceName})`}
                    renderOption={(option, selected) => {
                      return (
                        <Stack direction="row" spacing={1} justifyContent="space-between" width="100%">
                          <Typography variant="caption">{option.countryName} ({option.priceName})</Typography>
                          <img width="20px" height="20px" alt="" src={CountriesRatesStatics.flagPath(option.flagPhoto)} />
                        </Stack>
                      )
                    }}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                 {!exchangeReverse&&<TextField
                    name="rateAmount"
                    value={rateAmount}
                    type="number"
                    onChange={(e) => handleRateAmountChange(e.target.value)}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <Stack direction="row">
                          <Divider orientation='vertical' flexItem ></Divider>
                          <Typography sx={{ ml: 1 }} variant="body1" >{countryRateBase ? countryRateBase.priceName : "هیچ"}</Typography>
                        </Stack>
                      )
                    }}
                    label={`نرخ`}
                  />}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControlLabel control={<Switch checked={exchangeReverse} onChange={(e) =>handleExchangeReverseChange(e.target.value)} />} label="برعکس" />
                    <Typography>{!exchangeReverse?(`ارزش ${rateAmount} ${countryRateBase.priceName} معادل ارز های دیگر`):(`ارزش ارز های دیگر معادل ${countryRateBase.priceName}`)}</Typography>
                  </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <ExchangeRateTable exchangeReverse={exchangeReverse} baseCountryRate={countryRateBase} rateAmount={rateAmount} refreshTableState={refreshTableState} />
                </Grid>
              </Grid>
            )}</TabPanel>
            <TabPanel value="2">
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <ConvertCurrency />
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
      )}
    </CCard>
  )
}