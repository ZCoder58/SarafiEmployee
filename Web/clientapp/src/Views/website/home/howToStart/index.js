import { Grid, Step, StepConnector, StepContent, stepIconClasses, StepLabel, stepLabelClasses, Stepper, styled } from "@mui/material";
import { PageSection, PageSectionTitle } from "../../../../ui-componets";
import startImg from '../../../../assets/images/feature1.png'
import { Box } from "@mui/system";
import React from 'react'

const StyledConnector = styled(StepConnector)(({ theme }) => ({
    [`&`]: {
        marginLeft: 23
    },
}));

const StyledStepContent = styled(StepContent)(({ theme }) => ({
    [`&`]: {
        marginLeft: 23
    },
}));
const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
    [`& .${stepLabelClasses.label},.${stepLabelClasses.completed}`]: {
        fontSize: 20,
        color: theme.palette.primary.main,
        fontWeight: 900
    },
    [`& .${stepLabelClasses.iconContainer} .${stepIconClasses.root}`]: {
        width: "2em",
        height: "2em",
    },
    [`&:hover .${stepLabelClasses.iconContainer} .${stepIconClasses.root}`]: {
        color: theme.palette.primary.main,
    }

}))


export default function HowToStart() {
    return (
        <PageSection className="cardBg2" sx={{ 
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"top"
         }}>
            <PageSectionTitle title="چطور شروع کنم؟" />
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <Stepper activeStep={3} nonLinear orientation="vertical" connector={<StyledConnector />}>
                <Step expanded  >
                    <StyledStepLabel>ثبت نام</StyledStepLabel>
                    <StyledStepContent >ابتدا فورم ثبت نام را خانه پری نمایید و ثبت کنید</StyledStepContent>
                </Step>
                <Step expanded >
                    <StyledStepLabel>پرداخت قیمت</StyledStepLabel>
                    <StyledStepContent >
                        برای فعال سازی سیستم به طور کامل شما باید قیمت مشخص شده برای استفاده از این سیستم را بپردازید
                    </StyledStepContent>
                </Step>
                <Step expanded >
                    <StyledStepLabel>ثبت کارمندان و شعبات</StyledStepLabel>
                    <StyledStepContent>
                        کارمندان شعبات خود را ثبت در سیستم نمایید و به مدیریت آنها بپردازید
                    </StyledStepContent>
                </Step>
                <Step expanded completed>
                    <StyledStepLabel>تمام</StyledStepLabel>
                    <StyledStepContent>
                            از سیستم صرافی آنلاین خود لذت ببرید. 
                    </StyledStepContent>
                </Step>
            </Stepper>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box display="flex" justifyContent="center">
                    <Box component="img" src={startImg} maxWidth="100%"></Box>
                </Box>
            </Grid>
        </PageSection>
    );
}