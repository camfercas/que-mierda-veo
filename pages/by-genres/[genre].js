import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MovieCard } from "../../components/MovieCard";
import { PaginationButtons } from "../../components/PaginationButtons";
import { genres } from "../../data/genres";

export async function getServerSideProps({ query }) {
  const genreName = query.genre;
  const page = query.page || 1;
  const orderBy = query.orderBy || "imdb_vote_count";
  const providers = query.provider || "netflix,prime,disney";
  const services = encodeURIComponent(providers);
  // Obtengo el genero
  const genre = genres.filter((e) => e.name === genreName)[0];
  const res = await fetch(
    `https://streaming-availability.p.rapidapi.com/search/ultra?country=ar&services=${services}&type=movie&order_by=${orderBy}&year_min=2000&year_max=2021&page=${page}&genres=${genre.id}&genres_relation=or&desc=true&min_imdb_rating=70&max_imdb_rating=90&min_imdb_vote_count=10000&max_imdb_vote_count=1000000`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
      },
    }
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movies: data.results,
      genre,
      page,
      orderBy,
      providers,
    },
  };
}

// export const getStaticPaths = async () => {
//   const paths = genres.map((genre) => ({
//     params: { genre: genre.name },
//   }));

//   return { paths, fallback: false };
// };

export default function genre({ movies, genre, page = 1, orderBy, providers }) {
  const router = useRouter();
  if (!movies) {
    return (
      <p className="text-xl text-white text-center">
        No se han encontrado resultados.
      </p>
    );
  }
  return (
    <>
      <div className="flex justify-between">
        <p className="text-white text-xl p-4">
          Mejores películas de <span className="font-bold">{genre.desc}</span>
        </p>

        <p
          onClick={() => router.push("/by-genres")}
          className="text-white text-xl font-bold p-4 cursor-pointer transform hover:scale-110"
        >
          &#x2190; Volver
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-white text-xl p-4">
          Ordenar por:{" "}
          <span className="block sm:inline">
            <Link
              href={{
                pathname: `/by-genres/${genre.name}`,
                query: {},
              }}
            >
              <a
                className={`font-bold px-1 cursor-pointer ${
                  orderBy === "imdb_vote_count" && "text-yellow-500"
                }`}
              >
                Más votadas
              </a>
            </Link>
            -
            <Link
              href={{
                pathname: `/by-genres/${genre.name}`,
                query: { orderBy: "year" },
              }}
            >
              <a
                className={`font-bold px-1 cursor-pointer ${
                  orderBy === "year" && "text-yellow-500"
                }`}
              >
                Más nuevas
              </a>
            </Link>
            -
            <Link
              href={{
                pathname: `/by-genres/${genre.name}`,
                query: { orderBy: "imdb_rating" },
              }}
            >
              <a
                className={`font-bold px-1 cursor-pointer ${
                  orderBy === "imdb_rating" && "text-yellow-500"
                }`}
              >
                Rating
              </a>
            </Link>
          </span>
        </p>
        <p className="text-white text-xl p-4">
          Ver de:
          <Link
            href={{
              pathname: `/by-genres/${genre.name}`,
              query: { provider: "prime,disney" },
            }}
          >
            <img
              src="/svg/provider/netflix.svg"
              alt="Netflix"
              title="Netflix"
              className={`w-20 inline px-2 ${
                providers.search("netflix") >= 0 ? "opacity-100" : "opacity-25"
              }`}
            />
          </Link>
        </p>
      </div>

      <div className="grid place-items-center min-h-screen">
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </section>
        <section>
          <PaginationButtons page={page} />
        </section>
      </div>
    </>
  );
}
