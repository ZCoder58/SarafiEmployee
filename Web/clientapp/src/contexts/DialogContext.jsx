import { CloseOutlined } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography
} from "@mui/material";
import React, { useReducer, Suspense } from "react";
const T_OpenDialog = "SHOW";
const T_CloseDialog = "CLOSE";
const T_SetContentDialog = "SET_CONTENT";
const T_SetTitleDialog = "SET_TITLE";
const T_SetActionDialog = "SET_ACTION";
const initialState = {
  isOpen: false,
  content: undefined,
  title: undefined,
  action: undefined
};
const reducer = (state, action) => {
  switch (action.type) {
    case T_OpenDialog:
      return {
        ...state,
        isOpen: true
      };
    case T_CloseDialog:
      return initialState;
    case T_SetContentDialog:
      return {
        ...state,
        content: action.payload
      };
    case T_SetTitleDialog:
      return {
        ...state,
        title: action.payload
      };
    case T_SetActionDialog:
      return {
        ...state,
        action: action.payload
      };
    default:
      return state;
  }
};

const DialogContext = React.createContext({
  setDialogClose: () => {},
  setDialogContent: () => {},
  setDialogTitle: () => {},
  setDialogAction: () => {},
  setDialogOpen: () => {}
});
export const DialogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  function setDialogOpen() {
    dispatch({
      type: T_OpenDialog
    });
  }
  function setDialogClose() {
    dispatch({
      type: T_CloseDialog
    });
  }
  function setDialogContent(content) {
    dispatch({
      type: T_SetContentDialog,
      payload: content
    });
  }
  function setDialogTitle(title) {
    dispatch({
      type: T_SetTitleDialog,
      payload: title
    });
  }
  function setDialogAction(action) {
    dispatch({
      type: T_SetActionDialog,
      payload: action
    });
  }
  return (
    <DialogContext.Provider
      value={{
        setDialogOpen,
        setDialogClose,
        setDialogTitle,
        setDialogContent,
        setDialogAction
      }}
    >
      <Dialog open={state.isOpen} maxWidth="md">
        <DialogTitle>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h6">{state.title}</Typography>
            <IconButton onClick={() => setDialogClose()}>
              <CloseOutlined />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Suspense callback="لطفا صبر کنید ...">{state.content}</Suspense>
        </DialogContent>
        <DialogActions>{state.action}</DialogActions>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};
export default DialogContext;
