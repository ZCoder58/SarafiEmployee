import React from 'react'
import { useNavigate, useParams } from 'react-router'
import authAxiosApi from '../../../../axios'
import { CCard, SkeletonFull, CDateTimeRange } from '../../../../ui-componets'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {LoadingButton} from '@mui/lab'
import { useSelector } from 'react-redux';
import  SubCustomerTransactionsMobile  from './SubCustomerTransactionsMobile';
import SubCustomerTransactionsDesktop from './SubCustomerTransactionsDesktop';
export default function VCTransactions() {
    const { subCustomerId } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(true)
    const [subCustomer, setSubCustomer] = React.useState(null)
    const [transactions, setTransactions] = React.useState([])
    const {screenXs}=useSelector(states=>states.R_AdminLayout)
    const validationSchema = Yup.object().shape({
        fromDate: Yup.date().required("تاریخ شروع ضروری میباشد").typeError("لطفا یک تاریخ انتخاب نمایید"),
        toDate: Yup.date().required("تاریخ ختم ضروری میباشد").typeError("لطفا یک تاریخ انتخاب نمایید")
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            fromDate: new Date(),
            toDate: new Date(),
            subCustomerId: undefined
        },
        onSubmit: async (values, formikHelper) => {
            setLoading(true)
            await authAxiosApi.get('subCustomers/transactions', {
                params: values
            }).then(r => {
                setTransactions(r)
            }).catch(errors => {
                formikHelper.setErrors(errors)
            })
            setLoading(false)
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('subCustomers/edit/' + subCustomerId)
                .then(r => {
                    setSubCustomer(r)
                })
                .catch(errors => navigate('/requestDenied'))
            await authAxiosApi.get('subCustomers/transactions', {
                params: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    subCustomerId: subCustomerId
                }
            }).then(r => {
                setTransactions(r)
            }).catch(errors => navigate('/requestDenied'))
            setLoading(false)
        })()

        return () => {
            setTransactions([])
            setSubCustomer(null)
        }
    }, [subCustomerId, navigate])
    return (
        <CCard
            title={`انتقالات حساب ${subCustomer&& subCustomer.name} ${subCustomer&&subCustomer.fatherNAme}`}
            headerIcon={<InfoOutlinedIcon />}
        >
           
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
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
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    {loading ? <SkeletonFull /> :
                    screenXs?<SubCustomerTransactionsMobile transactions={transactions}/>:
                    <SubCustomerTransactionsDesktop transactions={transactions}/>
                    }
                    </Grid>
                </Grid>
        </CCard>
    )
}