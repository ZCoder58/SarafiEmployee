import {
    Accordion,
    AccordionDetails,
    Grid,
    Stack,
    useTheme,
    AccordionSummary,
    styled,
    Table,
    TableBody,
    TableFooter,
    TableCell,
    TableRow,
    Typography,
    Alert,
    AlertTitle,
    Button
} from '@mui/material';
import React from 'react';
import { shouldForwardProp } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SignupContext } from './index';
import { axiosApi } from '../../../axios';
const StyledTableCell = styled(TableCell, { shouldForwardProp })({
    padding: 10,
    border: 0
})
const PricingAccordion = ({ theme, pack, onSelect }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}>
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
            </AccordionSummary>
            <AccordionDetails>
                <Table>
                    <TableBody>
                        <TableRow>
                            <StyledTableCell>
                                <Typography variant="body1" >تعداد کارمند:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {pack.employees > 100 ? "نامحدود" : pack.employees}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Typography variant="body1" >تعداد نرخ ارز:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {pack.currencyExchangeRate > 100 ? "نامحدود" : pack.currencyExchangeRate}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Typography variant="body1" >تعداد تبدیلی نرخ ارز: </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {pack.currencyConversion > 100 ? "نامحدود" : pack.currencyConversion}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Typography variant="body1" >تعداد نمایندگی:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {pack.agent > 100 ? "نامحدود" : pack.agent}
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
                                {!pack.logoCustomization ? "خیر" : "بله"}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Typography variant="body1" >ویب سایت:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {!pack.website ? "خیر" : "بله"}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Typography variant="body1" >پشتیبانی کامل:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {!pack.fullSupport ? "خیر" : "بله"}
                            </StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>
                                <Typography variant="body1" >تغیر ظاهر سیستم:</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                {!pack.customizeTemplate ? "خیر" : "بله"}
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
                    <TableFooter>
                        <TableRow>
                            <StyledTableCell>
                                <Button variant="rounded" fullWidth color="priamry" onClick={() => onSelect(pack.name, pack.id)}>
                                    انتخاب
                                </Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </AccordionDetails>
        </Accordion>
    )
}
export default function ChooseYourPlan() {
    const { setPack } = React.useContext(SignupContext)
    const theme = useTheme()
    const [packages, setPackages] = React.useState([])
    React.useEffect(() => {
        (async () => {
            const result = await axiosApi.get('package/GetPackages')
            setPackages(p => p = result)
        })()
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h5">پکیج مورد نظر خود را انتخاب نمایید</Typography>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Alert severity="info" >
                    <AlertTitle>نوت:</AlertTitle>
                    <Typography variant="body1" color="text.black">بعدا میتوانید نظر به ضرورت خود پکیج خود را تغیر دهید</Typography>
                </Alert>
            </Grid>
            {packages.map((e, index) => {
                return <Grid item key={index} lg={4} md={4} sm={12} xs={12}>
                    <PricingAccordion pack={e} theme={theme} onSelect={(packName, PackId) => setPack(packName, PackId)} />
                </Grid>
            })}
        </Grid>
    )
}