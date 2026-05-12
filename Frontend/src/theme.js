import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1", 
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899", 
      light: "#f472b6",
      dark: "#db2777",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: "#212121",
    },
    h5: {
      fontWeight: 600,
      color: "#212121",
    },
    h6: {
      fontWeight: 600,
      color: "#424242",
    },
    button: {
      textTransform: "none", 
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          },
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#4f46e5",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }
      }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: "0px 1px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                color: "#212121"
            }
        }
    }
  },
});

export default theme;
