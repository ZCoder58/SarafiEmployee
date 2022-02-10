import { Grid, useTheme, Stack, Card, Typography, CardContent, Table, TableRow, TableCell, TableBody, styled, Button } from '@mui/material'
import { shouldForwardProp } from '@mui/system';
import React from 'react'
import { axiosApi } from '../../../axios';
const StyledTableCell = styled(TableCell, { shouldForwardProp })({
    padding: 10,
    border: 0
})
const PriceCard = ({ theme, pack }) => (
  
    <Card>
        <Stack spacing={2} direction="column" px={3} py={3}>
            <Typography variant="h5">
                بسته {pack.name}
            </Typography>
            <Stack spacing={2} direction="row" alignItems="flex-end">
                <Typography variant="h4">
                    $ {pack.price}
                </Typography>
                <Typography variant="body2" sx={{
                    color: theme.palette.success.main
                }}>
                    سالانه
                </Typography>
            </Stack>
        </Stack>
        <CardContent>
            <Table>
                <TableBody>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >تعداد کارمند:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            {pack.employees>100?"نامحدود":pack.employees}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >تعداد نرخ ارز:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            {pack.currencyExchangeRate>100?"نامحدود":pack.currencyExchangeRate}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >تعداد تبدیلی نرخ ارز: </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            {pack.currencyConversion>100?"نامحدود":pack.currencyConversion}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >تعداد نمایندگی:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            {pack.agent>100?"نامحدود":pack.agent}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >به روز رسانی نرخ ارز: </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                    هر  {pack.exchangeRateUpdate} ساعت
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >تغیر لوگو:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            {!pack.logoCustomization?"خیر":"بله"}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >ویب سایت:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            {!pack.website?"خیر":"بله"}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >پشتیبانی کامل:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            {!pack.fullSupport?"خیر":"بله"}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >تغیر ظاهر سیستم:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            {!pack.customizeTemplate?"خیر":"بله"}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="body1" >مالیه در هر انتقال:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            $ {pack.taxPerTransition}
                        </StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)
export default function Pricing() {
    const [packages, setPackages] = React.useState([])
    const theme = useTheme();
    React.useEffect(() => {
        (async () => {
            const result = await axiosApi.get('package/GetPackages')
            setPackages(p => p = result)
        })()
    }, [])
    return (
        <Grid container spacing={3} display="flex" justifyContent="center">
            {packages.map((e, index) => {
                return <Grid item key={index} lg={3} md={4} sm={4} xs={12}>
                    <PriceCard theme={theme} pack={e} />
                </Grid>
            })}
        </Grid>
    )
}