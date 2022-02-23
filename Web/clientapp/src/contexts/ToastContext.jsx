import React, { createContext } from "react";
import { useSnackbar } from "notistack";
import { Slide, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from '@mui/material'
const ToastContext = createContext({
  showToast: () => { },
  showError: () => { },
  showSuccess: () => { },
  showInfo: () => { },
  showWarning: () => { },
});

export const ToastContextProvider = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const theme = useTheme()
  function TransitionLeft(props) {
    return <Slide {...props} direction="up"></Slide>;
  }
  function showToast(content, variant) {
    let cKey = Math.random();
    enqueueSnackbar(content, {
      variant: variant,
      key: cKey,
      action: (
        <IconButton onClick={() => closeSnackbar(cKey)} size="small" >
          <CloseIcon fontSize="8px" sx={{
            color: theme.palette.common.white
          }} />
        </IconButton>
      ),
      TransitionComponent: TransitionLeft,
      anchorOrigin: { horizontal: "center", vertical: "bottom" }
    });
  }
  const showError = (content) => showToast(content, "error");
  const showSuccess = (content) => showToast(content, "Success");
  const showInfo = (content) => showToast(content, "Info");
  const showWarning = (content) => showToast(content, "warning");
 
  return (
    <ToastContext.Provider
      value={{
        showToast,
        showError,
        showSuccess,
        showWarning,
        showInfo,

      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
