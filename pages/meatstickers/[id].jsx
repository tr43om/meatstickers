import { useDocument } from "../../hooks/useDocument";
import { useRouter } from "next/router";
import {
  Avatar,
  Container,
  Stack,
  Typography,
  Chip,
  Grid,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddTitulModal from "../../components/AddTitulModal";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthContext();

  const { document: meatsticker } = useDocument("meatstickers", id);

  const [modal, setModal] = useState(false);

  if (!meatsticker) return <div>loading...</div>;
  return (
    <Container sx={{ mt: "2rem" }}>
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
        {!meatsticker.titles && (
          <Typography>
            У этого лоха пока что нет титулов, но ты можешь добавить ему первый
            титул
          </Typography>
        )}
        <Grid container spacing={1}>
          {meatsticker.titles &&
            meatsticker.titles.names.map((title, i) => (
              <Grid item key={title}>
                <Tooltip title={meatsticker.titles.descriptions[i]}>
                  <Chip label={title} variant="outlined" clickable />
                </Tooltip>
              </Grid>
            ))}
          <Grid item>
            <Chip
              variant="outlined"
              label="Добавить титул"
              icon={<AddIcon sx={{ fill: "primary" }} />}
              color="primary"
              onClick={() => {
                user?.uid
                  ? setModal(true)
                  : toast.error(
                      "Чтобы добавить титул, сначало нужно зарегистрироваться",
                      { autoClose: 1400 }
                    );
              }}
              clickable
            />
          </Grid>
        </Grid>
      </Stack>

      <AddTitulModal
        open={modal}
        handleClose={() => setModal(false)}
        id={id}
        meatsticker={meatsticker}
      />
    </Container>
  );
};
export default Details;
