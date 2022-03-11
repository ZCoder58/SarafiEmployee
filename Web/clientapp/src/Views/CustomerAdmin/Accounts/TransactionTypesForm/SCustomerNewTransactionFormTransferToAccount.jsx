// import React from 'react'
// import { Box, Divider, InputAdornment, TextField, Typography } from '@mui/material'
// import * as Yup from 'yup'
// import { useFormik } from 'formik'
// import authAxiosApi from '../../../../axios'
// import Util from '../../../../helpers/Util'
// import { CTitle, ExchangeRateAlert, SearchFriendDropdown} from '../../../../ui-componets'
// import { LoadingButton } from '@mui/lab'
// import { CheckCircleOutline } from '@mui/icons-material'
// const initialModel = {
//     customerAccountId: undefined,
//     comment: "",
//     amount: 1,
//     toCustomerId: undefined,
//     ToCustomerAccountId: undefined
// }
// const validationSchema = Yup.object().shape({
//     amount: Yup.number().required("مقدار پول ضروری میباشد").moreThan(0, "کمتر از 1 مجاز نیست"),
//     toCustomerId: Yup.string().required("انتخاب همکار شما ضروری میباشد"),
//     ToCustomerAccountId: Yup.string().required("انتخاب حساب ارز همکار شما ضروری میباشد"),
// });
// export default function SCustomerNewTransactionFormTransferToAccount({ customerAccount, onSuccess }) {
//     const [sourceRate, setSourceRate] = React.useState(null)
//     const [distRate, setDistRate] = React.useState(null)
//     const [exchangeRate, setExchangeRate] = React.useState(null)
//     const formik = useFormik({
//         validationSchema: validationSchema,
//         initialValues: initialModel,
//         onSubmit: async (values, formikHelper) => {
//             const formData = Util.ObjectToFormData(values);
//             formData.set('subCustomerId', customerAccount.id)
//             await authAxiosApi.put('subCustomers/accounts/transferToAccount', formData)
//                 .then(r => {
//                     onSuccess()
//                 }).catch(errors => {
//                     formikHelper.setErrors(errors)
//                 })
//             return false
//         }
//     })
//     React.useEffect(() => {
//         (async () => {
//             if (sourceRate && distRate) {
//                 await authAxiosApi.get('customer/rates/exchangeRate', {
//                     params: {
//                         from: sourceRate.ratesCountryId,
//                         to: distRate.ratesCountryId
//                     }
//                 }).then(r => {
//                     setExchangeRate(r)
//                 })
//             }
//         })()
//         return () => setExchangeRate(null)
//     }, [sourceRate, distRate])
//     return (
//         <Box component="form" noValidate onSubmit={formik.handleSubmit}>
//             <CTitle>انتقال پول از به حساب همکار</CTitle>
//             <TextField
//                 variant='outlined'
//                 name='amount'
//                 helperText={formik.errors.amount}
//                 size='small'
//                 label='مقدار ارسالی'
//                 value={formik.values.amount}
//                 type='number'
//                 required
//                 error={formik.errors.amount ? true : false}
//                 onChange={formik.handleChange}
//                 InputProps={{
//                     endAdornment: <InputAdornment position="end">
//                         {customerAccount ? customerAccount.priceName : "هیچ"}
//                     </InputAdornment>
//                 }}
//             />
//             <SearchFriendDropdown
//             required
//             error={formik.errors.toCustomerId ? true : false}
//             name="toCustomerId"
//             size='small'
//             onValueChange={(v)=>formik.setFieldValue("toCustomerId",v?v.id:undefined)}
//             />
            
//             <TextField
//                 variant='outlined'
//                 name='comment'
//                 size='small'
//                 label='ملاحضات'
//                 type='text'
//                 multiline
//                 rows={4}
//                 onChange={formik.handleChange}
//             />
//             <LoadingButton
//                 loading={formik.isSubmitting}
//                 loadingPosition='start'
//                 variant='contained'
//                 color='primary'
//                 size='small'
//                 startIcon={<CheckCircleOutline />}
//                 type='submit'
//             >
//                 تایید
//             </LoadingButton>
//         </Box>
//     )
// }