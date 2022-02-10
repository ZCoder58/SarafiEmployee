import React from 'react'
import { Box, Grid, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useAuth from '../../../hooks/useAuth'
import { SkeletonFull } from '../../../ui-componets'
import { LoadingButton } from '@mui/lab'
import { CheckOutlined } from '@mui/icons-material'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
const validationSchema = Yup.object().shape({
    userName: Yup.string().required("نام کاربری ضروری میباشد"),
    phone: Yup.number().required("شماره تماس شما ضروری میباشد"),
    email: Yup.string().email("ایمیل درست نمیباشد").nullable(true).typeError("ایمیل درست نمیباشد"),
});
export default function EProfileEditForm() {
    const auth = useAuth()
    const [loading, setLoading] = React.useState(true)
    const formik = useFormik({
        validationSchema: validationSchema,
        onSubmit: async (values, formikHelper) => {
            try {
                await authAxiosApi.put('customer/profile/info', Util.ObjectToFormData(values)).then(r => {
                    auth.reInit(r)
                })
            } catch (errors) {
                formikHelper.setErrors(errors)
            }

            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/profile/info').then(r => {
                formik.setValues(r)
            })
            setLoading(false)
        })()
        return ()=>{
            formik.setValues({})
        }
    }, [])
    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            {loading ? <SkeletonFull /> :
                <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                            variant='outlined'
                            name='userName'
                            value={formik.values.userName ? formik.values.userName : ""}
                            helperText={formik.errors.userName}
                            size='small'
                            label='نام کاربری'
                            type='text'
                            required
                            error={formik.errors.userName ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='phone'
                            value={formik.values.phone ? formik.values.phone : ""}
                            helperText={formik.errors.phone}
                            size='small'
                            label='شماره تماس'
                            type='number'
                            required
                            error={formik.errors.phone ? true : false}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                            variant='outlined'
                            name='email'
                            value={formik.values.email ? formik.values.email : ""}
                            helperText={formik.errors.email}
                            size='small'
                            label='ایمیل آدرس'
                            type='email'
                            error={formik.errors.email ? true : false}
                            onChange={formik.handleChange}
                        />
                        
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <LoadingButton
                            loading={formik.isSubmitting}
                            variant="contained"
                            size="small"
                            type="submit"
                            startIcon={<CheckOutlined />}>
                            ذخیره
                        </LoadingButton>
                    </Grid>
                </Grid>
            }

        </Box>
    )
}