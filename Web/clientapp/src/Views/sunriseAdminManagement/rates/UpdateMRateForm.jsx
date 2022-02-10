import { CheckOutlined } from "@mui/icons-material";
import { TextField, Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Util from '../../../helpers/Util';
import authAxiosApi from '../../../axios';
import { PropTypes } from "prop-types";
import React from 'react'
import { ImageUploader } from "../../../ui-componets";
import CountriesRatesStatic from '../../../helpers/statics/CountriesRatesStatic'
const rateModelTemp = {
    faName: "",
    abbr: "",
    flagPhotoFile:{},
    priceName:""
}
const validationSchema = Yup.object().shape({
    faName: Yup.string().required("نام کشور ضروری میباشد"),
    abbr: Yup.string().required("مخفف ضروری میباشد"),
    priceName: Yup.string().required("نام ارز ضروری میباشد"),
    flagPhotoFile:Yup.mixed().nullable()
    .test("file type","لطفا یک تصویر انتخاب کنید",(value)=>{
        return value===undefined  ||`${value.type}`.includes("image")
    })
});
UpdateMRateForm.propTypes={
    afterSubmit:PropTypes.func
}
UpdateMRateForm.defaultProps={
    afterSubmit:()=>{}
}
export default function UpdateMRateForm({rateId,afterSubmit}) {
    const [rateModel,setRateModel]=React.useState(rateModelTemp);
    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: rateModel,
        onSubmit: async (values, formikHelper) => {
            try {
                delete values.flagPhoto
                await authAxiosApi.put('management/rates', Util.ObjectToFormData({
                    ...values,
                    id:rateId
                }))
                afterSubmit();
                formik.resetForm()
            } catch (errors) {
                formikHelper.setErrors(errors)
            }
            return false;
        }
    })
    React.useEffect(()=>{
        (async()=>{
            await authAxiosApi.get(`management/rates/${rateId}`).then(r=>{
                setRateModel(r);
            })
        })()
        return ()=>{
            setRateModel(rateModelTemp)
        }
    },[setRateModel,rateId])
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3} direction="column" pt={2}>
            <ImageUploader
                 name="flagPhotoFile"
                 label="تصویر بیرق"
                 defaultImagePath={rateModel.flagPhoto?CountriesRatesStatic.flagPath(rateModel.flagPhoto):""}
                 onChangeHandle={(file)=>formik.setFieldValue("flagPhotoFile",file)}
                 helperText={formik.errors.flagPhotoFile}
                 required
                 error={formik.errors.flagPhotoFile ? true : false}
                 />
                <TextField
                    variant="outlined"
                    name="faName"
                    helperText={formik.errors.faName}
                    size="small"
                    label="نام کشور"
                    type="text"
                    value={formik.values.faName}
                    required
                    error={formik.errors.faName ? true : false}
                    onChange={formik.handleChange}
                />
                <TextField
                    variant='outlined'
                    name='abbr'
                    helperText={formik.errors.abbr}
                    size='small'
                    value={formik.values.abbr}
                    label='مخفف'
                    type='text'
                    required
                    error={formik.errors.abbr ? true : false}
                    onChange={formik.handleChange}
                />
                  <TextField
                    variant='outlined'
                    name='priceName'
                    helperText={formik.errors.priceName}
                    size='small'
                    value={formik.values.priceName}
                    label='نام ارز'
                    type='text'
                    required
                    error={formik.errors.priceName ? true : false}
                    onChange={formik.handleChange}
                />
                <LoadingButton
                    loading={formik.isSubmitting}
                    loadingPosition="start"
                    variant="contained"
                    color="primary"
                    startIcon={<CheckOutlined />}
                    onClick={formik.submitForm}
                >
                    ذخیره
                </LoadingButton>
            </Stack>
        </Box>
    )
}