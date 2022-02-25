import * as Yup from "yup";
import { useFormik } from "formik";
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router';
import React from 'react';
import { Grid, IconButton, TextField, Box,FormControlLabel,Switch } from "@mui/material";
import { CCard, CountriesDropDown, ProfileImageUploader, SkeletonFull } from "../../../ui-componets";
import { ArrowBackOutlined, SaveOutlined } from "@mui/icons-material";
import authAxiosApi from "../../../axios";
import Util from '../../../helpers/Util'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CustomerStatics from "../../../helpers/statics/CustomerStatic";
export default function VEditEmployee() {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)
    const { employeeId } = useParams()
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: employeeModel,
        onSubmit: async (values, formikHelper) => {
            try {
                await authAxiosApi.put('company/employees/edit', Util.ObjectToFormData(values))
                navigate("/company/employees")
            } catch (e) {
                formikHelper.setErrors(e)
            }
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('company/employees/edit', {
                params: {
                    id: employeeId
                }
            }).then(r => {
                formik.setValues(r)
            }).catch(er => {
                navigate("/requestDenied")
            })
            setLoading(false)
        })()
    }, [employeeId])
    return (
        <CCard
            title="کارمند جدید"
            subHeader="فورم ثبت کارمند جدید"
            headerIcon={<PersonAddAltOutlinedIcon />}
            enableActions
            actions={<IconButton onClick={() => navigate('/company/employees')}>
                <ArrowBackOutlined />
            </IconButton>}
        >
            {loading ? <SkeletonFull /> : <Box component="form" onSubmit={formik.handleSubmit} noValidate >
                <Grid container spacing={2} >
                    <Grid item lg={4} md={4} sm={4} xs={6} display="flex" alignItems="center" justifyContent="center">
                        <ProfileImageUploader
                            label="عکس کارمند"
                            name="photoFile"
                            defaultImagePath={CustomerStatics.profilePituresPath(formik.values.id, formik.values.photo)}
                            onChangeHandle={(file) => formik.setFieldValue("photoFile", file)} />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <TextField
                            variant='outlined'
                            name='name'
                            helperText={formik.errors.name}
                            size='small'
                            label='نام'
                            type='text'
                            value={formik.values.name}
                            required
                            error={formik.errors.name ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='lastName'
                            value={formik.values.lastName}
                            size='small'
                            label='تخلص'
                            type='text'
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='fatherName'
                            helperText={formik.errors.fatherName}
                            value={formik.values.fatherName}
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
                            value={formik.values.phone}
                            error={formik.errors.phone ? true : false}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant='outlined'
                            name='email'
                            size='small'
                            value={formik.values.email}
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
                            defaultId={formik.values.countryId}
                            size='small'
                            helperText={formik.errors.countryId}
                            error={formik.errors.countryId ? true : false}
                            onValueChange={(newValueObj) => formik.setFieldValue("countryId", newValueObj ? newValueObj.id : undefined)}
                        />
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                        <TextField
                            variant='outlined'
                            name='city'
                            helperText={formik.errors.city}
                            value={formik.values.city}
                            size='small'
                            label='شهر'
                            type='text'
                            required
                            error={formik.errors.city ? true : false}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            variant='outlined'
                            name='detailedAddress'
                            helperText={formik.errors.detailedAddress}
                            value={formik.values.detailedAddress}
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FormControlLabel
                        control={<Switch
                        name="isActive"
                        onChange={(e,checked)=>formik.setFieldValue("isActive",checked)}
                        defaultChecked={formik.values.isActive} color="success"/>}
                        label="حساب فعال"
                        ></FormControlLabel>
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
            </Box>}
        </CCard>

    )
}
const employeeModel = {
    id: "",
    name: "",
    fatherName: "",
    phone: "",
    countryId: "",
    city: "",
    email: "",
    detailedAddress: "",
    photoFile: "",
    isActive:true,
    photo:""
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام شما ضروری میباشد"),
    fatherName: Yup.string().required("ولد شما ضروری میباشد"),
    detailedAddress: Yup.string().required("جزییات آدرس شما ضروری میباشد"),
    phone: Yup.string().required("شماره تماس شما ضروری میباشد"),
    countryId: Yup.string().required("انتخاب کشور شما ضروری میباشد"),
    city: Yup.string().required("شهر شما ضروری میباشد"),
    email: Yup.string().email("ایمیل نادرست").typeError("ایمیل ادرس درست نمیباشد"),

});