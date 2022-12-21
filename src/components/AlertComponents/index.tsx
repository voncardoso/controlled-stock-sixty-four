import { Alert, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
      mode: "dark",
      error: {
        main: '#b49113',
      },
    },
  });


export function AlertComponents(){
    return(
        <ThemeProvider theme={theme}>
            <Alert 
                variant="outlined" 
                severity="error" 
                color="error"
            >
                E-mail ou senha está incorreto! 
            </Alert>
        </ThemeProvider>
    )
}