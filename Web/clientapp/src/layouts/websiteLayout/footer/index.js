import { Grid, List, ListItem, Stack, useTheme, Typography, Divider } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import styled from '@emotion/styled';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import React from 'react'

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    '&:hover': {
        color: theme.palette.primary.main
    }
}))
export default function Footer() {
    const theme = useTheme()
    return (
        <Grid container spacing={2} py={5} px={5} sx={{
            borderTop: `1px solid ${theme.palette.primaryTransparent.main}`,
            my: 3
        }}>
            <Grid item lg={4} md={4} sm={6} xs={12}>
                <Divider textAlign='left'>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <LinkIcon ml={2} color="primary" />
                        <Typography variant="h6">
                            لینک های سایت
                        </Typography>
                    </Stack>
                </Divider>
                <List type="ul">
                    <ListItem><StyledLink to="#">خانه</StyledLink></ListItem>
                    <ListItem><StyledLink to="#">ساخت حساب</StyledLink></ListItem>
                    <ListItem><StyledLink to="#">ورود به حساب</StyledLink></ListItem>
                    <ListItem><StyledLink to="#">تماس با ما</StyledLink></ListItem>
                    <ListItem><StyledLink to="#">درباره ما</StyledLink></ListItem>
                </List>
            </Grid>
            {/* <Grid item lg={4} md={4} sm={6} xs={12} display="flex" alignItems="flex-end">
            <Stack direction="row" spacing={2}>
                            <StyledLink to="#">
                                <FacebookIcon sx={{
                                    fill: "#3b5999",
                                    fontSize:30
                                }} />
                            </StyledLink>
                            <StyledLink to="#">
                                <InstagramIcon sx={{
                                    fill: "#d43f81",
                                    fontSize:30
                                }} />
                            </StyledLink>
                            <StyledLink to="#">
                                <TelegramIcon sx={{
                                    fill: "#045f97",
                                    fontSize:30
                                }} />
                            </StyledLink>
                        </Stack>
                </Grid> */}

            {/* <Grid item lg={4} md={4} sm={6} xs={6}>

                <List type="ul">

                    <ListItem>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="body1" fontWeight={700}>
                                آدرس:
                            </Typography>
                            <Typography variant="body2">
                                مزار شریف رسته شفاخانه ملکی جوار مسجد سه دوکان مرکز یو سی
                            </Typography>
                        </Stack>
                    </ListItem>
                    <ListItem>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="body1" fontWeight={700}>
                                شماره های تماس:
                            </Typography>
                            <Typography sx={{ direction:"rtl" }} variant="body2">
                                +(93) 7XXXXXXXXX
                            </Typography>
                            <Typography  sx={{ direction:"rtl" }} variant="body2">
                                +(93) 7XXXXXXXXX
                            </Typography>
                        </Stack>
                    </ListItem>
                    <ListItem>
                        <Stack direction="row" spacing={2}>
                            <StyledLink to="#">
                                <FacebookIcon sx={{
                                    fill: "#3b5999",
                                    fontSize:30
                                }} />
                            </StyledLink>
                            <StyledLink to="#">
                                <InstagramIcon sx={{
                                    fill: "#d43f81",
                                    fontSize:30
                                }} />
                            </StyledLink>
                            <StyledLink to="#">
                                <TelegramIcon sx={{
                                    fill: "#045f97",
                                    fontSize:30
                                }} />
                            </StyledLink>
                        </Stack>
                    </ListItem>
                </List>
            </Grid> */}

        </Grid>
    )
}