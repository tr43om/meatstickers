import { Button, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const NotFound = () => {
  const [progress, setProgress] = useState(5);
  const router = useRouter();
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 1);
    }, 1000);
    setTimeout(() => {
      router.push("/");
    }, progress * 1000);

    return () => {
      clearInterval(timer);
    };
  }, [router, progress]);
  return (
    <Container>
      <Typography variant="h1">Oops ....</Typography>
      <Typography variant="h2">That page cannot be found</Typography>
      <Link href="/">
        <a>
          <Button variant="outlined">Go back to the home page</Button>
        </a>
      </Link>
      <Typography variant="p">
        You will be redirected to home page in {progress} sec...
      </Typography>
      <CircularProgress />
    </Container>
  );
};
export default NotFound;
