import { AskDialog, CCard, CurrencyInput, CurrencyText, ExchangeRateAlert, SearchFriendDropdown, SubCustomersDropdown } from '../../../ui-componets'
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import { Grid, Box, TextField, Stack, Typography, Divider, IconButton } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import authAxiosApi from '../../../axios';
import { LoadingButton } from '@mui/lab';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Util from '../../../helpers/Util'
import { useNavigate } from 'react-router';
import { FieldSet, RatesDropdown, SubCustomerAccountRatesSelect,TransferCodeNumberInput } from '../../../ui-componets'
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
    subCustomerAccountId: undefined,
    subCustomerAccountRateId: undefined,
    tCurrency: undefined,
    amount: "",
    friendId: undefined,
    fee: 0,
    receiverFee: 0,
    comment: "",
    exchangeType:"",
    codeNumber:0
}
const validationSchema = Yup.object().shape({
    exchangeType: Yup.string().required("نوعیت نرخ معامله ضروری میباشد"),
    fromName: Yup.string().required("نام ارسال کنننده ضروری میباشد"),
    fromFatherName: Yup.string().required("ولد ارسال کننده ضروری میباشد"),
    fromPhone: Yup.string().required("شماره تماس ارسال کننده ضروری میباشد"),
    toName: Yup.string().required("نام دریافت کننده ضروری میباشد"),
    toFatherName: Yup.string().required("ولد دریافت کننده ضروری میباشد"),
    subCustomerAccountId: Yup.string().required("انتخاب مشتری ضروری میباشد"),
    subCustomerAccountRateId: Yup.string().required("انتخاب حساب مشتری ضروری میباشد"),
    tCurrency: Yup.string().required("انتخاب ارز دریافت کننده ضروری میباشد"),
    amount: Yup.string().required("مقدار پول ارسالی ضروری میباشد"),
    friendId: Yup.string().required("انتخاب همکار شما ضروری میباشد"),
    fee: Yup.number().min(0, "کمتر از 0 مجاز نیست"),
    receiverFee: Yup.number().min(0, "کمتر از 0 مجاز نیست"),
    codeNumber: Yup.number().required("کد نمبر حواله ضروری میباشد")
});
export default function SubCustomerCreateTransfer() {
    const [accountRate, setAcountRate] = React.useState(null)
    const [distRate, setDistRate] = React.useState(null)
    const [receiver, setReceiver] = React.useState(null)
    const [askOpen, setAskOpen] = React.useState(false)
    const [exchangeRate, setExchangeRate] = React.useState(null)

    const navigate = useNavigate()
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: createModel,
        onSubmit: async (values, formikHelper) => {
            const formData = Util.ObjectToFormData(values)
            try {
                await authAxiosApi.post('subCustomers/transfers', formData)
                navigate('/customer/transfers')
            } catch (errors) {
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    const handleAccountRateChange = (newAccountRate) => {
        formik.setFieldValue("subCustomerAccountRateId", newAccountRate ? newAccountRate.id : "")
        if(newAccountRate){
            setAcountRate({
                ...newAccountRate,
                id:newAccountRate.ratesCountryId})
        }else{
            setAcountRate(newAccountRate)
        }
    }
    const handleDistChange = (newDistValue) => {
        formik.setFieldValue("tCurrency", newDistValue ? newDistValue.id : "")
        setDistRate(s => s = newDistValue)
    }

    const handleSubCustomerChange = async (newSubCustomer) => {
        await formik.setFieldValue("subCustomerAccountId", newSubCustomer ? newSubCustomer.id : undefined)
        await formik.setFieldValue("fromName", newSubCustomer ? newSubCustomer.name : "")
        await formik.setFieldValue("fromLastName", newSubCustomer ? newSubCustomer.lastName : "")
        await formik.setFieldValue("fromFatherName", newSubCustomer ? newSubCustomer.fatherName : "")
        await formik.setFieldValue("fromPhone", newSubCustomer ? newSubCustomer.phone : "")
    }
    return (
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
                            <SubCustomersDropdown
                                size="small"
                                name='subCustomerAccountId'
                                label="مشتری"
                                required
                                error={formik.errors.subCustomerAccountId ? true : false}
                                helperText={formik.errors.subCustomerAccountId}
                                onValueChange={(v) => handleSubCustomerChange(v)}
                            />
                            <TextField
                                size="small"
                                name='fromName'
                                label="نام ارسال کننده"
                                required
                                type="text"
                                value={formik.values.fromName}
                                error={formik.errors.fromName ? true : false}
                                helperText={formik.errors.fromName}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                size="small"
                                name='fromLastName'
                                value={formik.values.fromLastName}
                                label="تخلص ارسال کننده"
                                onChange={formik.handleChange}
                            />
                            <TextField
                                size="small"
                                name='fromFatherName'
                                value={formik.values.fromFatherName}
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
                                value={formik.values.fromPhone}
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
                        <FieldSet label="معلومات ارز">
                            <SubCustomerAccountRatesSelect
                                subCustomerId={formik.values.subCustomerAccountId}
                                name='subCustomerAccountRateId'
                                helperText={formik.errors.subCustomerAccountRateId}
                                size='small'
                                label='حساب ارز'
                                value={formik.values.subCustomerAccountRateId}
                                required
                                error={formik.errors.subCustomerAccountRateId ? true : false}
                                onValueChange={(v) => handleAccountRateChange(v)}
                            />

                            <RatesDropdown
                                error={formik.errors.tCurrency ? true : false}
                                helperText={formik.errors.tCurrency}
                                label="واحد پول دریافتی"
                                name="tCurrency"
                                required
                                size="small"
                                onValueChange={(newValue) => handleDistChange(newValue)}
                            />

                            <CurrencyInput
                                name='amount'
                                label="مقدار پول ارسالی"
                                required
                                size="small"
                                error={formik.errors.amount ? true : false}
                                helperText={formik.errors.amount}
                                onChange={(v)=>formik.setFieldValue("amount",v)}
                                InputProps={{
                                    endAdornment: (
                                        <Stack direction="row">
                                            <Divider orientation='vertical' flexItem ></Divider>
                                            <Typography sx={{ ml: 1 }} variant="body1" >{accountRate ? accountRate.priceName : "هیچ"}</Typography>
                                        </Stack>
                                    )
                                }}
                            />
                            
                            <ExchangeRateAlert
                                sourceRate={accountRate}
                                distRate={distRate}
                                amount={formik.values.amount}
                                onTypeChange={(v)=>formik.setFieldValue("exchangeType",v)}
                                onChange={(result)=>setExchangeRate(result)}
                            />



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
                                            <Typography sx={{ ml: 1 }} variant="body1" >{accountRate ? accountRate.priceName : "هیچ"}</Typography>
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
                                onValueChange={(newValue) => {
                                    setReceiver(newValue)
                                    formik.setFieldValue("friendId", newValue ? newValue.id : "")}}
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
                            <CurrencyInput
                                name='receiverFee'
                                label="مجموع پول طلب :"
                                size="small"
                                value={Number(formik.values.receiverFee) + Number(exchangeRate?exchangeRate.result:0)}
                                InputProps={{
                                    readOnly:true,
                                    endAdornment: (
                                        <Stack direction="row">
                                            <Divider orientation='vertical' flexItem ></Divider>
                                            <Typography sx={{ ml: 1 }} variant="body1" >{distRate ? distRate.priceName : "هیچ"}</Typography>
                                        </Stack>
                                    )
                                }}
                            />
                            <TransferCodeNumberInput
                                name='codeNumber'
                                label="کد نمبر حواله"
                                size="small"
                                type="number"
                                customerId={receiver?receiver.customerFriendId:undefined}
                                required
                                error={formik.errors.codeNumber?true:false}
                                helperText={formik.errors.codeNumber}
                                onChange={formik.handleChange}
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
                            {/* <Stack direction="column" spacing={1}>
                                <Typography variant="body1" fontWeight={900}>نمبر حواله :</Typography>
                                <Typography variant="h4">{transferCode}</Typography>
                            </Stack> */}
                            <Stack direction="column" spacing={1}>
                                <Typography variant="body1" fontWeight={900}>مجموع پول دریافتی از مشتری :</Typography>
                                <Typography variant="h4">
                                    <CurrencyText
                                        value={Number(Number(formik.values.amount) + Number(formik.values.fee))}
                                        priceName={accountRate ? accountRate.priceName : "هیچ"} />
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