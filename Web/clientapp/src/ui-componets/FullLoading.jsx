import React from 'react'
import {LinearProgress, styled} from '@mui/material'
// material-ui
// import CircularProgress from '@mui/material/CircularProgress';

// ==============================||Liner Top LOADER ||============================== //
const LoaderWrapper = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%',
});
const Loader = () => (
    <LoaderWrapper>
        <LinearProgress color="primary" />
    </LoaderWrapper>
);

// ==============================||Circle Center LOADER ||============================== //
// const Loader=()=>{
//     return (
//         <Box justifyContent="center" alignItems="center" display="flex" flexDirection="column" height="90vh">
//         <CircularProgress color="primary" size={90} thickness={4}/>
//     </Box>
//     )
// }
export default function FullLoading(){
    return (
        <Loader/>
    )

}