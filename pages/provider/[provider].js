import Link from "next/link";
import { useRouter } from "next/router";
import { MovieCard } from "../../components/MovieCard";
import { PaginationButtons } from "../../components/PaginationButtons";

export async function getServerSideProps({ query }) {
  const provider = query.provider;
  const page = query.page || 1;
  const orderBy = query.orderBy || "imdb_vote_count";
  const res = await fetch(
    `https://streaming-availability.p.rapidapi.com/search/ultra?country=ar&services=${provider}&type=movie&order_by=${orderBy}&year_min=2000&year_max=2021&page=${page}&desc=true&min_imdb_rating=60&max_imdb_rating=90&min_imdb_vote_count=10000&max_imdb_vote_count=1000000`,
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
      provider,
      page,
      orderBy,
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

export default function provider({
  movies,
  provider,
  page,
  total_pages = 1,
  orderBy,
}) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <p className="text-white text-xl p-4">
          Mejores películas de{" "}
          <span className="capitalize font-bold">{provider}</span>
        </p>

        <p
          onClick={() => router.push("/")}
          className="text-white text-xl p-4 cursor-pointer transform hover:scale-110 font-bold"
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
                pathname: `/provider/${provider}`,
                query: {},
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
                pathname: `/provider/${provider}`,
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
                pathname: `/provider/${provider}`,
                query: {
                  orderBy: "imdb_rating",
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
