import { Button, Grid } from '@mui/material'
import { BoxCardWithoutIcon, PageSection, PageSectionTitle } from '../../../../ui-componets'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import React from 'react'

export default function OurServices() {
    return (
        <PageSection className="sectionBg1">
            <PageSectionTitle title="خدمات صرافی آنلاین" />
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="نرخ اسعار زنده"
                    content="نشان دادن نرخ اسعار به صورت زنده "
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="شعبه ها"
                    content="صرافی آنلاین برای شما این قابلیت را در نظر گرفته است تا چندین شعبه به سیستم خود اضافه کنید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="کارمندان نامحدود"
                    content="شما میتوانید تعداد زیادی کارمندان خود را در این سیستم ثبت نام کنید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="مدیریت پروسه ها"
                    content="میتوانید روند ارسال و دریافت رد بدل پول را در سیستم خود مشاهده و مدیریت نمایید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="بلاگ"
                    content="با ساخت حساب کاربری شما میتوانید یک صفحه عمومی برای تبلیغات و معرفی شرکت خود داشته باشید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="نرخ های ارز متفاوت"
                    content="شما میتوانید به تمامی نرخ های ارز کشورها دسترسی داشته باشد "
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="تبدیل نرخ"
                    content="شما میتوانید مقدار پول مورد نظر خود را به نرخ ارز مورد نظر تبدیل کنید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="سیستم چت"
                    content="شما میتوانید از سیستم چت مخصوص صرافی خود استفاده کنید و با کارمندان خود در ارتباط باشید"
                />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} display="flex" justifyContent="center">
                <Button color="primary" variant="contained" startIcon={<ArrowRightAltOutlinedIcon/>}>
                    دیدن همه خدمات 
                </Button>
            </Grid>
        </PageSection>
    )
}