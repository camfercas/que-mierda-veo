import Link from "next/link";

export default function About() {
  return (
    <>
      <section>
        <h1
          className="text-white text-4xl p-4 text-center font-bold"
          style={{ fontFamily: "Stint Ultra Condensed" }}
        >
          El sitio para saber que mierd* ver y donde mierd* verla.{" "}
        </h1>
        <h2
          className="text-white text-xl p-4"
          style={{ fontFamily: "Source Sans Pro" }}
        >
          A todos nos pasó de estar un día al pedo y no saber que mierd* ver,
          acá te recomendamos películas y de paso te decimos donde mierd*
          verlas.
        </h2>
        <h2 className="text-white text-xl p-4">
          Solo disponible para Netflix, Prime Video y Disney +.
        </h2>
      </section>

      <section>
        <h1
          className="text-white text-4xl p-4 text-center font-bold"
          style={{ fontFamily: "Stint Ultra Condensed" }}
        >
          Atribuciones
        </h1>
        <div className="flex">
          <Link href="https://www.themoviedb.org/">
            <a target="_blank">
              <img
                src="/svg/icons/tmdb.svg"
                alt="tmdb"
                className="w-48 cursor-pointer p-2"
                title="TMDB"
              />
            </a>
          </Link>
          <p className="text-white text-xl ">
            - Esta web utiliza la API de TMDB.
          </p>
        </div>
      </section>
    </>
  );
}
