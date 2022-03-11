import React from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../../axios'
import Util from '../../../../helpers/Util'
import {SubCustomerAccountRatesSelect,CTitle, CurrencyInput } from '../../../../ui-componets'
import { LoadingButton } from '@mui/lab'
import { CheckCircleOutline } from '@mui/icons-material'
const initialModel = {
    subCustomerId: "",
    subCustomerAccountRateId:"",
    comment: "",
    amount: 1,
}
const validationSchema = Yup.object().shape({
    amount: Yup.number().required("مقدار پول ضروری میباشد").moreThan(0,"کمتر از 1 مجاز نیست"),
    subCustomerAccountRateId:Yup.string().required("انتخاب حساب ارز ضروری میباشد"),
});
export default function SCNewTransactionFormDeposit({subCustomer, onSuccess}) {
    const [accountRate,setAccountRate]=React.useState(null)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            const formData=Util.ObjectToFormData(values);
            formData.set('subCustomerId',subCustomer.id)
            await authAxiosApi.put('subCustomers/accounts/deposit',formData )
                .then(r => {
                    onSuccess()
                }).catch(errors=>{
                    formikHelper.setErrors(errors)
                })
            return false
        }
    })
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <CTitle>اضافه کردن پول به حساب مشتری</CTitle>
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
             onValueChange={(v)=>{
                formik.setFieldValue("subCustomerAccountRateId",v?v.id:"")
                setAccountRate(v)
             }}
            />
            <CurrencyInput
                variant='outlined'
                name='amount'
                helperText={formik.errors.amount}
                size='small'
                label='مقدار'
                value={formik.values.amount}
                required
                error={formik.errors.amount ? true : false}
                onChange={(v)=>formik.setFieldValue("amount",v)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        {accountRate?accountRate.priceName:"هیچ"}
                    </InputAdornment>
                }}
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