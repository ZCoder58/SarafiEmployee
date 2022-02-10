import {
  CloseOutlined,
  RestoreOutlined,
  SaveOutlined
} from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  Stack,
  styled,
  Typography,
  useTheme
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { shouldForwardProp } from "@mui/system";
import useToast from "../../hooks/useToast.jsx";
import {
  setInfoPalette,
  setPrimaryPalette,
  saveTheme,
  resetTheme
} from "../../redux/actions/ThemeCustomizationActions.jsx";
const StyledInputBase = styled(InputBase, { shouldForwardProp })({
  "& .MuiInputBase-input": {
    width: "100px",
    height: "30px"
  }
});
const ColorPicker = ({ title, onChange, value }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="80%"
      alignItems="center"
    >
      <Typography variant="body2">{title}</Typography>
      <StyledInputBase type="color" onChange={onChange} value={value} />
    </Box>
  );
};
const ColorPaletteContainer = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    
  >
    {children}
  </Box>
);
export default function ThemeSettings({ open, closeAction }) {
  const { colors } = useSelector(state => state.R_WebsiteTheme);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const [primaryColor, setPrimaryColor] = React.useState({
    primaryMain: colors.primaryMain,
    primaryDark: colors.primaryDark,
    primaryLight: colors.primaryLight,
    primaryContrastText: colors.primaryContrastText
  });
  const [infoColor, setInfoColor] = React.useState({
    infoMain: colors.infoMain,
    infoDark: colors.infoDark,
    infoLight: colors.infoLight,
    infoContrastText: colors.infoContrastText
  });
  const onThemeSaved = React.useCallback(isSaved => {
    if (isSaved) {
      showToast("Successfully saved", "success");
      closeAction();
    } else {
      showToast("Field to save", "error");
    }
  }, [closeAction,showToast]);
  const theme = useTheme();
  function handleSaveTheme() {
    dispatch(saveTheme(onThemeSaved));
  }
  function handleResetTheme() {
    dispatch(resetTheme());
    showToast("Successfully saved", "success");
    closeAction();
  }

  // React.useEffect(() => {
  //   dispatch(setPrimaryPalette(primaryColor));
  // }, [primaryColor, dispatch]);

  // React.useEffect(() => {
  //   dispatch(setInfoPalette(infoColor));
  // }, [infoColor, dispatch]);

  return (
    <>
      <Drawer
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            minWidth: "270px"
          },
          [theme.breakpoints.down("sm")]: {
            "& .MuiDrawer-paper": {
              width: "100%"
            }
          }
        }}
        open={open}
        ModalProps={{ keepMounted: true }}
      >
        <Box>
          <IconButton onClick={() => closeAction()}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Stack direction="column" spacing={2} px={2}>
          <ColorPaletteContainer>
            <Typography variant="body1" fontWeight={700}>
              Primary colors
            </Typography>
            <ColorPicker
              title={"Main"}
              value={primaryColor.primaryMain}
              onChange={e =>
                setPrimaryColor(
                  s => (s = { ...s, primaryMain: e.target.value })
                )
              }
            />
            <ColorPicker
              title="Light"
              value={primaryColor.primaryLight}
              onChange={e =>
                setPrimaryColor(
                  s => (s = { ...s, primaryLight: e.target.value })
                )
              }
            />
            <ColorPicker
              title="Dark"
              value={primaryColor.primaryDark}
              onChange={e =>
                setPrimaryColor(
                  s => (s = { ...s, primaryDark: e.target.value })
                )
              }
            />
            <ColorPicker
              title="ContrastText"
              value={primaryColor.primaryContrastText}
              onChange={e =>
                setPrimaryColor(
                  s => (s = { ...s, primaryContrastText: e.target.value })
                )
              }
            />
          </ColorPaletteContainer>
          <ColorPaletteContainer>
            <Typography variant="body1" fontWeight={700}>
              Info colors
            </Typography>
            <ColorPicker
              title={"Main"}
              value={infoColor.infoMain}
              onChange={e =>
                setInfoColor(s => (s = { ...s, infoMain: e.target.value }))
              }
            />
            <ColorPicker
              title="Light"
              value={infoColor.infoLight}
              onChange={e =>
                setInfoColor(s => (s = { ...s, infoLight: e.target.value }))
              }
            />
            <ColorPicker
              title="Dark"
              value={infoColor.infoDark}
              onChange={e =>
                setInfoColor(s => (s = { ...s, infoDark: e.target.value }))
              }
            />
            <ColorPicker
              title="ContrastText"
              value={infoColor.infoContrastText}
              onChange={e =>
                setInfoColor(
                  s => (s = { ...s, infoContrastText: e.target.value })
                )
              }
            />
          </ColorPaletteContainer>
          <Button
            startIcon={<SaveOutlined />}
            onClick={() => handleSaveTheme()}
            fullWidth
            variant="contained"
            color="info"
          >
            Save
          </Button>
          <Button
            startIcon={<RestoreOutlined />}
            onClick={() => handleResetTheme()}
            fullWidth
            variant="text"
            color="info"
          >
            Default
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
