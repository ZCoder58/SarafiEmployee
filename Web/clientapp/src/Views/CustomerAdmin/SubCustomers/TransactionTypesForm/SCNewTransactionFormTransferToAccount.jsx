import React from 'react'
import { Box, Divider, InputAdornment, TextField, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../../axios'
import Util from '../../../../helpers/Util'
import { CTitle, ExchangeRateAlert, SubCustomerAccountRatesSelect, SubCustomersDropdown } from '../../../../ui-componets'
import { LoadingButton } from '@mui/lab'
import { CheckCircleOutline } from '@mui/icons-material'
const initialModel = {
    subCustomerId: undefined,
    subCustomerAccountRateId: undefined,
    comment: "",
    amount: 1,
    toSubCustomerId: undefined,
    toSubCustomerAccountRateId: undefined
}
const validationSchema = Yup.object().shape({
    amount: Yup.number().required("مقدار پول ضروری میباشد").moreThan(0, "کمتر از 1 مجاز نیست"),
    subCustomerAccountRateId: Yup.string().required("انتخاب حساب ارز ضروری میباشد"),
    toSubCustomerId: Yup.string().required("انتخاب مشتری دوم ضروری میباشد"),
    toSubCustomerAccountRateId: Yup.string().required("انتخاب حساب ارز مشتری دوم ضروری میباشد"),
});
export default function SCNewTransactionFormTransferToAccount({ subCustomer, onSuccess }) {
    const [sourceRate, setSourceRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
    const [exchangeRate, setExchangeRate] = React.useState(null)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            const formData = Util.ObjectToFormData(values);
            formData.set('subCustomerId', subCustomer.id)
            await authAxiosApi.put('subCustomers/accounts/transferToAccount', formData)
                .then(r => {
                    onSuccess()
                }).catch(errors => {
                    formikHelper.setErrors(errors)
                })
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            if (sourceRate && distRate) {
                await authAxiosApi.get('customer/rates/exchangeRate', {
                    params: {
                        from: sourceRate.ratesCountryId,
                        to: distRate.ratesCountryId
                    }
                }).then(r => {
                    setExchangeRate(r)
                })
            }
        })()
        return () => setExchangeRate(null)
    }, [sourceRate, distRate])
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <CTitle>انتقال پول از مشتری به مشتری دیگر</CTitle>
            <SubCustomerAccountRatesSelect
                subCustomerId={subCustomer.id}
                name='subCustomerAccountRateId'
                helperText={formik.errors.subCustomerAccountRateId}
                size='small'
                label='حساب ارز'
                value={formik.values.subCustomerAccountRateId}
                type='text'
                required
                error={formik.errors.subCustomerAccountRateId ? true : false}
                onValueChange={(v) => {
                    formik.setFieldValue("subCustomerAccountRateId", v ? v.id : "")
                    setSourceRate(v)
                }}
            />
            <TextField
                variant='outlined'
                name='amount'
                helperText={formik.errors.amount}
                size='small'
                label='مقدار ارسالی'
                value={formik.values.amount}
                type='number'
                required
                error={formik.errors.amount ? true : false}
                onChange={formik.handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        {sourceRate ? sourceRate.priceName : "هیچ"}
                    </InputAdornment>
                }}
            />
            <SubCustomersDropdown
                name='toSubCustomerId'
                helperText={formik.errors.toSubCustomerId}
                exceptCustomerId={subCustomer.id}
                size='small'
                label="مشتری دوم"
                required
                error={formik.errors.toSubCustomerId ? true : false}
                onValueChange={(v) => formik.setFieldValue("toSubCustomerId", v ? v.id : undefined)}
            />
            <SubCustomerAccountRatesSelect
                name='toSubCustomerAccountRateId'
                helperText={formik.errors.toSubCustomerAccountRateId}
                size='small'
                label="حساب ارز مشتری دوم"
                required
                subCustomerId={formik.values.toSubCustomerId}
                error={formik.errors.toSubCustomerAccountRateId ? true : false}
                onValueChange={(v) => {
                    formik.setFieldValue("toSubCustomerAccountRateId", v ? v.id : undefined)
                    setDistRate(v)
                }}
            />
            <ExchangeRateAlert
                exchangeRate={exchangeRate}
                sourceRate={sourceRate}
                distRate={distRate}
                amount={formik.values.amount}
            />
           
            <TextField
                variant='outlined'
                name='comment'
                size='small'
                label='ملاحضات'
                type='text'
                multiline
                rows={4}
                onChange={formik.handleChange}
            />
            <LoadingButton
                loading={formik.isSubmitting}
                loadingPosition='start'
                variant='contained'
                color='primary'
                size='small'
                startIcon={<CheckCircleOutline />}
                type='submit'
            >
                تایید
            </LoadingButton>
        </Box>
    )
}