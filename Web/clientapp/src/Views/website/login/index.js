import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from 'react'
import Util from '../../../helpers/Util'
import {PasswordField } from "../../../ui-componets";
import logoSm from '../../../assets/images/logoSm.png'
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth.jsx";
import { LoadingButton } from "@mui/lab";
import { HomeOutlined } from "@mui/icons-material";
import { axiosApi } from "../../../axios";

const loginModel = {
  userName: "",
  password: "",
  rememberMe:false
};
const validationSchema = Yup.object().shape({
  userName: Yup.string().required("نام کاربری ضروری میباشد"),
  password: Yup.string().required("رمز عبور ضروری میباشد")
});
export default function VLogin() {
  const { login, isAuthenticated ,getRelatedLayoutPath} = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: loginModel,
    onSubmit: async (values, formikHelper) => {
      try {
        const { token } = await axiosApi.post(
          "customerAuth/signIn",
          Util.ObjectToFormData(values)
        );
        if (token) {
          await login(token, values.rememberMe);
          navigate(getRelatedLayoutPath())
        }
      } catch (errors) {
        formikHelper.setErrors(errors);
      }
      return false;
    }
  });
  if (isAuthenticated) {
    return <Navigate to={getRelatedLayoutPath()}/>
  }
  return (
    <Container component="main" maxWidth="xs" sx={{ py:4 }}>
      <Card>
        <CardHeader
           action={
            <IconButton onClick={() => navigate('/')}>
                <HomeOutlined/>
            </IconButton>
        }
        />
        <CardContent>
          <Stack direction="column" spacing={3} alignItems="center">
            <Link to='/'>
              <Box component="img" src={logoSm}/>
            </Link>
            <Typography variant="h6" fontWeight={600} color="secondary">
            ورود صراف
            </Typography>
            <Typography variant="body1" color="secondary">
              اطلاعات حساب کاربری خود را وارد نمایید
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    variant="outlined"
                    name="userName"
                    label="نام کاربری"
                    required
                    helperText={formik.errors.userName}
                    onChange={formik.handleChange}
                    error={formik.errors.userName ? true : false}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <PasswordField
                    variant="outlined"
                    name="password"
                    label="رمز عبور"
                    required
                    helperText={formik.errors.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password ? true : false}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="primary"  onClick={(e)=>formik.setFieldValue("rememberMe",e.target.checked)}/>}
                    label="مرا به خاطر بسپار"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <LoadingButton
                    loading={formik.isSubmitting}
                    loadingPosition="start"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<LoginIcon />}
                    type="submit"
                  >
                    ورود
                  </LoadingButton>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Button
                    variant="text"
                    fullWidth
                    type="button"
                    onClick={() => navigate('/signup')}
                  >
                    حساب جدید
                  </Button>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} display="flex" textAlign="right">
                  <Link to="#">رمز عبور خود را فراموش کرده اید؟</Link>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
