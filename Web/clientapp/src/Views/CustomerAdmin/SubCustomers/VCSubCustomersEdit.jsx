import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Box, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CCard, RatesDropdown, SkeletonFull } from '../../../ui-componets'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { LoadingButton } from '@mui/lab';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import authAxiosApi from '../../../axios';
import Util from '../../../helpers/Util'
import { useNavigate, useParams } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const initialModel = {
    id: "",
    name: "",
    lastName: "",
    fatherName: "",
    phone: "",
    address: "",
    sId: "",
    ratesCountryId: ""
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required('نام ضروری میباشد'),
    fatherName: Yup.string().required('نام پدر ضروری میباشد'),
    phone: Yup.string().required('شماره تماس ضروری میباشد'),
    sId: Yup.string().required('شماره تذکره ضروری میباشد'),
    address: Yup.string().required('آدرس مشتری ضروری میباشد'),
    ratesCountryId: Yup.string().required('انتخاب نوع ارز ضروری میباشد')
});
export default function VCSubCustomersEdit() {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)
    const { subCustomerId } = useParams()
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            await authAxiosApi.put('subCustomers', Util.ObjectToFormData(values))
                .then(r => {
                    navigate('/customer/subCustomers')
                }).catch(errors => formik.setErrors(errors))
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('subCustomers/edit/' + subCustomerId).then(r => {
                formik.setValues(r)
            }).catch(error => {
                navigate('/requestDenied')
            })
            setLoading(false)
        })()
    }, [subCustomerId])
    return (
        <CCard
            title="فورم ویرایش حساب مشتری"
            headerIcon={<PersonAddAltOutlinedIcon />}
            enableActions
            actions={<IconButton onClick={() => navigate('/customer/subCustomers')}><ArrowBack /></IconButton>}

        >
            {loading ? <SkeletonFull /> :
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
                                value={formik.values.name}
                                required
                                error={formik.errors.name ? true : false}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                variant='outlined'
                                name='lastName'
                                size='small'
                                value={formik.values.lastName}
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
                                value={formik.values.fatherName}
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
                                value={formik.values.phone}
                                error={formik.errors.phone ? true : false}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                variant='outlined'
                                name='sId'
                                helperText={formik.errors.sId}
                                size='small'
                                value={formik.values.sId}
                                label='نمبر تذکره'
                                type='text'
                                required
                                error={formik.errors.sId ? true : false}
                                onChange={formik.handleChange}
                            />
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="ratesCountryId-content"
                                    id="ratesCountryId-header"
                                >
                                    <Typography>تغیر نوع ارز حساب</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack direction="column" spacing={2}>
                                        <Alert severity="warning" variant='outlined'>
                                            <AlertTitle>
                                                اخطار!
                                            </AlertTitle>
                                            <Typography>لطفا توجه داشته باشید که با تغیر نوع ارز مقدار پول موجود در حساب مشتری به ارز جدید تبدیل خواهد شد.</Typography>
                                        </Alert>
                                        <RatesDropdown
                                            defaultId={formik.values.ratesCountryId}
                                            name='ratesCountryId'
                                            helperText={formik.errors.ratesCountryId}
                                            size='small'
                                            label='نوع ارز حساب'
                                            type='text'
                                            required
                                            error={formik.errors.ratesCountryId ? true : false}
                                            onValueChange={(newRate) => {
                                                formik.setFieldValue("ratesCountryId", newRate ? newRate.id : "")
                                            }}
                                        />
                                    </Stack>
                                </AccordionDetails>

                            </Accordion>
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
                                value={formik.values.address}
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
                </Box>}
        </CCard>
    )
}
