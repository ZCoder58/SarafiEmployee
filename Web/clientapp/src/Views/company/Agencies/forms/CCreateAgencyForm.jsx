import React from 'react'
import { Box, Grid, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../../axios'
import { LoadingButton } from '@mui/lab'
import { CheckOutlined } from '@mui/icons-material'
import Util from '../../../../helpers/Util'
const initialModel = {
    name: ""
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام نمایندگی ضروری میباشد")
});
export default function CCreateAgencyForm({ onSubmitDone }) {
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            await authAxiosApi.post('company/agencies', Util.ObjectToFormData(values)).then(r => {
                onSubmitDone()
            }).catch(err => formikHelper.setErrors(err))
            return false
        }
    })

    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        variant='outlined'
                        name='name'
                        helperText={formik.errors.name}
                        value={formik.values.name}
                        size='small'
                        label='نام نمایندگی'
                        required
                        error={formik.errors.name ? true : false}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <LoadingButton
                        loading={formik.isSubmitting}
                        size='small'
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={<CheckOutlined />}>
                        ذخیره
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}