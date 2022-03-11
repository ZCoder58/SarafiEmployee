import React from 'react'
import { Box, Divider, Grid, InputAdornment, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../axios'
import { LoadingButton } from '@mui/lab'
import { CheckOutlined } from '@mui/icons-material'
import { SkeletonFull } from '../../../ui-componets'
import Util from '../../../helpers/Util'
const initialModel = {
    exchangeRateId: "",
    fromAmount: 1,
    toExchangeRateSell: 0,
    toExchangeRateBuy: 0
}
const validationSchema = Yup.object().shape({
    fromAmount: Yup.number().required("مقدار ارز ضروری میباشد").moreThan(0, "کمتر از 1 مجاز نیست"),
    toExchangeRateSell: Yup.number().required("مقدار معادل فروش ضروری میباشد").moreThan(0, "کمتر از 0 مجاز نیست"),
    toExchangeRateBuy: Yup.number().required("مقدار معادل خرید ضروری میباشد").moreThan(0, "کمتر از 0 مجاز نیست")
});
export default function CUpdateExchangeRateForm({ exchangeRateId,onSubmitDone }) {
    const [loading, setLoading] = React.useState(false)
    const [rate,setRate]=React.useState({})
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            try{

                await authAxiosApi.put('customer/rates/exchangeRates',Util.ObjectToFormData(values))
                onSubmitDone()
            }catch(errors){
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/rates/exchangeRates/' + exchangeRateId).then(r => {
                formik.setValues({
                    fromAmount:r.fromAmount,
                    exchangeRateId:r.id,
                    toExchangeRateBuy:r.toExchangeRateBuy,
                    toExchangeRateSell:r.toExchangeRateSell
                })
                setRate(r)
            })
            setLoading(false)
        })()
    }, [exchangeRateId])
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
           {loading?<SkeletonFull/>: <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        variant='outlined'
                        name='fromAmount'
                        helperText={formik.errors.fromAmount}
                        value={formik.values.fromAmount}
                        size='small'
                        label='نرخ ارز'
                        type='number'
                        required
                        error={formik.errors.fromAmount ? true : false}
                        onChange={formik.handleChange}
                        InputProps={{ 
                            endAdornment:<InputAdornment position="end">
                            {rate.fromRatesCountryPriceName}
                            <Divider orientation='vertical' variant='middle' flexItem/>
                        </InputAdornment>
                         }}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <TextField
                        variant='outlined'
                        name='toExchangeRateSell'
                        helperText={formik.errors.toExchangeRateSell}
                        value={formik.values.toExchangeRateSell}
                        size='small'
                        label='نرخ معادل فروش'
                        type='number'
                        required
                        error={formik.errors.toExchangeRateSell ? true : false}
                        onChange={formik.handleChange}
                        InputProps={{ 
                            endAdornment:<InputAdornment position="end">
                                    {rate.toRatesCountryPriceName}
                                    <Divider orientation='vertical' variant='middle' flexItem/>
                                </InputAdornment>
                         }}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <TextField
                        variant='outlined'
                        name='toExchangeRateBuy'
                        helperText={formik.errors.toExchangeRateBuy}
                        value={formik.values.toExchangeRateBuy}
                        size='small'
                        label='نرخ معادل خرید'
                        type='number'
                        required
                        error={formik.errors.toExchangeRateBuy ? true : false}
                        onChange={formik.handleChange}
                        InputProps={{ 
                            endAdornment:<InputAdornment position="end">
                                    {rate.toRatesCountryPriceName}
                                    <Divider orientation='vertical' variant='middle' flexItem/>
                                </InputAdornment>
                         }}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                   <LoadingButton
                   loading={formik.isSubmitting}
                   size='small'
                   variant="contained"
                   color="primary"
                   type="submit"
                   startIcon={<CheckOutlined/>}>
                       ذخیره
                   </LoadingButton>
                </Grid>
            </Grid>}
        </Box>
    )
}