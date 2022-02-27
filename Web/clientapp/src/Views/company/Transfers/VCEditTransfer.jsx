import { CCard, SearchFriendDropdown, SkeletonFull, RatesDropdown, AskDialog } from '../../../ui-componets'
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
import { FieldSet } from '../../../ui-componets'
import { ArrowBack } from '@mui/icons-material';
import { useParams } from 'react-router'
const createModel = {
    id:"",
    fromName: "",
    fromLastName: "",
    fromFatherName: "",
    fromPhone: "",
    toName: "",
    toLastName: "",
    toFatherName: "",
    toGrandFatherName: "",
    fCurrency: "",
    tCurrency: "",
    amount: "",
    friendId: "",
    fee: 0,
    receiverFee: 0,
    codeNumber: "",
    comment:""
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
    friendId: Yup.string().required("انتخاب کارمند شما ضروری میباشد"),
    fee: Yup.number().min(0, "کمتر از 0 مجاز نیست"),
    receiverFee: Yup.number().min(0, "کمتر از 0 مجاز نیست")

});
export default function VCEditTransfer() {
    const [loading, setLoading] = React.useState(true)
    const [sourceRate, setSourceRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
    const [exchangeRate, setExchangeRate] = React.useState(null)
    const [askOpen,setAskOpen]=React.useState(false)
    const navigate = useNavigate()
    const { transferId } = useParams()
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: createModel,
        onSubmit: async (values, formikHelper) => {
            const formData = Util.ObjectToFormData(values)
            try {
                await authAxiosApi.put('customer/transfers/edit', formData)
                navigate('/company/transfers')
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
    const receivedAmount = React.useMemo(() => {
        return exchangeRate ? (Number(exchangeRate.toExchangeRate) / Number(exchangeRate.fromAmount) * Number(formik.values.amount)).toFixed(2) : 0
    },[exchangeRate,formik.values.amount])
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/transfers/edit?id=' + transferId).then(r => {
                formik.setValues(r)
            }).catch(errors=>{
                navigate('/requestDenied')
            })
            setLoading(false)
        })()
        
    }, [transferId])
    React.useEffect(() => {
        if (distRate && sourceRate) {
            (async () => await authAxiosApi.get('customer/rates/exchangeRate', {
                params: {
                    from: sourceRate.id,
                    to: distRate.id
                }
            }).then(r => {
                setExchangeRate(r)
            })
            )()
        }
        return ()=>setExchangeRate(null)
    }, [distRate, sourceRate])
    return (
        loading ? <SkeletonFull /> :
            <CCard
                title="فورم ثبت حواله جدید"
                headerIcon={<SyncAltOutlinedIcon />}
                enableActions={true}
                actions={<IconButton onClick={() => navigate("/company/transfers")}>
                    <ArrowBack />
                </IconButton>}>
                {exchangeRate&& !exchangeRate.updated?
                        <AskDialog
                         open={askOpen} 
                         message="نرخ تبادل ارز آپدیت نمیباشد"
                         onNo={()=>setAskOpen(false)} 
                         onYes={()=>formik.submitForm()}/>
                        :""}
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
                                    defaultValue={formik.values.fromName}
                                    error={formik.errors.fromName ? true : false}
                                    helperText={formik.errors.fromName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    size="small"
                                    defaultValue={formik.values.fromLastName}
                                    name='fromLastName'
                                    label="تخلص ارسال کننده"
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    size="small"
                                    name='fromFatherName'
                                    label="ولد ارسال کننده"
                                    defaultValue={formik.values.fromFatherName}
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
                                    defaultValue={formik.values.fromPhone}
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
                                    defaultValue={formik.values.toName}
                                    size="small"
                                    type="text"
                                    error={formik.errors.toName ? true : false}
                                    helperText={formik.errors.toName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name='toLastName'
                                    defaultValue={formik.values.toLastName}
                                    label="تخلص دریافت کننده"
                                    size="small"
                                    type="text"
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    name='toFatherName'
                                    label="ولد دریافت کننده"
                                    required
                                    defaultValue={formik.values.toFatherName}
                                    size="small"
                                    type="text"
                                    error={formik.errors.toFatherName ? true : false}
                                    helperText={formik.errors.toFatherName}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    defaultValue={formik.values.toGrandFatherName}
                                    name='toGrandFatherName'
                                    label="ولدیت دریافت کننده"
                                    size="small"
                                    type="text"
                                    onChange={formik.handleChange}
                                />

                            </FieldSet>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FieldSet label="معلومات ارز">
                                <RatesDropdown
                                    size="small"
                                    defaultId={formik.values.fCurrency}
                                    error={formik.errors.fCurrency ? true : false}
                                    helperText={formik.errors.fCurrency}
                                    label="واحد پول ارسالی"
                                    name="fCurrency"
                                    required
                                    onValueChange={(newValue) => handleSourceChange(newValue)}
                                />
                                <RatesDropdown
                                    size="small"
                                    defaultId={formik.values.tCurrency}
                                    error={formik.errors.tCurrency ? true : false}
                                    helperText={formik.errors.tCurrency}
                                    label="واحد پول دریافتی"
                                    name="tCurrency"
                                    required
                                    onValueChange={(newValue) => handleDistChange(newValue)}
                                />
                                <TextField
                                    name='amount'
                                    label="مقدار پول ارسالی"
                                    required
                                    size="small"
                                    type="number"
                                    value={formik.values.amount}
                                    error={formik.errors.amount ? true : false}
                                    helperText={formik.errors.amount}
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
                                {exchangeRate && sourceRate && distRate && !exchangeRate.updated &&
                                    <Grow in={!exchangeRate.updated}>
                                        <Alert variant='outlined' severity="warning">
                                            <Stack direction="column">
                                                <Box>نرخ {exchangeRate.fromAmount} {sourceRate.priceName} </Box>
                                                <Box>معادل {exchangeRate.toExchangeRate} {distRate.priceName}</Box>
                                                <Box>نرخ ارز آپدیت نمیباشد!</Box>
                                            </Stack>
                                        </Alert>
                                    </Grow>}
                                {exchangeRate && sourceRate && distRate && exchangeRate.updated &&
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
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FieldSet label="معلومات حواله دار">
                                <SearchFriendDropdown
                                    name="friendId"
                                    size="small"
                                    label="کارمند"
                                    defaultFriendId={formik.values.friendId}
                                    error={formik.errors.friendId ? true : false}
                                    helperText={formik.errors.friendId}
                                    onValueChange={(newValue) => formik.setFieldValue("friendId", newValue ? newValue.id : "")}
                                    required
                                />
                                <TextField
                                    name='receiverFee'
                                    label="کمیشن کارمند"
                                    size="small"
                                    type="number"
                                    value={formik.values.receiverFee}
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
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextField
                                    name='comment'
                                    label="ملاحضات"
                                    size="small"
                                    multiline
                                    rows={4}
                                    defaultValue={formik.values.comment}
                                    onChange={formik.handleChange}
                                />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FieldSet label="معلومات حواله" className="bgWave">
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="body1" fontWeight={900}>نمبر حواله :</Typography>
                                    <Typography variant="h4">{formik.values.codeNumber}</Typography>
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
                                onClick={()=>{
                                    if(exchangeRate && !exchangeRate.updated){
                                        formik.isValid&&setAskOpen(true)
                                    }else{
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