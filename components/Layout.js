import Head from "next/head";
import { Header } from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Que mierd* veo</title>
        <meta
          name="keywords"
          content="netflix, que, veo, streaming, imdb, peliculas,mierda,amazon prime,prime video,prime,disney,plus,mejores,donde ver pelicula,en que plataforma esta,mejores peliculas"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Busca que películas ver y dónde verlas. Solo disponible para Netflix, Prime Video y Disney +."
        ></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/svg/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/svg/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/svg/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/svg/favicon/site.webmanifest" />
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
