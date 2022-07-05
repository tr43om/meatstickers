import { CircularProgress, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useCollection } from "../hooks/useCollection";
import Activity from "../components/Activity";

const News = () => {
  const { documents: activities } = useCollection("events");
  if (!activities) return <CircularProgress />;
  return (
    <Container>
      <Stack spacing={2}>
        {activities.map((activity, i) => (
          <Activity key={i} activity={activity} />
        ))}
      </Stack>
    </Container>
  );
};
export default News;
