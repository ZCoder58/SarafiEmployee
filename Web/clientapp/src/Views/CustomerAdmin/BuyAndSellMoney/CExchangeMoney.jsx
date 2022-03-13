import { Box, Grid, InputAdornment } from '@mui/material'
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
import { LoadingButton } from '@mui/lab'
import { CheckOutlined } from '@mui/icons-material'
import { CurrencyInput, ExchangeRateAlert, RatesDropdown } from '../../../ui-componets'
const initialModel = {
    fromRateCountryId: undefined,
    toRateCountryId: undefined,
    exchangeType: "buy",
    amount: undefined
}
const validationSchema = Yup.object().shape({
    fromRateCountryId: Yup.string().required("انتخاب ارز اول ضروری میباشد"),
    toRateCountryId: Yup.string().required("انتخاب ارز دوم ضروری میباشد"),
    amount: Yup.number().required("مقدار ضروری مباشد").min(1,"کمتر از 1 مجاز نیست")
});
export default function CExchangeMoney({onSuccess}) {
    const [sourceRate, setSourceRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            console.log()
            await authAxiosApi.post('customer/accounts/exchangeMoney', Util.ObjectToFormData(values)).then(r=>[
                onSuccess()
            ])
            .catch(error => formik.setErrors(error))
            return false
        }
    })
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>

        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <RatesDropdown
                    label="از ارز"
                    size="small"
                    required
                    name="fromRateCountryId"
                    error={formik.errors.fromRateCountryId ? true : false}
                    helperText={formik.errors.fromRateCountryId}
                    onValueChange={v => {
                        formik.setFieldValue("fromRateCountryId", v ? v.id : undefined)
                        setSourceRate(v)
                    }}
                />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <RatesDropdown
                    label="به ارز"
                    size="small"
                    required
                    name="toRateCountryId"
                    error={formik.errors.toRateCountryId ? true : false}
                    helperText={formik.errors.toRateCountryId}
                    onValueChange={v => {
                        formik.setFieldValue("toRateCountryId", v ? v.id : undefined)
                        setDistRate(v)
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <CurrencyInput
                    name="amount"
                    onChange={(v) => formik.setFieldValue("amount", v)}
                    error={formik.errors.amount ? true : false}
                    helperText={formik.errors.amount}
                    required
                    label="مقدار پول"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {sourceRate ? sourceRate.priceName : "هیچ"}
                        </InputAdornment>
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <ExchangeRateAlert
                    sourceRate={sourceRate}
                    distRate={distRate}
                    amount={formik.values.amount}
                    label="نتیجه تبدیل ارز"
                    onTypeChange={(t)=>formik.setFieldValue("exchangeType",t)}
                />
            </Grid>
            <Grid item xs={12}>
                <LoadingButton
                    loading={formik.isSubmitting}
                    loadingPosition='start'
                    variant='contained'
                    color='primary'
                    size='small'
                    startIcon={<CheckOutlined />}
                    type='submit'
                >
                    تایید
                </LoadingButton>
            </Grid>
        </Grid>
        </Box>
    )
}