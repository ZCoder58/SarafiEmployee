import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Fab } from "@mui/material";
import React from 'react'

// import { Link } from "react-router-dom";
export default function GoToTopButton({show=false}) {
  return show &&  (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        zIndex: "999",
        right: 5,
        bottom: 5
      }}
    >
      <ExpandLessIcon />
    </Fab>
  )
}
