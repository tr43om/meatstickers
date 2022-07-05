import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
  Chip,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

import { useDocument } from "../hooks/useDocument";

import { useLogout } from "../hooks/useLogout";
import TitlesList from "../components/TitlesList";

const Profile = () => {
  const { loading, user } = useAuthContext();
  const { document: meatsticker } = useDocument("meatstickers", user?.uid);
  const router = useRouter();
  const { logout } = useLogout();

  // Route protection
  useEffect(() => {
    console.log(user);
    if (!loading && !user) {
      router.push("/signup");
    }
  }, [loading, user, router]);

  if (loading || !user || !meatsticker) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box>
        <Button
          variant="outlined"
          onClick={logout}
          sx={{
            display: "flex",
            justifyContent: "end",
            marginLeft: "auto",
            marginTop: "1rem",
          }}
          endIcon={<LogoutIcon />}
        >
          выйти
        </Button>
      </Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={"2rem"}
      >
        <Avatar src={meatsticker.avatar} sx={{ height: 196, width: 196 }} />
        <Typography textAlign="center" fontSize="1.3rem">
          {meatsticker.name}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">🏆 Титулы</Typography>
        {!meatsticker.titles && (
          <Typography>
            У тебя пока нет титулов, братик. Иди и зарабатывай!
          </Typography>
        )}
        <TitlesList meatsticker={meatsticker} />
      </Stack>
    </Container>
  );
};
export default Profile;
