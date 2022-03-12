import { CheckCircleOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Box, InputAdornment, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router';
import * as Yup from 'yup'
import authAxiosApi from '../../../../axios';
import Util from '../../../../helpers/Util';
import { RatesDropdown, SkeletonFull, CurrencyInput, ExchangeRateAlert } from '../../../../ui-componets';
const initialModel = {
    id: "",
    amount: 0,
    toRateCountryId: undefined,
    ratesCountryId: undefined,
    exchangeType: "buy"
}
const validationSchema = Yup.object().shape({
    toRateCountryId: Yup.string().required("انتخاب ارز حساب ضروری میباشد")
});
export default function EditSubCustomerAccountRateForm({ subCustomerAcccountRateId, onSubmit }) {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)
    const [sourceRate, setSourceRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
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
        loading ? <SkeletonFull /> :
            <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                <CurrencyInput
                    variant='outlined'
                    helperText={formik.errors.amount}
                    value={formik.values.amount}
                    label='مقدار پول در حساب'
                    InputProps={{
                        readOnly: true,
                        endAdornment: <InputAdornment position='end'>
                            {sourceRate ? sourceRate.priceName : "هیچ"}
                        </InputAdornment>
                    }}
                />
                <Accordion sx={{
                    my: 2
                }}>
                    <AccordionSummary>تغیر نوع ارز حساب</AccordionSummary>
                    <AccordionDetails>
                        <Alert severity='warning'>
                            <AlertTitle>اخطار !</AlertTitle>
                            <Typography>با تغیر نوع ارز حساب تمامی پول موجود در حساب مشتری به ارز جدید تبدیل خواهد شد.</Typography>
                        </Alert>
                        <RatesDropdown
                            name='ratesCountryId'
                            defaultId={formik.values.ratesCountryId}
                            size='small'
                            label="ارز حساب"
                            disabled
                            disableClearable
                            onValueChange={(v) => {
                                formik.setFieldValue("ratesCountryId", v ? v.id : "")
                                setSourceRate(v)
                            }}
                        />
                        <RatesDropdown
                            name='toRateCountryId'
                            helperText={formik.errors.toRateCountryId}
                            defaultId={formik.values.toRateCountryId}
                            size='small'
                            label="به ارز حساب"
                            required
                            error={formik.errors.toRateCountryId ? true : false}
                            onValueChange={(v) => {
                                formik.setFieldValue("toRateCountryId", v ? v.id : "")
                                setDistRate(v)
                            }}
                        />
                        <ExchangeRateAlert
                            amount={formik.values.amount}
                            sourceRate={sourceRate}
                            distRate={distRate}
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