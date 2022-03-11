import React from 'react'
import { Grid, Card, CardContent, Typography, Chip, Divider, Stack, styled, Button, CardHeader, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom'
import authAxiosApi from '../../../axios'
import { CDialog, CurrencyText, SkeletonFull } from '../../../ui-componets'
import { shouldForwardProp } from '@mui/system'
import { useNavigate } from 'react-router'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import SetTransferCompleteForm from './SetTransferCompleteForm'
const StyledRowLight = styled(Stack)({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 4px"
})
const StyledRowDark = styled(Stack, { shouldForwardProp })(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 4px",
    backgroundColor: theme.palette.grey[100]
}))
export default function VCTransferInfo() {
    const { transferId } = useParams();
    const [loading, setLoading] = React.useState(true)
    const navigate = useNavigate()
    const [transfer, setTransfer] = React.useState(null)
    const [completeDialogOpen, setCompleteDialogOpen] = React.useState(false)
    function handleCompletetClick(){
        setCompleteDialogOpen(!completeDialogOpen)
       
    }
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/transfers/inbox/' + transferId).then(r => {
                setTransfer(r)
            }).catch(errors=>navigate('/requestDenied'))
            setLoading(false)
        })()
        return ()=>setTransfer(null)
    }, [transferId])
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item lg={5} md={5} sm={8} xs={12}>
                <Card elevation={2}>
                    <CardHeader 
                    action={<IconButton  onClick={()=>navigate("/customer/transfers")}>
                        <ArrowBackOutlinedIcon/>
                    </IconButton>}
                    title="جزییات حواله">
                    </CardHeader>
                    {loading ? <SkeletonFull /> :
                        <CardContent>
                            <Typography variant="h6" color="primary">معلومات حواله</Typography>
                            <Divider />
                            <StyledRowDark>
                                <Typography variant="body1" fontWeight={900}>کد حواله :</Typography>
                                <Typography variant="body2">{transfer.codeNumber}</Typography>
                            </StyledRowDark>
                            <StyledRowLight>
                                <Typography variant="body1" fontWeight={900}>حواله کننده :</Typography>
                                <Typography variant="body2">{transfer.senderName} {transfer.senderLastName}</Typography>
                            </StyledRowLight>
                            <StyledRowDark>
                                <Typography variant="body1" fontWeight={900}>آدرس حواله کننده :</Typography>
                                <Typography variant="body2">{transfer.senderCountryName}-{transfer.senderCity} {transfer.senderDetailedAddress}</Typography>
                            </StyledRowDark>
                            <StyledRowLight>
                                <Typography variant="body1" fontWeight={900}>کمیشن اجرا کننده :</Typography>
                                <Typography variant="body2">{transfer.receiverFee} {transfer.toCurrency}</Typography>
                            </StyledRowLight>
                            <StyledRowDark>
                                <Typography variant="body1" fontWeight={900}>وضعیت :</Typography>
                                {transfer.state === 0 ? 
                                <Chip size="small" color="warning" label="درجریان"></Chip> :
                                 transfer.state===1?
                                 <Chip size="small" color="success" label="اجرا شده"></Chip> :
                                 <Chip size="small" color="error" label="رد شده"></Chip>}
                            </StyledRowDark>
                            <StyledRowLight>
                                <Typography variant="body1" fontWeight={900}>تاریخ ارسال :</Typography>
                                <Typography variant="body2">{new Date(transfer.createdDate).toLocaleDateString()}</Typography>
                            </StyledRowLight>
                            <StyledRowDark>
                                <Typography variant="body1" fontWeight={900}>تاریخ اجرا :</Typography>
                                <Typography variant="body2">{transfer.state===1&&new Date(transfer.completeDate).toLocaleDateString()}</Typography>
                            </StyledRowDark>
                            <Typography variant="h6" color="primary">معلومات ارسال کننده</Typography>
                            <Divider />
                            <StyledRowDark>
                                <Typography variant="body1" fontWeight={900}>ارسال کننده :</Typography>
                                <Typography variant="body2">{transfer.fromName} {transfer.fromLastName}</Typography>
                            </StyledRowDark>
                            <StyledRowLight>
                                <Typography variant="body1" fontWeight={900}>شماره تماس :</Typography>
                                <Typography variant="body2">{transfer.fromPhone}</Typography>
                            </StyledRowLight>
                            <Typography variant="h6" color="primary">معلومات دریافت کننده</Typography>
                            <Divider />
                            <StyledRowLight>
                                <Typography variant="body1" fontWeight={900}>دریافت کننده :</Typography>
                                <Typography variant="body2">{transfer.toName} {transfer.toLastName}</Typography>
                               
                            </StyledRowLight>
                            <StyledRowDark>
                                <Typography variant="body1" fontWeight={900}>ولد :</Typography>
                                <Typography variant="body2">{transfer.toFatherName}</Typography>

                            </StyledRowDark>
                            <StyledRowLight>
                                <Typography variant="body1" fontWeight={900}>ولدیت :</Typography>
                                <Typography variant="body2">{transfer.toGrandFatherName}</Typography>

                            </StyledRowLight>
                            <StyledRowDark>
                                <Typography variant="body1" fontWeight={900}>شماره تماس :</Typography>
                                <Typography variant="body2">{transfer.toPhone}</Typography>
                               
                            </StyledRowDark>
                            <StyledRowLight>
                                <Typography variant="body1" fontWeight={900}>نمبر تذکره :</Typography>
                                <Typography variant="body2">{transfer.toSId}</Typography>

                            </StyledRowLight>
                            <StyledRowDark>
                                <Typography variant="body1" fontWeight={900}>مقدار پول دریافتی :</Typography>
                                <Typography variant="body2"><CurrencyText value={transfer.destinationAmount} priceName={transfer.toCurrency}/></Typography>
                            </StyledRowDark>
                            <StyledRowLight>
                                <Typography variant="body1" fontWeight={900}>ملاحظات :</Typography>
                                <Typography variant="body2">{transfer.comment}</Typography>
                            </StyledRowLight>   
                            <StyledRowLight>
                                {transfer.state===0&&
                                <Button
                                onClick={handleCompletetClick}
                                    size="small"
                                    variant="contained">
                                    اجرا کردن
                                </Button>}
                            </StyledRowLight>
                            {completeDialogOpen && <CDialog
                                title="اجرای حواله"
                                open={completeDialogOpen}
                                onClose={() => setCompleteDialogOpen(!completeDialogOpen)}
                            >
                                <SetTransferCompleteForm transferId={transfer.id} onSubmited={()=> navigate("/customer/transfers")} />
                            </CDialog>}
                        </CardContent>
                    }
                </Card>
            </Grid>

        </Grid>
    )
}