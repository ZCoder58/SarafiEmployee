import { CheckCircleOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import authAxiosApi from '../../../../axios';
import Util from '../../../../helpers/Util';
import { RatesDropdown } from '../../../../ui-componets';
const initialModel = {
    subCustomerAccountId: "",
    amount: 0,
    ratesCountryId: ""
}
const validationSchema = Yup.object().shape({
    amount: Yup.number().required("مقدار پول اولیه حساب ضروری میباشد").moreThan(0, "کمتر از صفر مجاز نیست"),
    ratesCountryId: Yup.string().required("انتخاب ارز حساب ضروری میباشد")
});
export default function CreateSubCustomerAccountRateForm({subCustomerId,onSubmit}) {
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            const formData=Util.ObjectToFormData(values)
            formData.set("subCustomerAccountId",subCustomerId)
            await authAxiosApi.post('subCustomers/accounts',formData).then(r=>{
                onSubmit({
                    id:r.id,
                    amount:r.amount,
                    createdDate:r.createdDate,
                    ratesCountryPriceName:r.ratesCountryPriceName
                })
            }).catch(errors=>{
                formikHelper.setErrors(errors)
            })
            return false
        }
    })
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <TextField
                variant='outlined'
                name='amount'
                helperText={formik.errors.amount}
                size='small'
                label='مقدار پول اولیه'
                type='text'
                required
                error={formik.errors.amount ? true : false}
                onChange={formik.handleChange}
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