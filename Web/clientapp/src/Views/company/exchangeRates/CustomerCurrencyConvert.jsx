import { Box, Divider, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React from 'react'
import authAxiosApi from "../../../axios";
import CountriesRatesStatics from "../../../helpers/statics/CountriesRatesStatic";
import { AutoComplete, SkeletonFull } from "../../../ui-componets";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
const convertCurrencyModel = {
  amount: 0,
  source: "",
  dist: ""
}
const validationSchema = Yup.object().shape({
  source: Yup.string().required("انتخاب ارز کشور ضروری است"),
  dist: Yup.string().required("انتخاب معادل ارز ضروری است"),
  amount: Yup.number().required("مقدار پول ضروری میباشد").min(10, "کوچک تر از 10 مجاز نیست")
})
export default function CustomerConvertCurrency() {
  const [sourceRate, setSourceRate] = React.useState({})
  const [distRate, setDistRate] = React.useState({})
  const [countriesRates, setCountriesRates] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [resultLoading, setResultLoading] = React.useState(true)
  const [convertResult, setConvertResult] = React.useState()
  const theme = useTheme()
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: convertCurrencyModel,
    onSubmit: async (values, formikHelper) => {
      await authAxiosApi.get('exchangeRates/convertCurrency', {
        params: values
      }).then(r => {
        setConvertResult(r)
        setResultLoading(false)
      })
      return false
    }
  })

  function handleSourceChange(newValue) {
    setResultLoading(true)
    setSourceRate(newValue)
    if (newValue) {
      formik.setFieldValue("source", newValue.abbr)
    }
  }
  function handleDistChange(newValue) {
    setResultLoading(true)
    setDistRate(newValue)
    if (newValue) {
      formik.setFieldValue("dist", newValue.abbr)
    }

  }
  React.useEffect(() => {
    (async () => {
      await authAxiosApi.get('exchangeRates/countries').then(r => {
        setCountriesRates(r)
      })
      setLoading(false)
    })()
    return () => {
      setCountriesRates([])
      setResultLoading(true)
    }
  }, [])
  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate display="flex" justifyContent="center">
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AutoComplete
                loading={loading}
                size="small"
                disableClearable
                data={countriesRates}
                error={formik.errors.source ? true : false}
                helperText={formik.errors.source}
                label="از ارز"
                name="dourceCountryRateAbbr"
                required
                onChange={(newValue) => handleSourceChange(newValue)}
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
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <AutoComplete
                loading={loading}
                size="small"
                disableClearable
                error={formik.errors.dist ? true : false}
                helperText={formik.errors.dist}
                data={countriesRates}
                label="به ارز"
                name="distCountryRateAbbr"
                required
                onChange={(newValue) => handleDistChange(newValue)}
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                sx={{
                  '& .MuiInputBase-root, .MuiInputLabel-root': {
                    fontSize: "2rem",
                  },
                  '& .MuiInputBase-root':{
                    pt:"20px"
                  }
                }}
                value={formik.values.amount}
                error={formik.errors.amount ? true : false}
                helperText={formik.errors.amount}
                required
                onChange={(e) => formik.setFieldValue("amount", e.target.value)}
                name="amount"
                type="number"
                variant="outlined"
                size="large"
                InputProps={{
                  endAdornment: (
                    <Stack direction="row">
                      <Divider orientation='vertical' flexItem ></Divider>
                      <Typography sx={{ ml: 1 }} variant="body1" >{sourceRate ? sourceRate.priceName : "هیچ"}</Typography>
                    </Stack>
                  )
                }}
                label={`نرخ`}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <LoadingButton
                loading={formik.isSubmitting}
                loadingPosition='start'
                variant='contained'
                color='primary'
                startIcon={<CheckOutlinedIcon />}
                type='submit'
              >
                تایید
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {(resultLoading && formik.isSubmitting) ? (
                <SkeletonFull />
              ) : !resultLoading && (
                <Box sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  backgroundColor: "#ebf2f9",
                  borderRadius: "5px",
                  p: 4
                }}>
                  <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="flex-end">
                      <Typography variant="h3" fontWeight={900}>{convertResult ? convertResult.result : ""}</Typography>
                      <Typography variant="h6">{distRate ? distRate.priceName : ""}</Typography>
                    </Stack>
                    <Divider>جزییات محاصبه</Divider>
                    <Stack direction="row" spacing={3}>
                      
                      <Stack direction="column">
                        <Typography variant="body2">{`ارزش 1 ${sourceRate.priceName} :`}</Typography>
                        <Typography variant="subtitle1" fontWeight={900}>{convertResult ? convertResult.sourceRate : ""} {distRate ? distRate.priceName : ""}</Typography>
                      </Stack>
                      <Stack direction="column">
                        <Typography variant="body2">{`ارزش 1 ${distRate.priceName} :`}</Typography>
                        <Typography variant="subtitle1" fontWeight={900}>{convertResult ? convertResult.distRate : ""} {sourceRate ? sourceRate.priceName : ""}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}