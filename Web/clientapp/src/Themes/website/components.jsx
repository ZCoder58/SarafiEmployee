export default function themeComponents(theme) {
  return {
    MuiBackdrop:{
      styleOverrides:{
        root:{
          backdropFilter:"blur(3px)"
        }
      }
    },
    MuiTabPanel:{
      styleOverrides:{
        root:{
          padding:0
        }
      }
    },
    MuiCardContent:{
      styleOverrides:{
        root:{
          '& .MuiChip-sizeSmall':{
            fontSize:11
          }
        }
      }
    },
    MuiTableContainer:{
      styleOverrides:{
        root:{
          '& [data-tag]':{
            width:"100%"
          },
          '& .rdt_TableCell':{
            paddingTop:10,
          }
        }
      }
    },
    MuiChip:{
      styleOverrides:{
        root:{
          fontSize:11
        }
      }
    },
    // MuiListItem:{
    //   styleOverrides:{
    //     root:{
    //       paddingRight:8,
    //       paddingLeft:8,
    //       "&:hover":{
    //         backgroundColor:theme.colors.primaryTransparentMain
    //       }
    //     }
    //   }
    // },
    MuiListItemText:{
      styleOverrides:{
        root:{
          '& .MuiListItemText-secondary':{
            fontSize:12
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        'a':{
          textDecoration:"none"
        },
        '::-webkit-scrollbar': {
          width: "10px"
        },
        '::-webkit-scrollbar-track ': {
          backgroundColor: "#f1f1f1",
          borderRadius:50
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor:"#bfbfbf",
          borderRadius:50
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%"
        }
      },
      defaultProps: {
        autoComplete: "off",
        fullWidth: true,
        margin: "normal"
      }
    },
    MuiCard:{
      styleOverrides:{
        root:{
          border:"1px solid "+theme.colors.grey200
        }
      },
      defaultProps:{
        elevation:0
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        subheader: {
          fontSize: "0.75rem"
        }
      }
    },
    // MuiCardContent:{
    //   styleOverrides:{
    //     root:{
    //       // paddingTop:0
    //     }
    //   }
    // },
    MuiTableCell:{
      styleOverrides:{
        root:{
          '& .MuiListItem-root':{
            paddingLeft:0,
            paddingRight:0
          
         }
        }
        
      }
    },
    MuiDialogTitle:{
      styleOverrides:{
        root:{
          fontSize:"1.1rem"
        }
      }
    },
    MuiTab:{
      styleOverrides:{
        root:{
          minWidth:"50px"
        }
      }
    }
  };
}
