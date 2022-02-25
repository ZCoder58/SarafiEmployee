import React from 'react'
import { Checkbox, FormControlLabel, Grid, Stack, TextField } from '@mui/material'
import { PasswordFieldWithMeter } from '../../../ui-componets'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { LoadingButton } from '@mui/lab'
import { CheckOutlined } from '@mui/icons-material'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
const initialModel = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: ""
}
const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("رمز عبور فعلی ضروری میباشد"),
    newPassword: Yup.string().required("رمز عبور جدید ضروری میباشد"),
    repeatPassword: Yup.string()
        .required('تکرار رمز عبور ضروری میباشد')
        .test('validateRepeatPassword', 'رمز عبور یکسان نیست', (value, context) => {
            return context.parent.newPassword === value;
        })
});
export default function EProfileChangePassword() {
    const [showPassword,setShowPassword] = React.useState(false)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {            
            try{
                await authAxiosApi.put('customer/profile/changePassword',Util.ObjectToFormData(values)).then(()=>{
                    formikHelper.resetForm()
                })

            }catch(errors){
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    return (
        <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={8} xs={12}>
                <Stack direction="column" component="form" onSubmit={formik.handleSubmit} spacing={2}>
                <TextField
                    variant='outlined'
                    name='currentPassword'
                    helperText={formik.errors.currentPassword}
                    value={formik.values.currentPassword}
                    size='small'
                    label='رمز عبور فعلی'
                    type={showPassword?`text`:"password"}
                    required
                    error={formik.errors.currentPassword ? true : false}
                    onChange={formik.handleChange}
                />
                 <PasswordFieldWithMeter
                    label="رمز عبور جدید"
                    value={formik.values.newPassword}
                    name='newPassword'
                    helperText={formik.errors.newPassword}
                    size='small'
                    type={showPassword?`text`:"password"}
                    required
                    error={formik.errors.newPassword ? true : false}
                    onChange={formik.handleChange}
                />
                 <PasswordFieldWithMeter
                    label="تکرار رمز عبرو جدید"
                    value={formik.values.repeatPassword}
                    name='repeatPassword'
                    helperText={formik.errors.repeatPassword}
                    size='small'
                    type={showPassword?`text`:"password"}
                    required
                    error={formik.errors.repeatPassword ? true : false}
                    onChange={formik.handleChange}
                />
                <FormControlLabel 
                control={<Checkbox onChange={(e)=>setShowPassword(!showPassword)}/>} 
                label="نمایش رمز عبور"/>
                <LoadingButton
                size='small'
                loading={formik.isSubmitting}
                startIcon={<CheckOutlined/>}
                type="submit"
                variant="contained"
                >
                    ذخیره
                </LoadingButton>
                </Stack>
            </Grid>
        </Grid>
    )
}