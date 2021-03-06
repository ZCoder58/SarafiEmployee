import { Avatar, Typography, Grid, TextField, Divider } from '@mui/material'
import React from 'react'
import authAxiosApi from '../../../axios'
import { SkeletonFull } from '../../../ui-componets'
import CountriesRatesStatic from '../../../helpers/statics/CountriesRatesStatic'
const model = {
    destinationPriceName: "",
    destinationFlagPhoto: "",
    destinationRate: 0,
    sourcePriceName: "",
    sourceFlagPhoto: "",
    sourceRate: 0,
    tax: 0
}
export default function TestRate({ customerRateId }) {
    const [rateTestModel, setRateTestModel] = React.useState(model)
    const [ratesOrginalResult, setRatesOrginalResult] = React.useState({ sourceResult: 0, distResult: 0 })
    const [ratesModifiedResult, setRatesModifiedResult] = React.useState({ sourceResult: 0, distResult: 0 })
    const [loading, setLoading] = React.useState(false)
    function calculateSourceRate(value) {
        if(value<1){
            value=1
        }
        const exchangeRate=value * rateTestModel.sourceRate
        setRatesOrginalResult({
            sourceResult: value,
            distResult: exchangeRate.toFixed(5)
        })
        const echangeRateModified=exchangeRate+rateTestModel.tax;
        setRatesModifiedResult({
            sourceResult: value,
            distResult: echangeRateModified.toFixed(5)
        })
    }
  
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await authAxiosApi.get('customer/rates/test/' + customerRateId).then(r => {
                setRateTestModel(r)
                setRatesOrginalResult({
                    sourceResult: 1,
                    distResult: r.sourceRate
                })
                setRatesModifiedResult({
                    sourceResult: 1,
                    distResult: (r.sourceRate+r.tax)
                })
            })
            setLoading(false)
        })()
        return () => {
            setRateTestModel(model)
        }
    }, [customerRateId])

    return (
        <>
            {loading ? <SkeletonFull /> : (
                <Grid container spacing={2}>

                    <Grid item lg={12} md={12} xs={12}>
                        <Typography variant='h6' fontWeight={900}>?????? ?????????? ?????? ????????</Typography>
                        <Typography variant="body1">?????? ?????? ???????? ?????????? ??????????</Typography>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="??????"
                            value={ratesOrginalResult.sourceResult}
                            type="number"
                            size="small"
                            onChange={(e) => calculateSourceRate(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <>
                                        <Avatar sx={{ mr: 2, width: 20, height: 20 }} src={CountriesRatesStatic.flagPath(rateTestModel.sourceFlagPhoto)} alt={rateTestModel.sourcePriceName} variant="square" />
                                    </>
                                ),
                                endAdornment: (
                                    <Typography sx={{ ml: 1 }} variant="body1">{rateTestModel.sourcePriceName}</Typography>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="??????????"
                            type="number"
                            size="small"
                            value={ratesOrginalResult.distResult}
                            InputProps={{
                                readOnly:true,
                                startAdornment: (
                                    <Avatar sx={{ mr: 2, width: 20, height: 20 }} alt={rateTestModel.destinationName} variant="square" src={CountriesRatesStatic.flagPath(rateTestModel.destinationFlagPhoto)} />
                                ),
                                endAdornment: (
                                    <Typography sx={{ ml: 1 }} variant="body1">{rateTestModel.destinationPriceName}</Typography>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        <Typography variant='h6' fontWeight={900}>?????? ?????????? ?????? ???????????? ??????</Typography>
                        <Typography variant="body1">?????? ?????? ???? ?????????? ??????????</Typography>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="??????"
                            value={ratesModifiedResult.sourceResult}
                            type="number"
                            size="small"
                            
                            InputProps={{
                                readOnly:true,
                                startAdornment: (
                                    <>
                                        <Avatar sx={{ mr: 2, width: 20, height: 20 }} src={CountriesRatesStatic.flagPath(rateTestModel.sourceFlagPhoto)} alt={rateTestModel.sourcePriceName} variant="square" />
                                    </>
                                ),
                                endAdornment: (
                                    <Typography sx={{ ml: 1 }} variant="body1">{rateTestModel.sourcePriceName}</Typography>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <TextField
                            variant="outlined"
                            label="??????????"
                            type="number"
                            size="small"
                            helperText={rateTestModel.tax===0?"?????? ?????????? ???? ???????? ?????? ?????? ?????? ???????? ??????":(rateTestModel.tax>0?(`?????????? ${rateTestModel.tax} ${rateTestModel.destinationPriceName} ?????????? ?????? ??????`):(`?????????? ${rateTestModel.tax} ${rateTestModel.destinationPriceName} ???? ?????? ??????`))}
                            value={ratesModifiedResult.distResult}
                            InputProps={{
                                disableInjectingGlobalStyles:true,
                                readOnly:true,
                                startAdornment: (
                                    <Avatar sx={{ mr: 2, width: 20, height: 20 }} alt={rateTestModel.destinationName} variant="square" src={CountriesRatesStatic.flagPath(rateTestModel.destinationFlagPhoto)} />
                                ),
                                endAdornment: (
                                    <Typography sx={{ ml: 1 }} variant="body1">{rateTestModel.destinationPriceName}</Typography>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
            )}
        </>
    )
}