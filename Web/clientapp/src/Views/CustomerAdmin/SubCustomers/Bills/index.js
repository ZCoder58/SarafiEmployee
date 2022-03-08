import React from 'react'
import authAxiosApi from '../../../../axios'
import { CCard, SkeletonFull, CDateTimeRange, SubCustomersDropdown } from '../../../../ui-componets'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { LoadingButton } from '@mui/lab'
import { useSelector } from 'react-redux';
import SCTransactionsBillsMobile from './SCTransactionsBillsMobile';
import SCTransactionsBillsDekstop from './SCTransactionsBillsDekstop'
const validationSchema = Yup.object().shape({
    fromDate: Yup.date().required("تاریخ شروع ضروری میباشد").typeError("لطفا یک تاریخ انتخاب نمایید"),
    toDate: Yup.date().required("تاریخ ختم ضروری میباشد").typeError("لطفا یک تاریخ انتخاب نمایید")
});
export default function VSubCustomerBills() {
    const [loading, setLoading] = React.useState(true)
    const [transactions, setTransactions] = React.useState([])
    const { screenXs } = useSelector(states => states.R_AdminLayout)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            fromDate: new Date(),
            toDate: new Date(),
            subCustomerId: undefined
        },
        onSubmit: async (values, formikHelper) => {
            try {
                setLoading(true)
                await authAxiosApi.get('subCustomers/bills', {
                    params: values
                }).then(r => {
                    setTransactions(r)
                })
                setLoading(false)
            } catch (errors) {
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('subCustomers/bills', {
                params: {
                    fromDate: new Date(),
                    toDate: new Date(),
                }
            }).then(r => {
                setTransactions(r)
            })
            setLoading(false)
        })()

        return () => {
            setTransactions([])
        }
    }, [])
    return (
        <CCard
            title={`بیلانس رسید/برد مشتریان`}
            headerIcon={<InfoOutlinedIcon />}
            enableActions
        >
            <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <CDateTimeRange
                        value={[formik.values.fromDate, formik.values.toDate]}
                        onChange={(start, end) => {
                            formik.setFieldValue("fromDate", start)
                            formik.setFieldValue("toDate", end)
                        }}
                        startOptions={{
                            error: formik.errors.fromDate ? true : false,
                            helperText: formik.errors.fromDate,
                            required: true,
                            name: "fromDate",
                            size: "small"
                        }}
                        endOptions={{
                            error: formik.errors.toDate ? true : false,
                            helperText: formik.errors.toDate,
                            required: true,
                            name: "toDate",
                            size: "small"
                        }}
                    />
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                        <SubCustomersDropdown
                            name="subCustomerId"
                            onValueChange={(v) =>{ 
                                formik.setFieldValue("subCustomerId", v ? v.id : undefined)
                                formik.submitForm()
                            }}
                            size="small"
                            label="انتخاب مشتری" />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <LoadingButton
                            loading={formik.isSubmitting}
                            loadingPosition='start'
                            variant='contained'
                            color='primary'
                            size='small'
                            startIcon={<SearchOutlinedIcon />}
                            type='submit'
                        >
                            جستجو
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    {loading ? <SkeletonFull /> :
                        screenXs ? <SCTransactionsBillsMobile isPersonReport={formik.values.subCustomerId?true:false} transactions={transactions} /> :
                            <SCTransactionsBillsDekstop isPersonReport={formik.values.subCustomerId?true:false} transactions={transactions} />
                    }
                </Grid>
            </Grid>
        </CCard>
    )
}