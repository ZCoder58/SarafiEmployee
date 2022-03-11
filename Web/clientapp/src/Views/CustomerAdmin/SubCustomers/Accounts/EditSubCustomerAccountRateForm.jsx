import { CheckCircleOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Box, InputAdornment, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router';
import * as Yup from 'yup'
import authAxiosApi from '../../../../axios';
import Util from '../../../../helpers/Util';
import { RatesDropdown, SkeletonFull } from '../../../../ui-componets';
const initialModel = {
    id: "",
    subCustomerAccountId: "",
    // amount: 0,
    ratesCountryId: ""
}
const validationSchema = Yup.object().shape({
    // amount: Yup.number().required("مقدار پول اولیه حساب ضروری میباشد"),
    ratesCountryId: Yup.string().required("انتخاب ارز حساب ضروری میباشد")
});
export default function EditSubCustomerAccountRateForm({ subCustomerAcccountRateId, onSubmit }) {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)
    const [countryRate, setCountryRate] = React.useState(null)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            const formData = Util.ObjectToFormData(values)
            formData.set("id", subCustomerAcccountRateId)
            await authAxiosApi.put('subCustomers/accounts', formData).then(r => {
                onSubmit(r)
            }).catch(errors => {
                formikHelper.setErrors(errors)
            })
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('subCustomers/accounts/edit', {
                params: {
                    id: subCustomerAcccountRateId
                }
            }).then(r => {
                formik.setValues(r)
            }).catch(error => navigate('/requestDenied'))
            setLoading(false)
        })()
    }, [subCustomerAcccountRateId])
    return (
        loading?<SkeletonFull/>:
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            {/* <TextField
                variant='outlined'
                name='amount'
                helperText={formik.errors.amount}
                value={formik.values.amount}
                size='small'
                label='مقدار پول در حساب'
                type='text'
                required
                error={formik.errors.amount ? true : false}
                onChange={formik.handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>
                        {countryRate ? countryRate.priceName : "هیچ"}
                    </InputAdornment>
                }}
            /> */}
            <Accordion sx={{ 
                my:2
             }}>
                <AccordionSummary>تغیر نوع ارز حساب</AccordionSummary>
                <AccordionDetails>
                    <Alert severity='warning'>
                        <AlertTitle>اخطار !</AlertTitle>
                        <Typography>با تغیر نوع ارز حساب تمامی پول موجود در حساب مشتری به ارز جدید تبدیل خواهد شد.</Typography>
                    </Alert>
                    <RatesDropdown
                        name='ratesCountryId'
                        helperText={formik.errors.ratesCountryId}
                        defaultId={formik.values.ratesCountryId}
                        size='small'
                        label="ارز حساب"
                        required
                        error={formik.errors.ratesCountryId ? true : false}
                        onValueChange={(v) => {
                            formik.setFieldValue("ratesCountryId", v ? v.id : "")
                            setCountryRate(v)
                        }}
                    />
                </AccordionDetails>
            </Accordion>
            <LoadingButton
                loading={formik.isSubmitting}
                loadingPosition='start'
                variant='contained'
                color='primary'
                size='small'
                startIcon={<CheckCircleOutline />}
                type='submit'
            >
                ذخیره
            </LoadingButton>
        </Box>
    )
}