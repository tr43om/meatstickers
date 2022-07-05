import { auth } from "../firebase.config";
import {
  InputLabel,
  OutlinedInput,
  Container,
  TextField,
  Box,
  Typography,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import Router from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLogin } from "../hooks/useLogin";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useAuthContext();
  const { addDocument } = useFirestore("meatstickers");
  const { login, isPending, error } = useLogin();
  useEffect(() => {
    if (user) Router.push("/profile");
  }, [user]);

  const enterTheClub = (e) => {
    e.preventDefault();
    console.log(error);
    login(email, password);
  };

  return (
    <Container
      sx={{
        display: "grid",
        gap: "1rem",
        justifyContent: "center",
        alignContent: "center",
        minHeight: "100vh",
      }}
      component="form"
    >
      <Typography>Захади, дарагой</Typography>
      <Box>
        <TextField
          label="Почта"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
      </Box>
      <Box>
        <TextField
          label="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        />
      </Box>
      <LoadingButton
        type="submit"
        variant="outlined"
        loading={isPending}
        onClick={enterTheClub}
      >
        Войти
      </LoadingButton>
      <Button
        endIcon={<ArrowForwardIosIcon />}
        onClick={() => Router.push("/signup")}
      >
        Зарегаться
      </Button>
    </Container>
  );
};
export default SignIn;
