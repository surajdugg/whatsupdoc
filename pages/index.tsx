import Head from "next/head";
import App from "../src/containers/App";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </>
  );
}
