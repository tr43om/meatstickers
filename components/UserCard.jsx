import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { getNoun } from "../helpers";
import { useAuthContext } from "../hooks/useAuthContext";

import Link from "next/link";

const UserCard = ({ meatsticker }) => {
  const [expanded, setExpanded] = useState(false);
  const [names, setNames] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    if (meatsticker?.titles) {
      setNames(meatsticker.titles.names);
      setDescriptions(meatsticker.titles.descriptions);
    }
  }, [meatsticker?.titles]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Card
      sx={{
        marginTop: "2rem",
      }}
    >
      <CardHeader
        avatar={
          <Link
            href={
              user?.uid !== meatsticker.id
                ? `/meatstickers/${meatsticker.id}`
                : "/profile"
            }
          >
            <Avatar
              sx={{ width: "50px", height: "50px", cursor: "pointer" }}
              src={meatsticker.avatar}
            />
          </Link>
        }
        title={
          <Link
            href={
              user?.uid !== meatsticker.id
                ? `/meatstickers/${meatsticker.id}`
                : "/profile"
            }
          >
            {user?.uid !== meatsticker.id ? meatsticker.name : "Я"}
          </Link>
        }
        subheader={`${names.length ?? 0} ${getNoun(
          names.length,
          "титул",
          "титула",
          "титулов"
        )}`}
      />

      {names.length > 0 && (
        <CardContent sx={{ mt: "-1rem" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            🏆
            <ExpandMore expand={expanded} onClick={handleExpandClick}>
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid container spacing={1}>
              {names?.map((name, i) => (
                <Grid item key={name}>
                  <Tooltip title={descriptions[i]}>
                    <Chip label={name} variant="outlined" clickable />
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </CardContent>
      )}
    </Card>
  );
};
export default UserCard;
