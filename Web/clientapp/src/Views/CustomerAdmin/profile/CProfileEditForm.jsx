import React from 'react'
import { Box, Grid, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useAuth from '../../../hooks/useAuth'
import { CountriesDropDown, SkeletonFull } from '../../../ui-componets'
import { LoadingButton } from '@mui/lab'
import { CheckOutlined } from '@mui/icons-material'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
const validationSchema = Yup.object().shape({
    userName: Yup.string().required("نام کاربری ضروری میباشد"),
    phone: Yup.number().required("شماره تماس شما ضروری میباشد"),
    name: Yup.string().required("نام شما ضروری میباشد"),
    fatherName: Yup.string().required("ولد شما ضروری میباشد"),
    city: Yup.string().required("شهر شما ضروری میباشد"),
    detailedAddress: Yup.string().required("جزییات آدرس شما ضروری میباشد"),
    countryId: Yup.string().required("انتخاب کشور شما ضروری میباشد"),
    email: Yup.string().email("ایمیل درست نمیباشد").nullable(true).typeError("ایمیل درست نمیباشد"),
    
});
const initialModel = {
    userName: "",
    phone: "",
    name:"",
    fatherName: "",
    city: "",
    detailedAddress:"",
    countryId:"",
    email: ""
    
};
export default function EProfileEditForm() {
    const auth = useAuth()
    const [loading, setLoading] = React.useState(true)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues:initialModel,
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
                            defaultValue={formik.values.userName ? formik.values.userName : ""}
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
                            name='name'
                            defaultValue={formik.values.name ? formik.values.name : ""}
                            helperText={formik.errors.name}
                            size='small'
                            label='نام'
                            required
                            error={formik.errors.name ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='lastName'
                            defaultValue={formik.values.lastName ? formik.values.lastName : ""}
                            size='small'
                            label='تخلص'
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                            variant='outlined'
                            name='fatherName'
                            defaultValue={formik.values.fatherName ? formik.values.fatherName : ""}
                            helperText={formik.errors.fatherName}
                            size='small'
                            label='ولد'
                            type='text'
                            required
                            error={formik.errors.fatherName ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='phone'
                            defaultValue={formik.values.phone ? formik.values.phone : ""}
                            helperText={formik.errors.phone}
                            size='small'
                            label='شماره تماس'
                            type='number'
                            required
                            error={formik.errors.phone ? true : false}
                            onChange={formik.handleChange}
                        />
                        <CountriesDropDown
                            variant='outlined'
                            name='countryId'
                            defaultId={formik.values.countryId ? formik.values.countryId : ""}
                            helperText={formik.errors.countryId}
                            size='small'
                            label='کشور'
                            required
                            error={formik.errors.countryId ? true : false}
                            onChange={(v)=>formik.setFieldValue("countryId",v?v.id:undefined)}
                        />
                       
                        
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                    
                        <TextField
                            variant='outlined'
                            name='city'
                            defaultValue={formik.values.city ? formik.values.city : ""}
                            helperText={formik.errors.city}
                            size='small'
                            label="شهر"
                            type='text'
                            required
                            error={formik.errors.city ? true : false}
                            onChange={formik.handleChange}
                        />
                         <TextField
                            variant='outlined'
                            name='detailedAddress'
                            defaultValue={formik.values.detailedAddress ? formik.values.detailedAddress : ""}
                            helperText={formik.errors.detailedAddress}
                            size='small' 
                            rows={4}
                            label="جزییات آدرس"
                            type='text'
                            required
                            error={formik.errors.detailedAddress ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='email'
                            defaultValue={formik.values.email ? formik.values.email : ""}
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