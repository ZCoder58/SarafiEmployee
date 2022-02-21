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
                content="با ساخت حساب کاربری روند حواله ها و کارهای صرافی خود را در زمان کم مدیریت کنید و کسب کار خود را سریع تر رونق دهید"
                title="صرافی/حواله داری آنلاین خود را بسازید"
                />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
                <BoxCardWithIcon 
                className="cardBg2"
                imageIcon={feeImg} 
                content="با قیمت کم حساب کاربری مخصوص خود را داشته باشید و نیازی به ساخت سیستم های خصوصی با قیمت گزاف نیست"
                title="قیمت کم"
                />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
                <BoxCardWithIcon 
                className="cardBg2"
                imageIcon={supportImg} 
                title="پشتیبانی 24 ساعته"
                content="سهولت در پشتیبانی و حل مشکلات و سوالات شما در 24 ساعت"
                />
            </Grid>
        </PageSection>
    )
}