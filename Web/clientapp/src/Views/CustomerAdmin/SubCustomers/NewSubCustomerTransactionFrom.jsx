import React from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
import { CSelect } from '../../../ui-componets'
import { LoadingButton } from '@mui/lab'
import { CheckCircleOutline } from '@mui/icons-material'
const initialModel = {
    id: "",
    comment: "",
    amount: 1,
    type: ''
}
const validationSchema = Yup.object().shape({
    amount: Yup.number().required("مقدار پول ضروری میباشد").moreThan(0,"کمتر از 1 مجاز نیست"),
    type: Yup.string().required("انتخاب نوع انتقال ضروری میباشد")
});
export default function NewSubCustomerTransactionFrom({customer, onSuccess}) {
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            const formData=Util.ObjectToFormData(values);
            formData.set('id',customer.id)
            await authAxiosApi.put('subCustomers/updateAmount',formData )
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
            <TextField
                variant='outlined'
                name='amount'
                helperText={formik.errors.amount}
                size='small'
                label='مقدار'
                value={formik.values.amount}
                type='number'
                required
                error={formik.errors.amount ? true : false}
                onChange={formik.handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        {customer.ratesCountryPriceName}
                    </InputAdornment>
                }}
            />
            <CSelect
                data={[
                    { label: "برداشت از حساب", value: "-1" },
                    { label: "انتقال به حساب", value: "1" }
                ]}
                name='type'
                helperText={formik.errors.type}
                size='small'
                label='نوعیت انتقال'
                type='number'
                required
                value={formik.values.type}
                error={formik.errors.type ? true : false}
                onChange={formik.handleChange}
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