import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Stack,
  Box,
  CardActions,
  IconButton,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/dist/client/router";
// icons
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const Activity = ({ activity }) => {
  const router = useRouter();
  const getTitle = (type) => {
    switch (type) {
      case "NEW_TITLE":
        return "🆕 🏆";
      case "DELETED_TITLE":
        return "⛔ 🏆";
      default:
        return "жесть что случилось";
    }
  };

  const getMessage = (type) => {
    switch (type) {
      case "NEW_TITLE":
        return (
          <Stack spacing={2} alignItems="flex-start">
            <Box>
              <Chip
                avatar={
                  <Avatar alt={activity.from.name} src={activity.from.avatar} />
                }
                label={activity.from.name}
                variant="outlined"
                onClick={() =>
                  router.push(`/meatstickers/${activity.from.uid}`)
                }
              />{" "}
              добавил пользователю{" "}
              <Chip
                avatar={
                  <Avatar alt={activity.to.name} src={activity.to.avatar} />
                }
                label={activity.to.name}
                variant="outlined"
                onClick={() => router.push(`/meatstickers/${activity.to.uid}`)}
              />{" "}
              титул
            </Box>
            <Chip
              sx={{
                textTransform: "uppercase",
              }}
              label={`🎖️"${activity.titul}"🎖️`}
            />
            <Typography>Как утверждает {activity.from.name}:</Typography>
            <Typography style={{ fontStyle: "italic" }}>
              &ldquo;{activity.description}&rdquo;
            </Typography>
          </Stack>
        );

      default:
        break;
    }
  };

  return (
    <Card sx={{ p: "1rem" }}>
      <CardHeader
        title={getTitle(activity.type)}
        subheader={moment(
          new Date(activity.createdAt.seconds * 1000)
        ).fromNow()}
      />

      <CardContent>
        <Typography>{getMessage(activity.type)}</Typography>
      </CardContent>

      <CardActions>
        <IconButton>
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton>
          <ThumbDownOffAltIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Activity;
