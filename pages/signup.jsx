import {
  Container,
  TextField,
  Typography,
  Button,
  Stack,
  Input,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import Router from "next/router";

import { useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSignup } from "../hooks/useSignup";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [loading, setLoading] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, error } = useSignup();

  useEffect(() => {
    if (loading === false && !error) Router.push("/profile");
  }, [loading, error]);

  const joinTheClub = async (e) => {
    e.preventDefault();
    setLoading(true);

    await signup(email, password, `${name} ${patronymic}`, thumbnail);
    setLoading(false);
    if (!email || !password || !name || !patronymic)
      return toast.error("Не все поля заполнены 🍌");
    if (error?.includes("invalid-email"))
      return toast.error("Йоу, адрес эл. почты какой-то неправильный");
    if (!thumbnail) return toast.error("Не загружено фото");
    if (error?.includes("auth/email-already-in-use"))
      return toast.error(`Аккаунт с почтой ${email} уже существует`);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    if (selected.size > 500000) {
      setThumbnailError("Image file size must be less than 500kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <Container>
      <Stack
        spacing={2}
        component="form"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Typography>Регайся, салага</Typography>
        <TextField
          label="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <TextField
          label="Отчество"
          onChange={(e) => setPatronymic(e.target.value)}
          value={patronymic}
          required
        />

        <TextField
          label="Почта"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
        />

        <TextField
          label="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          required
        />

        <label htmlFor="icon-button-file">
          {thumbnail ? "Загрузилось брат" : "Загрузи фото брат"}
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            sx={{ display: "none" }}
            required
            onChange={handleFileChange}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <AddAPhotoIcon />
          </IconButton>
        </label>
        {thumbnailError && <div>{thumbnailError}</div>}

        <LoadingButton
          type="submit"
          variant="outlined"
          loading={loading}
          onClick={joinTheClub}
        >
          Вступить
        </LoadingButton>
        <Button
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => Router.push("/signin")}
        >
          Уже зареган
        </Button>
      </Stack>
    </Container>
  );
};
export default SignUp;
