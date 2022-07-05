import { Box, Modal, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 5,
};

const AddTitulModal = ({ open, handleClose, id, meatsticker }) => {
  const [titul, setTitul] = useState("");
  const [description, setDescription] = useState("");
  const { updateDocument: addTitul, response } = useFirestore("meatstickers");
  const { addDocument: addEvent } = useFirestore("events");
  const { user } = useAuthContext();

  useEffect(() => {
    setTitul("");
    setDescription("");
  }, [response.success]);

  const addNewTitul = async (e) => {
    e.preventDefault();

    if (titul === "" || description === "")
      toast.error("чел, че ты тыкаешь кнопку. у тебя поля пустые");

    await addTitul(id, {
      "titles.names": arrayUnion(titul),
      "titles.descriptions": arrayUnion(description),
    });

    await addEvent({
      type: "NEW_TITLE",
      titul,
      description,
      from: {
        name: user.displayName,
        avatar: user.photoURL,
        uid: user.uid,
      },
      to: {
        name: meatsticker.name,
        avatar: meatsticker.avatar,
        uid: id,
      },
    });

    toast.success(`Титул "${titul}"🎖️ добавлен`);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box component="form" sx={style}>
        <Stack spacing={3}>
          <TextField
            label="Титул"
            onChange={(e) => setTitul(e.target.value)}
            value={titul}
            required
          />
          <TextField
            label="Почему присуждается?"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            multiline
            rows={4}
            required
          />
          <LoadingButton
            type="submit"
            variant="outlined"
            loading={response.isPending}
            onClick={addNewTitul}
          >
            Добавить
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};
export default AddTitulModal;
