import Head from "next/head";
import { Header } from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Que mierd* veo</title>
        <meta
          name="keywords"
          content="netflix, que veo, streaming, imdb, peliculas"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/svg/logo.svg" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
          rel="stylesheet"
        />
      </Head>

      <Header />
      <main
        className="container px-4 md:px-0 max-w-6xl mx-auto mt-5"
        style={{ fontFamily: "Source Sans Pro" }}
      >
        {children}
      </main>
    </>
  );
}
