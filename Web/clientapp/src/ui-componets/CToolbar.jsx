import React from "react";
import { Box, ButtonGroup } from "@mui/material";
/**
 * children should be only buttons
 * @param {children} param0 
 * @returns 
 */
function CToolbar({ children }) {
  return (
    <Box
      sx={{
        padding: "10px",
        // border: "1px solid #e4e3e2",
        margin: " 5px 5px",
        background: "#fbfbfb"
      }}
    >
      <ButtonGroup
        aria-label="text button group"
        variant="text"
        color="secondary"
        size="small"
      >
        {children}
      </ButtonGroup>
    </Box>
  );
}

export default CToolbar;
