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
                    title="نرخ اسعار"
                    content="صرافی آنلاین از تمامی نرخ اسعار کشور ها پشتیبانی میکند"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="همکاران"
                    content="شما میتوانید با همکاران خود در هر نقطه همکار شوید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="حواله ها"
                    content="شما میتوانید با استفاده از بخش حواله ها به ارسال و دریافت حواله بپردازید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="مدیریت پروسه ها"
                    content="میتوانید روند دقیق کارهای صرافی و حواله داری خود را مشاهده کنید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="پروفایل کاربری"
                    content="شما در این سیستم پروفایل کاربری خود را دارید و میتوانید خود را به صرافان و حواله داران دیگر معرفی نمایید"
                />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12}>
                <BoxCardWithoutIcon
                    title="تبدیل نرخ"
                    content="شما میتوانید مقدار پول مورد نظر خود را به نرخ ارز مورد نظر تبدیل کنید"
                />
            </Grid>
            {/* <Grid item lg={12} md={12} sm={12} xs={12} display="flex" justifyContent="center">
                <Button color="primary" variant="contained" startIcon={<ArrowRightAltOutlinedIcon/>}>
                    دیدن همه خدمات 
                </Button>
            </Grid> */}
        </PageSection>
    )
}