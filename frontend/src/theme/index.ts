import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF385C",
      dark: "#242424",
    },
    secondary: {
      main: "#FF385C",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          "&:hover": {
            outline: "2px solid #FF385C",
            boxShadow: "0 5px 12px rgb(0 0 0 / 0.5)",
          },
        },
      },
    },
  },
});
