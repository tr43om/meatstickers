import { Grid, Tooltip, Chip } from "@mui/material";
import { useRouter } from "next/router";
import { useFirestore } from "../hooks/useFirestore";
import { arrayRemove } from "firebase/firestore";

const TitlesList = ({ meatsticker }) => {
  const { updateDocument: deleteTitle } = useFirestore("meatstickers");
  const { addDocument: addEvent } = useFirestore("events");
  const handleDelete = (e) => {
    const { title, description } = e.target.closest("div").dataset;

    deleteTitle(meatsticker.id, {
      "titles.names": arrayRemove(title),
      "titles.descriptions": arrayRemove(description),
    });

    // addEvent({
    //   type: 'delete',
    //   description: `${user}`
    // })
  };

  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <Grid container spacing={1}>
      {meatsticker.titles &&
        meatsticker.titles.names.map((title, i) => (
          <Grid item key={title}>
            <Tooltip title={meatsticker.titles.descriptions[i]}>
              <Chip
                label={title}
                variant="outlined"
                clickable
                onDelete={pathname === "/profile" ? handleDelete : null}
                data-title={title}
                data-description={meatsticker.titles.descriptions[i]}
              />
            </Tooltip>
          </Grid>
        ))}
    </Grid>
  );
};
export default TitlesList;
