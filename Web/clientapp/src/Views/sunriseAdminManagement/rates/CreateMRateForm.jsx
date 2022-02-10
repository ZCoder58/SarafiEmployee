import { CheckOutlined } from "@mui/icons-material";
import { TextField, Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Util from '../../../helpers/Util';
import authAxiosApi from '../../../axios';
import { PropTypes } from "prop-types";
import { ImageUploader } from "../../../ui-componets";
const rateModel = {
    faName: "",
    abbr: "",
    flagPhotoFile:{},
    priceName:""
}
const validationSchema = Yup.object().shape({
    faName: Yup.string().required("نام کشور ضروری میباشد"),
    abbr: Yup.string().required("مخفف ضروری میباشد"),
    priceName: Yup.string().required("نام ارز ضروری میباشد"),
    flagPhotoFile:Yup.mixed().required("تصویر بیرق ضروری میباشد")
    .test("file type","لطفا یک تصویر انتخاب کنید",(value)=>{
       return `${value.type}`.includes("image")
    })
});
CreateMRateForm.propTypes={
    afterSubmit:PropTypes.func
}
CreateMRateForm.defaultProps={
    afterSubmit:()=>{}
}
export default function CreateMRateForm({afterSubmit}) {
    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: rateModel,
        onSubmit: async (values, formikHelper) => {
            try {
                await authAxiosApi.post('management/rates', Util.ObjectToFormData(values))
                afterSubmit();
                formik.resetForm()
            } catch (errors) {
                formikHelper.setErrors(errors)
            }
            return false;
        }
    })
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3} direction="column" pt={2}>
                <ImageUploader
                 name="flagPhotoFile"
                 label="تصویر بیرق"
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
                    required
                    error={formik.errors.faName ? true : false}
                    onChange={formik.handleChange}
                />
                <TextField
                    variant='outlined'
                    name='abbr'
                    helperText={formik.errors.abbr}
                    size='small'
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