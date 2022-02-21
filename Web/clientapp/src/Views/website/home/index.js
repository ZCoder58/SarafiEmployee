import React from 'react'
import { Grid } from "@mui/material";
import { PageContainer, LoadableSection } from '../../../ui-componets';
import SliderSection from './slider';
import Achivements from './achivments';
import WhyChooseUs from './whyChooseUs';
import GrowBussines from './GrowBussines';
import OurServices from './ourServices';
import HowToStart from './howToStart';
export default function VHome() {
  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <LoadableSection>
            <SliderSection />
          </LoadableSection>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <LoadableSection>
            <Achivements />
          </LoadableSection>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <LoadableSection>
            <HowToStart />
          </LoadableSection>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <LoadableSection>
            <WhyChooseUs />
          </LoadableSection>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <LoadableSection>
            <GrowBussines />
          </LoadableSection>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <LoadableSection>
            <OurServices />
          </LoadableSection>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
