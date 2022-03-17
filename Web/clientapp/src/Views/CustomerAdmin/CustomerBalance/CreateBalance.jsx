import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import authAxiosApi from '../../../axios'
import Util from '../../../helpers/Util'
import { Box, Checkbox, Divider, FormControlLabel, Grid, InputAdornment, TextField } from '@mui/material';
import { CSelect, CurrencyInput, RatesDropdown } from '../../../ui-componets';
import { LoadingButton } from '@mui/lab';
import { CheckOutlined } from '@mui/icons-material';

const initialModel = {
    ratesCountryId: undefined,
    type: "",
    amount: undefined,
    comment: undefined,
    fId: undefined,
    addToAccount:true,
}
const validationSchema = Yup.object().shape({
    ratesCountryId: Yup.string().required("انتخاب ارز ضروری میباشد"),
    type: Yup.string().required("انتخاب نوعیت بیلانس ضروری میباشد"),
    amount: Yup.number().required("مقدار ارز ضروری میباشد").moreThan(0, "کمتر از 1 مجاز نیست"),
  });
export default function CreateBalance({ onSubmitDone,fId }) {
    const [rate, setRate] = React.useState(null)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            try {
                const formData=Util.ObjectToFormData(values)
                formData.set("fId",fId)
                await authAxiosApi.post('customer/balances',formData )
                onSubmitDone()
            } catch (errors) {
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <RatesDropdown
                        name='ratesCountryId'
                        helperText={formik.errors.ratesCountryId}
                        size='small'
                        label='ارز'
                        required
                        error={formik.errors.ratesCountryId ? true : false}
                        onValueChange={(v) => {
                            formik.setFieldValue("ratesCountryId", v ? v.id : undefined)
                            setRate(v)
                        }}
                    />
                </Grid>
               
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <CurrencyInput
                        name='amount'
                        helperText={formik.errors.amount}
                        size='small'
                        label='مقدار'
                        required
                        error={formik.errors.amount ? true : false}
                        onChange={(v)=>formik.setFieldValue("amount",v)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                {rate ? rate.priceName : "هیچ"}
                                <Divider orientation='vertical' variant='middle' flexItem />
                            </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CSelect
                    name="type"
                    required
                    size="small"
                    value={formik.values.type}
                    label="نوعیت بیلانس"
                    error={formik.errors.type?true:false}
                    helperText={formik.errors.type}
                    onChange={formik.handleChange}
                    data={[
                        {value:undefined,label:"انتخاب نوعیت",selected:true},
                        {value:1,label:"رسید"},
                        {value:2,label:"طلب"}
                    ]}
                    />
                </Grid>
               {formik.values.type===1&& <Grid item lg={12} md={12} sm={12} xs={12}>
                    <FormControlLabel
                    label="به دخل اضافه شود؟"
                    name="addToAccount"
                    control={<Checkbox checked={formik.values.addToAccount} onChange={(e)=>formik.setFieldValue("addToAccount",e.target.checked)}/>}
                    />
                </Grid>}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        variant='outlined'
                        name='comment'
                        size='small'
                        label="توضیحات"
                        required
                        multiline
                        rows={3}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <LoadingButton
                        loading={formik.isSubmitting}
                        size='small'
                        variant="contained"
                        color="primary"
                        type="submit"
                        startIcon={<CheckOutlined />}>
                        ذخیره
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}