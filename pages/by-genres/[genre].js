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
    `https://streaming-availability.p.rapidapi.com/search/ultra?country=ar&services=${services}&type=movie&order_by=${orderBy}&year_min=2000&year_max=2021&page=${page}&genres=${genre.id}&genres_relation=or&desc=true&min_imdb_rating=60&max_imdb_rating=90&min_imdb_vote_count=10000&max_imdb_vote_count=1000000`,
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
      total_pages: data.total_pages,
    },
  };
}

// export const getStaticPaths = async () => {
//   const paths = genres.map((genre) => ({
//     params: { genre: genre.name },
//   }));

//   return { paths, fallback: false };
// };

const getProvider = (services, service) => {
  let providers = "";
  let providersArr = services.split(",");
  if (services.search(service) >= 0) {
    providers = providersArr.filter((e) => e !== service).join(",");
  } else {
    providersArr.push(service);
    providers = providersArr.join(",");
  }

  return providers;
};

export default function genre({
  movies,
  genre,
  page = 1,
  orderBy,
  providers,
  total_pages = 1,
}) {
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

      <div className="flex flex-col sm:flex-row sm:justify-between">
        <p className="text-white text-xl p-4">
          Ordenar por:{" "}
          <span className="block sm:inline">
            <Link
              href={{
                pathname: `/by-genres/${genre.name}`,
                query: { provider: router.query.provider },
              }}
            >
              <a
                className={`font-bold px-1 cursor-pointer ${
                  orderBy === "imdb_vote_count" && "text-yellow-500"
                }`}
              >
                Más populares
              </a>
            </Link>
            -
            <Link
              href={{
                pathname: `/by-genres/${genre.name}`,
                query: { orderBy: "year", provider: router.query.provider },
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
                query: {
                  orderBy: "imdb_rating",
                  provider: router.query.provider,
                },
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
        <div className=" text-white text-xl p-4">
          Mostrar de:
          <div className="flex sm:inline">
            <Link
              href={{
                pathname: `/by-genres/${genre.name}`,
                query: {
                  provider: `${getProvider(providers, "netflix")}`,
                  orderBy: router.query.orderBy,
                },
              }}
            >
              <div className="cursor-pointer inline-block px-2 hover:scale-110 transform transition">
                <img
                  src="/svg/provider/netflix.svg"
                  alt="Netflix"
                  title="Netflix"
                  className={`w-16 sm:w-24 inline ${
                    providers.search("netflix") >= 0
                      ? "opacity-100"
                      : "opacity-25"
                  }`}
                />
                {providers.search("netflix") >= 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-green-500 inline pl-2"
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                )}
              </div>
            </Link>
            <Link
              href={{
                pathname: `/by-genres/${genre.name}`,
                query: {
                  provider: `${getProvider(providers, "prime")}`,
                  orderBy: router.query.orderBy,
                },
              }}
            >
              <div className="cursor-pointer inline-block px-2 hover:scale-110 transform transition">
                <img
                  src="/svg/provider/prime.svg"
                  alt="Prime Video"
                  title="Prime Video"
                  className={`w-16 sm:w-24 inline ${
                    providers.search("prime") >= 0
                      ? "opacity-100"
                      : "opacity-25"
                  }`}
                />
                {providers.search("prime") >= 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-green-500 inline pl-2"
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                )}
              </div>
            </Link>
            <Link
              href={{
                pathname: `/by-genres/${genre.name}`,
                query: {
                  provider: `${getProvider(providers, "disney")}`,
                  orderBy: router.query.orderBy,
                },
              }}
            >
              <div className="cursor-pointer inline-block px-2 hover:scale-110 transform transition">
                <img
                  src="/svg/provider/disney.svg"
                  alt="Disney +"
                  title="Disney +"
                  className={`w-16 sm:w-24 inline ${
                    providers.search("disney") >= 0
                      ? "opacity-100"
                      : "opacity-25"
                  }`}
                />
                {providers.search("disney") >= 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-green-500 inline pl-2"
                  >
                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid place-items-center min-h-screen">
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </section>
        <section>
          <PaginationButtons page={page} maxPage={total_pages} />
        </section>
      </div>
    </>
  );
}
