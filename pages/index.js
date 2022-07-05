import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import BottomNavbar from "../components/BottomNavbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Meatstickers</title>
      </Head>
      <div>
        <h1>Homepage</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi porro,
          blanditiis ullam ipsam culpa minima cumque odit incidunt laudantium
          cum ea eum, voluptatibus sequi pariatur aspernatur, reprehenderit eos
          architecto mollitia.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi porro,
          blanditiis ullam ipsam culpa minima cumque odit incidunt laudantium
          cum ea eum, voluptatibus sequi pariatur aspernatur, reprehenderit eos
          architecto mollitia.
        </p>
      </div>
    </>
  );
}
