import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { SkeletonFull } from '../../../ui-componets'
import React from 'react'
import authAxiosApi from '../../../axios'
import useAuth from '../../../hooks/useAuth'
import ImageUpload from '../../../ui-componets/ImageUpload'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import Util from '../../../helpers/Util'
import CustomerStatics from '../../../helpers/statics/CustomerStatic'
const validationSchema = Yup.object().shape({
    photoFile:Yup.mixed().nullable()
});
export default function EProfileInfo() {
    const [loading, setLoading] = React.useState(true)
    const [profileInfoModel, setProfileInfoModel] = React.useState({})
    const auth = useAuth()
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: { photoFile:null },
        onSubmit: async (values, formikHelper) => {
            try {
                await authAxiosApi.post('customer/profile/changeProfile',Util.ObjectToFormData(values)).then(r=>{
                    auth.reInit(r)
                })
                formik.setFieldValue("photoFile",null)
            } catch (errors) {
                formikHelper.setErrors(errors)
            }
            return false
        }
    })
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/profile/info').then(r => {
                setProfileInfoModel(r)
            })
            setLoading(false)
        })()
    }, [])
    return (
        <Card>
            <CardContent>
                {loading ? <SkeletonFull /> : <Grid container spacing={2}>
                    <Grid item lg={3} md={3} sm={4} xs={12}>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <ImageUpload
                                label="تصویر شما"
                                name="photoFile"
                                defaultImagePath={auth.photo}
                                error={formik.errors.photoFile ? true : false}
                                helperText={formik.errors.photoFile}
                                onChangeHandle={(image) => formik.setFieldValue("photoFile", image)}
                            />
                            {formik.values.photoFile ? <LoadingButton
                                size='small'
                                loading={formik.isSubmitting}
                                type='submit'
                                variant="contained"
                            >
                                ذخیره
                            </LoadingButton> : ""}
                        </Box>
                    </Grid>
                    <Grid item lg={9} md={9} sm={8} xs={12}>
                        <Stack direction="column">
                            <Box><Typography variant="body1" fontWeight={900}>نام :</Typography><Typography variant="body1">{profileInfoModel.name}</Typography></Box>
                            <Box><Typography variant="body1" fontWeight={900}>تخلص :</Typography><Typography variant="body1">{profileInfoModel.lastName}</Typography></Box>
                            <Box><Typography variant="body1" fontWeight={900}>نام کاربری :</Typography><Typography variant="body1">{profileInfoModel.userName}</Typography></Box>
                            <Box><Typography variant="body1" fontWeight={900}>شماره تماس :</Typography><Typography variant="body1">{profileInfoModel.phone}</Typography></Box>
                            <Box><Typography variant="body1" fontWeight={900}>ایمیل:</Typography><Typography variant="body1">{profileInfoModel.email}</Typography></Box>
                        </Stack>
                    </Grid>
                </Grid>
                }
            </CardContent>
        </Card>

    )
}