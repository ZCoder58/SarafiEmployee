import { createTheme } from "@mui/material";
import themePalette from "./palette.jsx";
import themeComponents from "./components.jsx";
import typography from "./typography.jsx";
const websiteTheme = (colors) => {
  const themeOption = {
    colors: colors,
  }
  const theme=createTheme({
    direction: "rtl",
    palette:themePalette(themeOption),
    components: themeComponents(themeOption),
   typography:typography
  });
  return theme;
}
export default websiteTheme