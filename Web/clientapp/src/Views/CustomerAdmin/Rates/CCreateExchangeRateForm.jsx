import React from 'react'
import { Box, Divider, Grid, InputAdornment, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../axios'
import { LoadingButton } from '@mui/lab'
import { CheckOutlined } from '@mui/icons-material'
import { SkeletonFull,RatesDropdown } from '../../../ui-componets'
import Util from '../../../helpers/Util'
const initialModel = {
    fromCurrency: "",
    toCurrency: "",
    fromAmount: 1,
    toAmount: 1
}
const validationSchema = Yup.object().shape({
    fromCurrency: Yup.string().required("انتخاب ارز ضروری میباشد"),
    toCurrency: Yup.string().required("انتخاب ارز معادل ضروری میباشد"),
    fromAmount: Yup.number().required("مقدار ارز ضروری میباشد").moreThan(0, "کمتر از 1 مجاز نیست"),
    toAmount: Yup.number().required("مقدار معادل ضروری میباشد").moreThan(0, "کمتر از 1 مجاز نیست")
});
export default function CUpdateExchangeRateForm({onSubmitDone }) {
    const [fromRate,setFromRate]=React.useState(null)
    const [toRate,setToRate]=React.useState(null)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            try{
                await authAxiosApi.post('customer/rates/exchangeRates',Util.ObjectToFormData(values))
                onSubmitDone()
            }catch(errors){
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <RatesDropdown
                     name='fromCurrency'
                     helperText={formik.errors.fromCurrency}
                     value={formik.values.fromCurrency}
                     size='small'
                     label='از ارز'
                     type='string'
                     required
                     error={formik.errors.fromCurrency ? true : false}
                     onValueChange={(v)=>{
                         formik.setFieldValue("fromCurrency",v?v.id:undefined)
                         setFromRate(v)
                        }}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <RatesDropdown
                     name='toCurrency'
                     helperText={formik.errors.toCurrency}
                     value={formik.values.toCurrency}
                     size='small'
                     label='به ارز'
                     type='string'
                     required
                     error={formik.errors.toCurrency ? true : false}
                     onValueChange={(v)=>{
                         formik.setFieldValue("toCurrency",v?v.id:undefined)
                         setToRate(v)
                        }}
                    />
                </Grid>
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
                            {fromRate?fromRate.priceName:"هیچ"}
                            <Divider orientation='vertical' variant='middle' flexItem/>
                        </InputAdornment>
                         }}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        variant='outlined'
                        name='toAmount'
                        helperText={formik.errors.toAmount}
                        value={formik.values.toAmount}
                        size='small'
                        label='نرخ معادل'
                        type='number'
                        required
                        error={formik.errors.toAmount ? true : false}
                        onChange={formik.handleChange}
                        InputProps={{ 
                            endAdornment:<InputAdornment position="end">
                                    {toRate?toRate.priceName:"هیچ"}
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
            </Grid>
        </Box>
    )
}