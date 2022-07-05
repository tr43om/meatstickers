import { Container, Typography } from "@mui/material";

import Navbar from "../../components/Navbar";
import Head from "next/dist/shared/lib/head";

import { useCollection } from "../../hooks/useCollection";
import UserCard from "../../components/UserCard";

const Meatstickers = () => {
  const { documents: meatstickers } = useCollection("meatstickers");

  return (
    <>
      <Head>
        <title>Meatstickers | Titles</title>
      </Head>
      <Container maxWidth="lg">
        <Navbar />
        {meatstickers &&
          meatstickers.map((meatsticker) => (
            <UserCard meatsticker={meatsticker} key={meatsticker.id} />
          ))}
      </Container>
    </>
  );
};

export default Meatstickers;
