import React from 'react'
import { Box, Grid, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import authAxiosApi from '../../../../axios'
import { LoadingButton } from '@mui/lab'
import { CheckOutlined } from '@mui/icons-material'
import { SkeletonFull } from '../../../../ui-componets'
import Util from '../../../../helpers/Util'
const initialModel = {
    id: undefined,
    name: "",
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام نمایندگی ضروری میباشد")
});
export default function CUpdateAgencyForm({ agencyId,onSubmitDone }) {
    const [loading, setLoading] = React.useState(false)
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: initialModel,
        onSubmit: async (values, formikHelper) => {
            try{
                await authAxiosApi.put('company/agencies',Util.ObjectToFormData(values))
                onSubmitDone()
            }catch(errors){
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('company/agencies/edit',{
                params:{
                    id:agencyId
                }
            }).then(r => {
                formik.setValues(r)
            })
            setLoading(false)
        })()
    }, [agencyId])
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
           {loading?<SkeletonFull/>: <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        variant='outlined'
                        name='name'
                        helperText={formik.errors.name}
                        defaultValue={formik.values.name}
                        size='small'
                        label='نام نمایندگی'
                        required
                        error={formik.errors.name ? true : false}
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
                   startIcon={<CheckOutlined/>}>
                       ذخیره
                   </LoadingButton>
                </Grid>
            </Grid>}
        </Box>
    )
}