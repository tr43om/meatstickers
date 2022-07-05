import {
  Box,
  AppBar,
  Typography,
  Container,
  styled,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

import { useTheme } from "@emotion/react";
export default function Navbar() {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  const theme = useTheme();
  return (
    <>
      <AppBar sx={{ padding: theme.spacing(2) }}>
        <Container>
          <Typography textAlign="center">
            🎖️ meatstickers <sup>BETA</sup>{" "}
          </Typography>
        </Container>
      </AppBar>
      <Offset />
    </>
  );
}
