import { AutoComplete, CCard, SearchFriendDropdown, SkeletonFull } from '../../../ui-componets'
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import { Grid, Box, TextField, Stack, Typography, Divider, Alert, Slide, Grow } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import CountriesRatesStatics from '../../../helpers/statics/CountriesRatesStatic';
import authAxiosApi from '../../../axios';
import { LoadingButton } from '@mui/lab';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Util from '../../../helpers/Util'
import { useNavigate } from 'react-router';
import { FieldSet } from '../../../ui-componets'
const createModel = {
    fromName: "",
    fromLastName: "",
    fromPhone: "",
    toName: "",
    toLastName: "",
    fCurrency: "",
    tCurrency: "",
    amount: "",
    friendId: "",
    fee: 0
}
const validationSchema = Yup.object().shape({
    fromName: Yup.string().required("نام ارسال کنننده ضروری میباشد"),
    fromLastName: Yup.string().required("تخلص ارسال کننده ضروری میباشد"),
    fromPhone: Yup.string().required("شماره تماس ارسال کننده ضروری میباشد"),
    toName: Yup.string().required("نام دریافت کننده ضروری میباشد"),
    toLastName: Yup.string().required("تخلص دریافت کننده ضروری میباشد"),
    fCurrency: Yup.string().required("انتخاب ارز ضروری میباشد"),
    tCurrency: Yup.string().required("انتخاب ارز دریافت کننده ضروری میباشد"),
    amount: Yup.string().required("مقدار پول ارسالی ضروری میباشد"),
    friendId: Yup.string().required("انتخاب همکار شما ضروری میباشد")
});
export default function VCreateTransfer() {
    const [loading, setLoading] = React.useState(true)
    const [countriesRates, setCountriesRates] = React.useState([])
    const [sourceRate, setSourceRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
    const [transferCode, setTransferCode] = React.useState(0)
    const [exchangeRate, setExchangeRate] = React.useState(null)
    const navigate = useNavigate()
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: createModel,
        onSubmit: async (values, formikHelper) => {
            const formData = Util.ObjectToFormData(values)
            formData.append("codeNumber", transferCode)
            try {
                await authAxiosApi.post('customer/transfers', formData)
                navigate('/customer/transfers')
            } catch (errors) {
                formikHelper.setErrors(errors)
            }

            return false
        }
    })
    const handleSourceChange = (newSourceValue) => {
        formik.setFieldValue("fCurrency", newSourceValue ? newSourceValue.id : "")
        setSourceRate(s => s = newSourceValue)
    }
    const handleDistChange = (newDistValue) => {
        formik.setFieldValue("tCurrency", newDistValue ? newDistValue.id : "")
        setDistRate(s => s = newDistValue)
    }
    const handleAmountChange = (event) => {
        formik.handleChange(event)
    }
    React.useMemo(async () => {
        try {
            await authAxiosApi.get('customer/rates/exchangeRate', {
                params: {
                    from: sourceRate.abbr,
                    to: distRate.abbr
                }
            }).then(r => {
                setExchangeRate(r)
            })
        } catch {

        }
    }, [sourceRate, distRate])
    React.useEffect(() => {
        (async () => {
            await authAxiosApi.get('customer/rates').then(r => {
                setCountriesRates(r)
            })
            setTransferCode(Util.GenerateRandom(50, 5000))
            setLoading(false)
        })()
        return () => setCountriesRates([])
    }, [])
    return (
        loading ? <SkeletonFull /> :
            <CCard
                title="فورم ثبت حواله جدید"
                headerIcon={<SyncAltOutlinedIcon />}>
                <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FieldSet label="معلومات ارسال کننده">
                                <TextField
                                    size="small"
                                    name='fromName'
                                    label="نام ارسال کننده"
                                    required
                                    type="text"
                                    error={formik.errors.fromName ? true : false}
                                    helperText={formik.errors.fromName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    size="small"
                                    name='fromLastName'
                                    label="تخلص ارسال کننده"
                                    required
                                    type="text"
                                    error={formik.errors.fromLastName ? true : false}
                                    helperText={formik.errors.fromLastName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name='fromPhone'
                                    size="small"
                                    label="شماره تماس ارسال کننده"
                                    required
                                    type="text"
                                    error={formik.errors.fromPhone ? true : false}
                                    helperText={formik.errors.fromPhone}
                                    onChange={formik.handleChange}
                                />
                            </FieldSet>


                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FieldSet label="معلومات دریافت کننده">
                                <TextField
                                    name='toName'
                                    label="نام دریافت کننده"
                                    required
                                    size="small"
                                    type="text"
                                    error={formik.errors.toName ? true : false}
                                    helperText={formik.errors.toName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name='toLastName'
                                    label="تخلص دریافت کننده"
                                    required
                                    size="small"
                                    type="text"
                                    error={formik.errors.toLastName ? true : false}
                                    helperText={formik.errors.toLastName}
                                    onChange={formik.handleChange}
                                />

                            </FieldSet>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FieldSet label="معلومات ارز">
                                <AutoComplete
                                    loading={loading}
                                    size="small"
                                    disableClearable
                                    error={formik.errors.fCurrency ? true : false}
                                    helperText={formik.errors.fCurrency}
                                    data={countriesRates}
                                    label="واحد پول ارسالی"
                                    name="fCurrency"
                                    required
                                    onChange={(newValue) => handleSourceChange(newValue)}
                                    getOptionLabel={(option) => `${option.faName} (${option.priceName})`}
                                    renderOption={(option, selected) => {
                                        return (
                                            <Stack direction="row" spacing={1} justifyContent="space-between" width="100%">
                                                <Typography variant="caption">{option.faName} ({option.priceName})</Typography>
                                                <img width="20px" height="20px" alt="" src={CountriesRatesStatics.flagPath(option.flagPhoto)} />
                                            </Stack>
                                        )
                                    }}
                                />
                                <AutoComplete
                                    loading={loading}
                                    size="small"
                                    disableClearable
                                    error={formik.errors.tCurrency ? true : false}
                                    helperText={formik.errors.tCurrency}
                                    data={countriesRates}
                                    label="واحد پول دریافتی"
                                    name="tCurrency"
                                    required
                                    onChange={(newValue) => handleDistChange(newValue)}
                                    getOptionLabel={(option) => `${option.faName} (${option.priceName})`}
                                    renderOption={(option, selected) => {
                                        return (
                                            <Stack direction="row" spacing={1} justifyContent="space-between" width="100%">
                                                <Typography variant="caption">{option.faName} ({option.priceName})</Typography>
                                                <img width="20px" height="20px" alt="" src={CountriesRatesStatics.flagPath(option.flagPhoto)} />
                                            </Stack>
                                        )
                                    }}
                                />
                                <TextField
                                    name='amount'
                                    label="مقدار پول ارسالی"
                                    required
                                    size="small"
                                    type="number"
                                    error={formik.errors.amount ? true : false}
                                    helperText={formik.errors.amount}
                                    onChange={(e) => handleAmountChange(e)}
                                    InputProps={{
                                        endAdornment: (
                                            <Stack direction="row">
                                                <Divider orientation='vertical' flexItem ></Divider>
                                                <Typography sx={{ ml: 1 }} variant="body1" >{sourceRate ? sourceRate.priceName : "هیچ"}</Typography>
                                            </Stack>
                                        )
                                    }}
                                />
                                <TextField
                                    label="مقدار پول دریافتی"
                                    required
                                    size="small"
                                    value={exchangeRate ? (exchangeRate.toExchangeRate / exchangeRate.fromAmount) * formik.values.amount : 0}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <Stack direction="row">
                                                <Divider orientation='vertical' flexItem ></Divider>
                                                <Typography sx={{ ml: 1 }} variant="body1" >{distRate ? distRate.priceName : "هیچ"}</Typography>
                                            </Stack>
                                        )
                                    }}
                                />


                                {exchangeRate &&!exchangeRate.updated && 
                                <Grow in={!exchangeRate.updated}>
                                        <Alert variant='outlined' severity="warning">
                                            <Stack direction="column">
                                                <Box>نرخ {exchangeRate.fromAmount} {sourceRate.priceName} </Box>
                                                <Box>معادل {exchangeRate.toExchangeRate} {distRate.priceName}</Box>
                                                <Box>نرخ ارز آپدیت نمیباشد!</Box>
                                            </Stack>
                                        </Alert>
                                    </Grow>}
                                {exchangeRate && exchangeRate.updated &&
                                 <Grow in={exchangeRate.updated}>
                                    <Alert variant='outlined' severity="success">
                                        <Stack direction="column">
                                            <Box>نرخ {exchangeRate.fromAmount} {sourceRate.priceName} </Box>
                                            <Box>معادل {exchangeRate.toExchangeRate} {distRate.priceName}</Box>
                                            <Box sx={{ fontWeight: 900 }}>نرخ ارز آپدیت است</Box>
                                        </Stack>
                                    </Alert>
                                </Grow>
                                }


                                <TextField
                                    name='fee'
                                    label="کمیشن"
                                    required
                                    size="small"
                                    type="number"
                                    error={formik.errors.fee ? true : false}
                                    helperText={formik.errors.fee}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <Stack direction="row">
                                                <Divider orientation='vertical' flexItem ></Divider>
                                                <Typography sx={{ ml: 1 }} variant="body1" >{sourceRate ? sourceRate.priceName : "هیچ"}</Typography>
                                            </Stack>
                                        )
                                    }}
                                />
                            </FieldSet>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FieldSet label="معلومات حواله دار">
                                <SearchFriendDropdown
                                    name="friendId"
                                    size="small"
                                    error={formik.errors.friendId ? true : false}
                                    helperText={formik.errors.friendId}
                                    onValueChange={(newValue) => formik.setFieldValue("friendId", newValue ? newValue.id : "")}
                                    required
                                />
                            </FieldSet>

                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FieldSet label="معلومات حواله" className="bgWave">
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="body1" fontWeight={900}>نمبر حواله :</Typography>
                                    <Typography variant="h4">{transferCode}</Typography>
                                </Stack>
                            </FieldSet>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <LoadingButton
                                loading={formik.isSubmitting}
                                loadingPosition='start'
                                variant='contained'
                                color='primary'
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