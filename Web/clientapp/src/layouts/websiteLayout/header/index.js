import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useMediaQuery } from '@mui/material';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { useDispatch } from 'react-redux';
import {A_LayoutScrolled,A_LayoutScrolledZero} from '../../../redux/actions/WebsiteActions'
import { useTheme } from '@mui/material/styles';
function ElevationScroll(props) {
  const { children, window } = props;
  const dispatch=useDispatch()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });  
  React.useEffect(()=>{
    if(trigger){
      dispatch(A_LayoutScrolled())
    }else{
      dispatch(A_LayoutScrolledZero())
    }
  },[trigger,dispatch])
  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
  });
}
ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
export default function Header(props) {
  const theme = useTheme();
  const screenMachedUpMd=useMediaQuery(theme.breakpoints.up("md"))
  return (
    <>
      <ElevationScroll {...props}>
        <AppBar color="transparent" sx={{
           padding:"10px 0",
          '&.MuiPaper-elevation2': {
            padding:"0 0",
            backgroundColor:`${theme.palette.common.white}` ,
            transition: "0.3s all ease",
            // backdropFilter:"blur(20px)",
          },
          '&.MuiPaper-elevation0': {
            borderBottom:`1px solid ${theme.palette.primaryTransparent.main}`,
            transition: "0.3s all ease",
            backgroundColor:theme.palette.common.white,
          }
        }}>
          {screenMachedUpMd?<DesktopNav/>:<MobileNav/>}
        </AppBar>
      </ElevationScroll>
    </>
  );
}
