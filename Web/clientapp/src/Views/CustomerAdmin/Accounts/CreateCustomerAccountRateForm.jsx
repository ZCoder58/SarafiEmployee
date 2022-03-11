import { CheckCircleOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import authAxiosApi from '../../../axios';
import Util from '../../../helpers/Util';
import { CurrencyInput, CurrencyText, RatesDropdown } from '../../../ui-componets';
const initialModel = {
    amount: 0,
    ratesCountryId: ""
}
const validationSchema = Yup.object().shape({
    amount: Yup.number().required("مقدار پول اولیه حساب ضروری میباشد"),
    ratesCountryId: Yup.string().required("انتخاب ارز حساب ضروری میباشد")
})
export default function CreateCustomerAccountRateForm({onSubmit}) {
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            const formData=Util.ObjectToFormData(values)
            await authAxiosApi.post('customer/accounts',formData).then(r=>{
                onSubmit(r)
            }).catch(errors=>{
                formikHelper.setErrors(errors)
            })
            return false
        }
    })
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <CurrencyInput
                variant='outlined'
                name='amount'
                helperText={formik.errors.amount}
                size='small'
                label='مقدار پول اولیه'
                required
                error={formik.errors.amount ? true : false}
                onChange={(v)=>formik.setFieldValue("amount",v)}
            />
            <RatesDropdown
                name='ratesCountryId'
                helperText={formik.errors.ratesCountryId}
                size='small'
                label="ارز حساب"
                required
                error={formik.errors.ratesCountryId ? true : false}
                onValueChange={(v) =>{
                     formik.setFieldValue("ratesCountryId", v ? v.id : "")
                    }}
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