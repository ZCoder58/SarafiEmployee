import { Box, Grid, TextField, IconButton } from '@mui/material';
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CCard } from '../../../ui-componets'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { LoadingButton } from '@mui/lab';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import authAxiosApi from '../../../axios';
import Util from '../../../helpers/Util'
import { useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
const initialModel = {
    name: "",
    lastName: "",
    fatherName: "",
    phone: "",
    address: "",
    sId: ""
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required('نام ضروری میباشد'),
    fatherName: Yup.string().required('نام پدر ضروری میباشد'),
    phone: Yup.string().required('شماره تماس ضروری میباشد'),
    sId: Yup.string().required('شماره تذکره ضروری میباشد'),
    address: Yup.string().required('آدرس مشتری ضروری میباشد')
});
export default function VCSubCustomersCreate() {
    const navigate=useNavigate()
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            await authAxiosApi.post('subCustomers',Util.ObjectToFormData(values))
            .then(r=>{
                navigate('/company/subCustomers')
            }).catch(errors=>formik.setErrors(errors))
            return false
        }
    })
    return (
        <CCard
            title="فورم ثبت مشتری جدید"
            headerIcon={<PersonAddAltOutlinedIcon />}
            enableActions
            actions={<IconButton onClick={()=>navigate('/company/subCustomers')}><ArrowBack/></IconButton>}
        >
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                            variant='outlined'
                            name='name'
                            helperText={formik.errors.name}
                            size='small'
                            label='نام'
                            type='text'
                            required
                            error={formik.errors.name ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='lastName'
                            size='small'
                            label='تخلص'
                            type='text'
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='fatherName'
                            helperText={formik.errors.fatherName}
                            size='small'
                            label="ولد"
                            type='text'
                            required
                            error={formik.errors.fatherName ? true : false}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextField
                            variant='outlined'
                            name='phone'
                            helperText={formik.errors.phone}
                            size='small'
                            label='شماره تماس'
                            type='text'
                            required
                            error={formik.errors.phone ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='sId'
                            helperText={formik.errors.sId}
                            size='small'
                            label='نمبر تذکره'
                            type='text'
                            required
                            error={formik.errors.sId ? true : false}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            variant='outlined'
                            name='address'
                            helperText={formik.errors.address}
                            size='small'
                            multiline
                            rows={4}
                            label="آدرس مشتری"
                            type='text'
                            required
                            error={formik.errors.address ? true : false}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <LoadingButton
                            loading={formik.isSubmitting}
                            loadingPosition='start'
                            variant='contained'
                            color='primary'
                            size='small'
                            startIcon={<CheckOutlinedIcon />}
                            type='submit'
                        >
                            تایید
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </CCard>
    )
}
