
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {

  const theme = createTheme({
    palette: { mode: 'dark' }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Outlet/>
    </ThemeProvider>
  );
}

export default App;
