import { CheckOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, InputAdornment, TextField, Typography,Alert,AlertTitle } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
import { SkeletonFull, FieldValue, CurrencyText, SearchFriendDropdown, CurrencyInput, TransferCodeNumberInput } from '../../../ui-componets'
const initialModel = {
    friendId: undefined,
    transferId: undefined,
    comment: "",
    receiverFee: undefined,
    codeNumber: undefined
}
const validationSchema = Yup.object().shape({
    friendId: Yup.string().required("انتخاب حواله اجرا کننده ضروری است"),
    codeNumber: Yup.string().required("کد نمبر حواله ضروری است")
});
ForwardTransferForm.defaultProps = {
    transferId: undefined,
    onSubmit: () => { }
}
export default function ForwardTransferForm({ transferId, onSubmit }) {
    const [transfer, setTransfer] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [receiver, setReceiver] = React.useState(null)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            const formData = Util.ObjectToFormData(values)
            formData.set("transferId", transferId)
           await authAxiosApi.post("customer/transfers/forward", formData).then(r => {
                onSubmit()
            }).catch(error => {
                formikHelper.setErrors(error)
            })
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get("customer/transfers/forward", {
                params: {
                    tId: transferId
                }
            }).then(r => setTransfer(r)).catch(error=>setLoading(false));
            setLoading(false)
        })()
        return () => setTransfer(null)
    }, [transferId])
    return (
        loading ? <SkeletonFull /> :
   transfer?
            <Grid container spacing={1}>
                <Grid item lg={12}>
                    <FieldValue label={"مقدار حواله"} value={<CurrencyText value={transfer.amount} priceName={transfer.priceName} />} />
                </Grid>
                <Grid item lg={12}>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item sm={6} xs={12}>
                                <SearchFriendDropdown
                                    name="friendId"
                                    size="small"
                                    label="اجرا کننده"
                                    required
                                    error={formik.errors.friendId ? true : false}
                                    helperText={formik.errors.friendId}
                                    onValueChange={(newValue) => {
                                        setReceiver(newValue)
                                        formik.setFieldValue("friendId", newValue ? newValue.id : "")
                                    }}
                                    
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    name='receiverFee'
                                    label="کمیشن حواله اجرا کننده"
                                    size="small"
                                    type="number"
                                    defaultValue={formik.values.receiverFee}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        endAdornment: <InputAdornment position='end'>
                                            <Typography >{transfer.priceName}</Typography>
                                        </InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TransferCodeNumberInput
                                    name='codeNumber'
                                    label="کد نمبر حواله"
                                    size="small"
                                    type="number"
                                    customerId={receiver ? receiver.customerFriendId : undefined}
                                    required
                                    error={formik.errors.codeNumber ? true : false}
                                    helperText={formik.errors.codeNumber}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <CurrencyInput
                                    name='receiverFee'
                                    label="مجموع پول طلب :"
                                    size="small"
                                    value={Number(formik.values.receiverFee) + Number(transfer.amount)}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: <InputAdornment position='end'>
                                            <Typography >{transfer.priceName}</Typography>
                                        </InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField
                                    name="comment"
                                    label="توضیحات"
                                    onChange={formik.handleChange}
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                            <Grid item>
                                <LoadingButton
                                    loading={formik.isSubmitting}
                                    loadingPosition='start'
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    startIcon={<CheckOutlined />}
                                    type='submit'
                                >
                                    تایید
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            : <Alert severity='error'>
            <AlertTitle>خطا!</AlertTitle>
            این حواله قبلا ارجاع شده است
            </Alert>
          
            
    )
}