import * as Yup from "yup";
import { useFormik } from "formik";
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router';
import signupImg from '../../../assets/images/process1.png';
import React from 'react';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import { Button, Card, CardContent, CardHeader, Container, Grid, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CountriesDropDown, LinkButton, PasswordField } from "../../../ui-componets";
import { HomeOutlined } from "@mui/icons-material";
import { axiosApi } from "../../../axios";
import Util from '../../../helpers/Util'
export default function CompanySignup() {
    const navigate = useNavigate()
    const theme = useTheme()
    const screenMachedDownMd = useMediaQuery(theme.breakpoints.down("md"))
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: signUpModel,
        onSubmit: async (values, formikHelper) => {
            try {
                await axiosApi.post('customerAuth/companySignUp', Util.ObjectToFormData(values))
                navigate("/signUpDone")
            } catch (e) {
                formikHelper.setErrors(e)
            }
            return false
        }
    })
    return (
        <Container component="main" maxWidth="md" sx={{
            py: 5
        }}>
            <Card>
                <CardHeader/>
                <CardContent>
                    <Stack p={3} spacing={2} direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h5">به زودی . . . </Typography>
                        <Typography >این بخش در حال کار است</Typography>
                        <LinkButton text="صفحه اصلی" link="/"/>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
        // <Container component="main" maxWidth="md" sx={{
        //     py: 5
        // }}>
        //     <Card>
        //         <CardHeader
        //             title="فورم ثبت نام شرکت صرافی/حواله داری"
        //             avatar={
        //                 <ContactPageOutlinedIcon />
        //             }
        //             action={
        //                 <IconButton onClick={() => navigate('/')}>
        //                     <HomeOutlined />
        //                 </IconButton>
        //             }
        //         />
        //         <CardContent>
        //             <Stack direction="row" spacing={3} alignItems="center">
        //                 <Stack direction="column" spacing={3}>
        //                     <Typography variant="h5"> حساب کاربری خود را بسازید</Typography>
        //                     <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        //                         <Grid container spacing={3}>
        //                             <Grid container item lg={6} md={6} sm={12} xs={12} spacing={3}>
        //                             <Grid item lg={6} md={6} sm={6} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     name="name"
        //                                     label="نام"
        //                                     required
        //                                     size="small"
        //                                     helperText={formik.errors.name}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.name ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={6} md={6} sm={6} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     name="lastName"
        //                                     size="small"
        //                                     label="تخلص"
        //                                     onChange={formik.handleChange}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={6} md={6} sm={6} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     name="fatherName"
        //                                     size="small"
        //                                     label="ولد"
        //                                     required
        //                                     helperText={formik.errors.fatherName}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.fatherName ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={6} md={6} sm={6} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     size="small"
        //                                     name="phone"
        //                                     label="شماره تماس"
        //                                     helperText={formik.errors.phone}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.phone ? true : false}
        //                                 />

        //                             </Grid>
        //                             <Grid item lg={12} md={12} sm={12} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     name="email"
        //                                     size="small"
        //                                     type="email"
        //                                     required
        //                                     label="ایمیل آدرس"
        //                                     helperText={formik.errors.email}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.email ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={12} md={12} sm={12} xs={12}>
        //                                 <CountriesDropDown
        //                                     name="countryId"
        //                                     size="small"
        //                                     required
        //                                     label="کشور"
        //                                     helperText={formik.errors.countryId}
        //                                     onValueChange={(v) => formik.setFieldValue("countryId", v ? v.id : undefined)}
        //                                     error={formik.errors.countryId ? true : false}
        //                                 />
        //                             </Grid>
        //                             </Grid>
        //                             <Grid container item lg={6} md={6} sm={6} xs={12}>
        //                             {!screenMachedDownMd && <Box component="img" p={6} src={signupImg}></Box>}
        //                             </Grid>
        //                         </Grid>

        //                         <Grid container spacing={3}>
        //                             <Grid item lg={6} md={6} sm={6} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     name="city"
        //                                     label="نام شهر شما"
        //                                     size="small"
        //                                     required
        //                                     helperText={formik.errors.city}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.city ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={6} md={6} sm={6} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     name="companyname"
        //                                     label="نام شرکت شما"
        //                                     size="small"
        //                                     required
        //                                     helperText={formik.errors.companyname}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.companyname ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={12} md={12} sm={12} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     name="detailedAddress"
        //                                     label="جزییات آدرس شما"
        //                                     size="small"
        //                                     multiline
        //                                     required
        //                                     rows={5}
        //                                     type="text"
        //                                     helperText={formik.errors.detailedAddress}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.detailedAddress ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={12} md={12} sm={12} xs={12}>
        //                                 <TextField
        //                                     variant="outlined"
        //                                     name="userName"
        //                                     label="نام کاربری"
        //                                     size="small"
        //                                     required
        //                                     helperText={formik.errors.userName}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.userName ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={6} md={6} sm={6} xs={12}>
        //                                 <PasswordField
        //                                     variant="outlined"
        //                                     name="password"
        //                                     label="رمز عبور"
        //                                     required
        //                                     size="small"
        //                                     helperText={formik.errors.password}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.password ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={6} md={6} sm={6} xs={12}>
        //                                 <PasswordField
        //                                     variant="outlined"
        //                                     name="repeatPassword"
        //                                     label="تکرار رمز عبور"
        //                                     required
        //                                     size="small"
        //                                     helperText={formik.errors.repeatPassword}
        //                                     onChange={formik.handleChange}
        //                                     error={formik.errors.repeatPassword ? true : false}
        //                                 />
        //                             </Grid>
        //                             <Grid item lg={12} display="flex" justifyContent="space-between">
        //                                 <LoadingButton
        //                                     loading={formik.isSubmitting}
        //                                     loadingPosition="start"
        //                                     variant="contained"
        //                                     color="primary"
        //                                     startIcon={<CheckIcon />}
        //                                     type="submit"
        //                                 >
        //                                     تایید
        //                                 </LoadingButton>
        //                                 <Button
        //                                     type="button"
        //                                     onClick={() => navigate('/login')}
        //                                 >
        //                                     ورود به حساب کاربری
        //                                 </Button>
        //                             </Grid>
        //                         </Grid>
        //                     </Box>
        //                 </Stack>

        //             </Stack>
        //         </CardContent>
        //     </Card>
        // </Container>
    )
}
const signUpModel = {
    name: "",
    fatherName: "",
    phone: "",
    countryId: "",
    city: "",
    email: "",
    userName: "",
    password: "",
    repeatPassword: "",
    detailedAddress: "",
    companyname: ""
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام شما ضروری میباشد"),
    fatherName: Yup.string().required("ولد شما ضروری میباشد"),
    companyname: Yup.string().required("نام شرکت شما ضروری میباشد"),
    detailedAddress: Yup.string().required("جزییات آدرس شما ضروری میباشد"),
    phone: Yup.string().required("شماره تماس شما ضروری میباشد"),
    countryId: Yup.string().required("انتخاب کشور شما ضروری میباشد"),
    city: Yup.string().required("شهر شما ضروری میباشد"),
    email: Yup.string().email("ایمیل نادرست").required("ایمیل ادرس شما ضروری میباشد"),
    userName: Yup.string().required("نام کاربری شما ضروری میباشد"),
    password: Yup.string().required("رمز عبور شما ضروری میباشد"),
    repeatPassword: Yup.string()
        .required("تکرار رمز عبور ضروری میباشد")
        .test("validateRepeatPassword", "رمز عبور یکسان نیست", (value, context) => {
            return context.parent.password === value;
        })
});