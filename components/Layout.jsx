import { createTheme, ThemeProvider, Box, CssBaseline } from "@mui/material";
import BottomNavbar from "../components/BottomNavbar";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#202020",
      },
      secondary: {
        main: "#5B63B7",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AuthContextProvider>{children}</AuthContextProvider>
      <BottomNavbar />
      <ToastContainer />
    </ThemeProvider>
  );
};
export default Layout;
