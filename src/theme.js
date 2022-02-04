import { createTheme } from "@material-ui/core/styles";

const theme = {
  palette: {
    primary: {
      main: "#1477d5",
    },
    error: {
      main: "#f1453d",
    },
    success: {
      main: "#5fb760",
      contrastText: "#fff",
    },
    warning: {
      main: "#eeac57",
      contrastText: "#fff",
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      variant: "contained",
    },
    MuiTextField: {
      autoComplete: "off",
      margin: "dense",
      variant: "outlined",
      InputLabelProps: { shrink: true },
    },
  },
  overrides: {
    MuiButton: {
      root: {
        padding: "6px 24px",
        textTransform: "none",
      },
    },
    MuiTableCell: {
      root: {
        textAlign: "center",
        whiteSpace: "nowrap",
      },
      head: {
        backgroundColor: "#f5f5f5",
      },
    },
  },
};

export default createTheme(theme);
