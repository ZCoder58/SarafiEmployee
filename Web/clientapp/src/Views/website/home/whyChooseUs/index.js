import { Grid } from "@mui/material";
import { BoxCardWithIcon, PageSection, PageSectionTitle } from "../../../../ui-componets";
import moneyManagementImg from '../../../../assets/images/moneyManagement.png';
import feeImg from '../../../../assets/images/fee.png';
import supportImg from '../../../../assets/images/support.png';
import React from 'react'

export default function WhyChooseUs() {
    return (
        <PageSection spacing={6}>
            <PageSectionTitle title="چرا ما را انتخاب میکنید"/>
            <Grid item lg={4} md={4} sm={4} xs={12}>
                <BoxCardWithIcon 
                className="cardBg2"
                imageIcon={moneyManagementImg} 
                content="با ساخت حساب تجارت صرافی خود را بیشتر توسعه داده و مدیریت بهتری در روند انتقال پول و مدیریت کارمندان خود داشته باشید."
                title="صرافی آنلاین خود را بسازید"
                />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
                <BoxCardWithIcon 
                className="cardBg2"
                imageIcon={feeImg} 
                content=" تجارتتان را با قیمت کم رونق دهید.دیگر نیازی به ساخت اپلیکیشن های شخصی با پول گزاف برای مدیریت کارتان نیست."
                title="قیمت کم"
                />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
                <BoxCardWithIcon 
                className="cardBg2"
                imageIcon={supportImg} 
                title="پشتیبانی 24 ساعته"
                content="سهولت در پشتیبانی از مشکلات و سوالات شما در 24 ساعت"
                />
            </Grid>
        </PageSection>
    )
}