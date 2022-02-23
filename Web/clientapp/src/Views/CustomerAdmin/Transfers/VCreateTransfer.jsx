import { AskDialog, CCard, CSelect, SearchFriendDropdown, SubCustomersDropdown } from '../../../ui-componets'
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import { Grid, Box, TextField, Stack, Typography, Divider, Alert, Grow, IconButton } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import authAxiosApi from '../../../axios';
import { LoadingButton } from '@mui/lab';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Util from '../../../helpers/Util'
import { useNavigate } from 'react-router';
import { FieldSet, RatesDropdown, SubCustomerAccountRatesSelect } from '../../../ui-componets'
import { ArrowBack } from '@mui/icons-material';
const createModel = {
    fromName: "",
    fromLastName: "",
    fromFatherName: "",
    fromPhone: "",
    toName: "",
    toLastName: "",
    toFatherName: "",
    toGrandFatherName: "",
    fCurrency: undefined,
    tCurrency:undefined,
    amount: "",
    friendId: undefined,
    fee: 0,
    receiverFee: 0,
}
const validationSchema = Yup.object().shape({
    fromName: Yup.string().required("نام ارسال کنننده ضروری میباشد"),
    fromFatherName: Yup.string().required("ولد ارسال کننده ضروری میباشد"),
    fromPhone: Yup.string().required("شماره تماس ارسال کننده ضروری میباشد"),
    toName: Yup.string().required("نام دریافت کننده ضروری میباشد"),
    toFatherName: Yup.string().required("ولد دریافت کننده ضروری میباشد"),
    fCurrency: Yup.string().required("انتخاب ارز ضروری میباشد"),
    tCurrency: Yup.string().required("انتخاب ارز دریافت کننده ضروری میباشد"),
    amount: Yup.string().required("مقدار پول ارسالی ضروری میباشد"),
    friendId: Yup.string().required("انتخاب همکار شما ضروری میباشد"),
    fee: Yup.number().min(0, "کمتر از 0 مجاز نیست"),
    receiverFee: Yup.number().min(0, "کمتر از 0 مجاز نیست"),   
});

export default function VCreateTransfer() {
    const [sourceRate, setSourceRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
    const [transferCode, setTransferCode] = React.useState(0)
    const [exchangeRate, setExchangeRate] = React.useState(null)
    const [receivedAmount, setReceivedAmount] = React.useState(0)
    const [askOpen, setAskOpen] = React.useState(false)
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
        setReceivedAmount(exchangeRate ? (Number(exchangeRate.toExchangeRate) / Number(exchangeRate.fromAmount) * Number(event.target.value)).toFixed(2) : 0)
    }
    React.useEffect(() => {
        (async () => {
            try {
                await authAxiosApi.get('customer/rates/exchangeRate', {
                    params: {
                        from: formik.values.accountType==="1"?sourceRate.ratesCountryId:sourceRate.id,
                        to: distRate.id
                    }
                }).then(r => {
                    setExchangeRate(r)
                })
                setTransferCode(Util.GenerateRandom(50, 5000))

            } catch {

            }
        })()
        return () => setExchangeRate(null)
    }, [sourceRate, distRate])
  

    return (
        // loading ? <SkeletonFull /> :
            <CCard
                title="فورم ثبت حواله جدید"
                headerIcon={<SyncAltOutlinedIcon />}
                enableActions={true}
                actions={<IconButton onClick={() => navigate("/customer/transfers")}>
                    <ArrowBack />
                </IconButton>}>
                {exchangeRate && !exchangeRate.updated ?
                    <AskDialog
                        open={askOpen}
                        message="نرخ تبادل ارز آپدیت نمیباشد"
                        onNo={() => setAskOpen(false)}
                        onYes={() => formik.submitForm()} />
                    : ""}
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
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    size="small"
                                    name='fromFatherName'
                                    label="ولد ارسال کننده"
                                    required
                                    type="text"
                                    error={formik.errors.fromFatherName ? true : false}
                                    helperText={formik.errors.fromFatherName}
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
                                    size="small"
                                    type="text"
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name='toFatherName'
                                    label="ولد دریافت کننده"
                                    required
                                    size="small"
                                    type="text"
                                    error={formik.errors.toFatherName ? true : false}
                                    helperText={formik.errors.toFatherName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name='toGrandFatherName'
                                    label="ولدیت دریافت کننده"
                                    size="small"
                                    type="text"
                                    onChange={formik.handleChange}
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
                                <TextField
                                    name='receiverFee'
                                    label="کمیشن حواله دار"
                                    size="small"
                                    type="number"

                                    defaultValue={formik.values.receiverFee}

                                    onChange={formik.handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <Stack direction="row">
                                                <Divider orientation='vertical' flexItem ></Divider>
                                                <Typography sx={{ ml: 1 }} variant="body1" >{distRate ? distRate.priceName : "هیچ"}</Typography>
                                            </Stack>
                                        )
                                    }}
                                />
                                <TextField
                                    name='receiverFee'
                                    label="مجموع پول طلب :"
                                    size="small"
                                    type="number"
                                    value={Number(formik.values.receiverFee) + Number(receivedAmount)}
                                    InputProps={{
                                        endAdornment: (
                                            <Stack direction="row">
                                                <Divider orientation='vertical' flexItem ></Divider>
                                                <Typography sx={{ ml: 1 }} variant="body1" >{distRate ? distRate.priceName : "هیچ"}</Typography>
                                            </Stack>
                                        )
                                    }}
                                />
                            </FieldSet>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FieldSet label="معلومات ارز">
                                {formik.values.accountType === "1" ?
                                     <SubCustomerAccountRatesSelect
                                     subCustomerId={formik.values.subCustomerAccountId}
                                      name='fCurrency'
                                      helperText={formik.errors.fCurrency}
                                      size='small'
                                      label='حساب ارز'
                                      value={formik.values.fCurrency}
                                      type='text'
                                      required
                                      error={formik.errors.fCurrency ? true : false}
                                      onValueChange={(v)=>{
                                         formik.setFieldValue("fCurrency",v?v.ratesCountryId:undefined)
                                         setSourceRate(v)
                                      }}
                                     />
                                    : <RatesDropdown
                                        error={formik.errors.fCurrency ? true : false}
                                        helperText={formik.errors.fCurrency}
                                        label="واحد پول ارسالی"
                                        name="fCurrency"
                                        required
                                        size="small"
                                        onValueChange={(newValue) => handleSourceChange(newValue)}
                                    />}

                                <RatesDropdown
                                    error={formik.errors.tCurrency ? true : false}
                                    helperText={formik.errors.tCurrency}
                                    label="واحد پول دریافتی"
                                    name="tCurrency"
                                    required
                                    size="small"
                                    onValueChange={(newValue) => handleDistChange(newValue)}
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
                                    value={receivedAmount}
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


                                {exchangeRate && !exchangeRate.updated &&
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
                                    size="small"
                                    type="number"
                                    value={formik.values.fee}
                                    onChange={(e) => formik.setFieldValue("fee", e.target.value ? e.target.value : 0)}
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
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FieldSet label="معلومات حواله" className="bgWave">
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="body1" fontWeight={900}>نمبر حواله :</Typography>
                                    <Typography variant="h4">{transferCode}</Typography>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="body1" fontWeight={900}>مجموع پول دریافتی از مشتری :</Typography>
                                    <Typography variant="h4">{`${exchangeRate ? Number(Number(formik.values.amount) + Number(formik.values.fee)).toFixed(2) : 0} ${sourceRate ? sourceRate.priceName : "هیچ"}`}
                                    </Typography>

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
                                onClick={() => {
                                    if (exchangeRate && !exchangeRate.updated) {
                                        formik.isValid && setAskOpen(true)
                                    } else {
                                        formik.submitForm()
                                    }
                                }}
                            >
                                تایید
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </CCard>
    )
}