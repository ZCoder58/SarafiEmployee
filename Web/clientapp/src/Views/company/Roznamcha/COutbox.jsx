import React from 'react'
import { Box, Grid,TableContainer } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authAxiosApi from '../../../axios'
import { SearchOutlined } from '@mui/icons-material';
import { CDateTimeRange, SearchFriendDropdown, SkeletonFull } from '../../../ui-componets';
import { useSelector } from 'react-redux';
import { TableRoznamchaOutboxDesktop, TableRoznamchaOutboxMobile } from './Responsives/OutboxResponsive';

export default function COutbox() {
    const [transfers, setTransfers] = React.useState([])
    const {screenXs} = useSelector(states => states.R_AdminLayout)
    const [loading,setLoading]=React.useState(true)
    const validationSchema = Yup.object().shape({
        fromDate: Yup.date().required("تاریخ شروع ضروری میباشد"),
        toDate: Yup.date().required("تاریخ ختم ضروری میباشد")
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            fromDate: new Date(),
            toDate: new Date(),
            friendId: undefined
        },
        onSubmit: async (values, formikHelper) => {
            try {
                setLoading(true)
                await authAxiosApi.get('customer/transfers/outReport', {
                    params: values
                }).then(r => {
                    setTransfers(r)
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
            await authAxiosApi.get('customer/transfers/outReport', {
                params: {
                    fromDate: new Date(),
                    toDate: new Date()
                }
            }).then(r => {
                setTransfers(r)
            })
            setLoading(false)
        })()
        return () => (
            setTransfers([])
        )
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item lg={4} md={4} sm={6} xs={12}>

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
                                    size: "small",
                                    variant: "outlined"
                                }}
                                endOptions={{
                                    error: formik.errors.toDate ? true : false,
                                    helperText: formik.errors.toDate,
                                    required: true,
                                    name: "toDate",
                                    size: "small",
                                    variant: "outlined"
                                }}
                            />
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                            <SearchFriendDropdown
                                error={formik.errors.friendId ? true : false}
                                helperText={formik.errors.friendId}
                                required
                                name="friendId"
                                onValueChange={(v) => formik.setFieldValue("friendId", v ? v.id : undefined)}
                                size="small"
                                label="انتخاب همکار" />

                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <LoadingButton
                                loading={formik.isSubmitting}
                                loadingPosition='start'
                                variant='contained'
                                color='primary'
                                startIcon={<SearchOutlined />}
                                type='submit'
                                size="small"
                            >
                                جستجو
                            </LoadingButton>
                        </Grid>
                    </Grid>

                </Box>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                {loading ? <SkeletonFull /> :
                    <TableContainer>
                        {screenXs ? <TableRoznamchaOutboxMobile transfers={transfers} /> : <TableRoznamchaOutboxDesktop transfers={transfers} />}
                    </TableContainer>}
            </Grid>
        </Grid>
    )
}
