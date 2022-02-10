import * as Yup from "yup";
import { useFormik } from "formik";
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router';
import signupImg from '../../../assets/images/process1.png';
import React from 'react';
import { Button, Grid, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { SignupContext } from './index';
import { PasswordField } from "../../../ui-componets";
export default function SignUpFormUser() {
    const navigate = useNavigate()
    const theme = useTheme()
    const { signupModel, CreateUser } = React.useContext(SignupContext)
    const screenMachedDownMd = useMediaQuery(theme.breakpoints.down("md"))
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: signupModel,
        onSubmit: async (values, formikHelper) => {
            try {
                await CreateUser(values)
            } catch (e) {
                formikHelper.setErrors(e)
            }
            return false
        }
    })
    return (
        <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="column" spacing={3}>
                <Typography variant="h5"> حساب کاربری خود را بسازید</Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField
                                variant="outlined"
                                name="name"
                                label="نام"
                                required
                                size="small"
                                helperText={formik.errors.name}
                                onChange={formik.handleChange}
                                error={formik.errors.name ? true : false}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField
                                variant="outlined"
                                name="lastName"
                                size="small"
                                label="تخلص"
                                required
                                helperText={formik.errors.lastName}
                                onChange={formik.handleChange}
                                error={formik.errors.lastName ? true : false}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                name="email"
                                size="small"
                                required
                                label="ایمیل آدرس"
                                helperText={formik.errors.email}
                                onChange={formik.handleChange}
                                error={formik.errors.email ? true : false}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField
                                variant="outlined"
                                size="small"
                                name="phone"
                                label="شماره تماس"
                                helperText={formik.errors.phone}
                                onChange={formik.handleChange}
                                error={formik.errors.phone ? true : false}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <TextField
                                variant="outlined"
                                name="companyName"
                                label="نام شرکت"
                                size="small"
                                required
                                helperText={formik.errors.companyName}
                                onChange={formik.handleChange}
                                error={formik.errors.companyName ? true : false}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                variant="outlined"
                                name="userName"
                                label="نام کاربری"
                                size="small"
                                required
                                helperText={formik.errors.userName}
                                onChange={formik.handleChange}
                                error={formik.errors.userName ? true : false}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
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
                        <Grid item lg={6} md={6} sm={6} xs={12}>
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
                        <Grid item lg={12} display="flex" justifyContent="space-between">
                            <LoadingButton
                                loading={formik.isSubmitting}
                                loadingPosition="start"
                                variant="contained"
                                color="primary"
                                startIcon={<CheckIcon />}
                                type="submit"
                            >
                               تایید 
                            </LoadingButton>
                            <Button
                                type="button"
                                onClick={() => navigate('/login')}
                            >
                                ورود به حساب کاربری
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            {!screenMachedDownMd && <Box component="img" p={6} src={signupImg}></Box>}
        </Stack>
    )
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام شما ضروری میباشد"),
    lastName: Yup.string().required("تخلص شما ضروری میباشد"),
    email: Yup.string().email("ایمیل نادرست").required("ایمیل ادرس شما ضروری میباشد"),
    companyName: Yup.string().required("نام شرکت شما ضروری میباشد"),
    userName: Yup.string().required("نام کاربری شما ضروری میباشد"),
    password: Yup.string().required("رمز عبور شما ضروری میباشد"),
    repeatPassword: Yup.string()
        .required("تکرار رمز عبور ضروری میباشد")
        .test("validateRepeatPassword", "رمز عبور یکسان نیست", (value, context) => {
            return context.parent.password === value;
        })
});