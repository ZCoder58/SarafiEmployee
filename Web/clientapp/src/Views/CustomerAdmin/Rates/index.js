import { Grid, Typography, IconButton, Stack, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { AskDialog, CCard, CDialog, CTable, CTooltip, ImagePreview, SkeletonFull } from "../../../ui-componets";
import React from 'react';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CountriesRatesStatic from '../../../helpers/statics/CountriesRatesStatic'
import authAxiosApi from "../../../axios";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux'

export default function VRates() {
    const [loading, setLoading] = React.useState(false)
    const [rates, setRates] = React.useState([])
   
    const navigate = useNavigate()
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/rates').then(r => {
                setRates(r)
            })
            setLoading(false)
        })()
    }, [])
    return (
        <CCard
            title="ارز ها"
            subHeader="جدول ارزهای کشور ها برای تبادل اسعار"
            headerIcon={<MonetizationOnOutlinedIcon />}
            actions={
                <CTooltip title="راهنمای بخش">
                    <IconButton><HelpOutlineOutlinedIcon /></IconButton>
                </CTooltip>
            }>
            <Grid container spacing={2}>

                <Grid item lg={12} sm={12} md={12} xs={12}>
                    {loading ? <SkeletonFull /> : <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{
                                    typography: "body1",
                                    fontWeight: 600
                                }}>
                                    ارز
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rates.map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Stack direction={{
                                            xs: "column",
                                            lg:"row",
                                            md:"row",
                                            sm:"row"
                                        }}
                                         spacing={1}
                                         justifyContent="space-between">
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <ImagePreview
                                                    imagePath={CountriesRatesStatic.flagPath(e.flagPhoto)}
                                                    size={20}
                                                    isWidthTheSame
                                                />
                                                <Typography variant="body2">{e.faName}</Typography>
                                                <Typography variant="body2">-</Typography>
                                                <Typography variant="body2">{e.priceName}</Typography>
                                            </Stack>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={() => navigate("/customer/exchangeRates/" + e.id)}>
                                                ویرایش
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
                </Grid>
            </Grid>
        </CCard>
    )
}