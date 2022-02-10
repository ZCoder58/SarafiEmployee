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
    toExchangeRate: 0
}
const validationSchema = Yup.object().shape({
    fromAmount: Yup.number().required("مقدار ارز ضروری میباشد").moreThan(0, "کمتر از 1 مجاز نیست"),
    toExchangeRate: Yup.number().required("مقدار معادل ضروری میباشد").moreThan(0, "کمتر از 0 مجاز نیست")
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
                    toExchangeRate:r.toExchangeRate
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
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        variant='outlined'
                        name='toExchangeRate'
                        helperText={formik.errors.toExchangeRate}
                        value={formik.values.toExchangeRate}
                        size='small'
                        label='نرخ معادل'
                        type='number'
                        required
                        error={formik.errors.toExchangeRate ? true : false}
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