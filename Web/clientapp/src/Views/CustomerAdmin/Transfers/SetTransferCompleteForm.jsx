import React from 'react'
import { Box, Stack, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
import { LoadingButton } from '@mui/lab'
import { CheckCircleOutline } from '@mui/icons-material'
import {FieldValue,CurrencyText} from '../../../ui-componets'
const validationSchema = Yup.object().shape({
    phone: Yup.string().required("شماره تماس دریافت کننده پول ضروری میباشد"),
    // sId: Yup.string().required("نمبر تذکره دریافت کننده پول ضروری میباشد")
});
export default function SetTransferCompleteForm({ transfer,onSubmited }) {
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: { phone: "",sId:"",transferId:transfer.id },
        onSubmit: async (values, formikHelper) => {
            try {
                await authAxiosApi.put('customer/transfers/completeTransfer', Util.ObjectToFormData(values)).then(r=>{
                    onSubmited()
                })
            } catch (errors) {
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    return (
        <>
        <Stack direction={"column"} spacing={1}>
            <FieldValue label="مقدار حواله" value={<CurrencyText value={transfer.destinationAmount} priceName={transfer.toCurrency}/>} />
        </Stack>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
                variant='outlined'
                name='phone'
                helperText={formik.errors.phone}
                size='small'
                label='شماره تماس گیرنده پول'
                type='text'
                required
                error={formik.errors.phone ? true : false}
                onChange={formik.handleChange}
            />
            <TextField
                variant='outlined'
                name='sId'
                // helperText={formik.errors.sId}
                size='small'
                label='نمبر تذکره گیرنده پول'
                type='text'
                // required
                // error={formik.errors.sId ? true : false}
                onChange={formik.handleChange}
            />
             <LoadingButton
            loading={formik.isSubmitting}
            loadingPosition='start'
            variant='contained'
            color='primary'
            startIcon={<CheckCircleOutline />}
            type='submit'
            size="small"
            >
            ذخیره 
            </LoadingButton>
        </Box>
        </>
    )
}