import * as Yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import React from 'react';
import { Grid, IconButton, TextField,Box } from "@mui/material";
import { AgenciesSelect, CCard, CountriesDropDown, PasswordField, ProfileImageUploader } from "../../../ui-componets";
import { ArrowBackOutlined, SaveOutlined } from "@mui/icons-material";
import authAxiosApi from "../../../axios";
import Util from '../../../helpers/Util'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
export default function VNewEmployee() {
    const navigate = useNavigate()
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: employeeModel,
        onSubmit: async (values, formikHelper) => {
            try {
                await authAxiosApi.post('company/employees', Util.ObjectToFormData(values))
                navigate("/company/employees")
            } catch (e) {
                formikHelper.setErrors(e)
            }
            return false
        }
    })
    return (
        <CCard
        title="کارمند جدید"
        subHeader="فورم ثبت کارمند جدید"
        headerIcon={<PersonAddAltOutlinedIcon/>}
        enableActions
        actions={<IconButton onClick={()=>navigate('/company/employees')}>
            <ArrowBackOutlined/>
        </IconButton>}
        >
            <Box component="form" onSubmit={formik.handleSubmit} noValidate >
                <Grid container spacing={2} >
                    <Grid item lg={4} md={4} sm={4} xs={6} display="flex" alignItems="center" justifyContent="center">
                        <ProfileImageUploader
                            label="عکس کارمند"
                            name="photoFile"
                            onChangeHandle={(file) => formik.setFieldValue("photo", file)} />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <TextField
                            variant='outlined'
                            name='name'
                            helperText={formik.errors.name}
                            size='small'
                            label='نام'
                            type='text'
                            required
                            margin='normal'
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
                            label='نام پدر'
                            required
                            error={formik.errors.fatherName ? true : false}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                    <TextField
                            variant='outlined'
                            name='phone'
                            helperText={formik.errors.phone}
                            size='small'
                            label='شماره تماس'
                            type='number'
                            required
                            error={formik.errors.phone ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='email'
                            size='small'
                            label='ایمیل'
                            type='email'
                            helperText={formik.errors.email}
                            error={formik.errors.email ? true : false}
                            onChange={formik.handleChange}
                        />
                        <CountriesDropDown
                        name="countryId"
                        required
                        label="کشور"
                        size='small'
                        helperText={formik.errors.countryId}
                        error={formik.errors.countryId ? true : false}
                        onValueChange={(newValueObj)=>formik.setFieldValue("countryId",newValueObj?newValueObj.id:undefined)}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <TextField
                            variant='outlined'
                            name='userName'
                            helperText={formik.errors.userName}
                            size='small'
                            label='نام کاربری'
                            type='text'
                            required
                            error={formik.errors.userName ? true : false}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>

                        <AgenciesSelect
                            name='companyAgencyId'
                            helperText={formik.errors.companyAgencyId}
                            size='small'
                            label='نمایندگی'
                            required
                            error={formik.errors.companyAgencyId ? true : false}
                            onValueChange={(v)=>formik.setFieldValue("companyAgencyId",v?v.id:undefined)}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            variant='outlined'
                            name='detailedAddress'
                            helperText={formik.errors.detailedAddress}
                            size='small'
                            label='جزییات آدرس'
                            type='text'
                            multiline
                            rows={4}
                            required
                            error={formik.errors.detailedAddress ? true : false}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <PasswordField
                            variant="outlined"
                            name="password"
                            label="رمز عبور"
                            required
                            size="small"
                            helperText={formik.errors.password}
                            onChange={formik.handleChange}
                            error={formik.errors.password ? true : false}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <PasswordField
                            variant="outlined"
                            name="repeatPassword"
                            label="تکرار رمز عبور"
                            required
                            size="small"
                            helperText={formik.errors.repeatPassword}
                            onChange={formik.handleChange}
                            error={formik.errors.repeatPassword ? true : false}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} display="flex" justifyContent="end">
                        <LoadingButton
                            loading={formik.isSubmitting}
                            loadingPosition='start'
                            variant='contained'
                            color='primary'
                            startIcon={<SaveOutlined />}
                            type='submit'
                            size="small"
                        >
                             ذخیره
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </CCard>
       
    )
}
const employeeModel = {
    name: "",
    fatherName: "",
    phone: "",
    countryId: "",
    companyAgencyId: "",
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
    detailedAddress: "",
    photo:{},
    
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام ضروری میباشد"),
    fatherName: Yup.string().required("ولد ضروری میباشد"),
    detailedAddress: Yup.string().required("جزییات آدرس ضروری میباشد"),
    phone: Yup.string().required("شماره تماس ضروری میباشد"),
    countryId: Yup.string().required("انتخاب کشور ضروری میباشد"),
    companyAgencyId: Yup.string().required("نمایندگی ضروری میباشد"),
    email: Yup.string().email("ایمیل نادرست").typeError("ایمیل ادرس درست نمیباشد"),
    userName: Yup.string().required("نام کاربری ضروری میباشد"),
    password: Yup.string().required("رمز عبور ضروری میباشد"),
    repeatPassword: Yup.string()
        .required("تکرار رمز عبور ضروری میباشد")
        .test("validateRepeatPassword", "رمز عبور یکسان نیست", (value, context) => {
            return context.parent.password === value;
        })
});