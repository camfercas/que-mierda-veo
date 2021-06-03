import { useRouter } from "next/router";
import { MovieCard } from "../../components/MovieCard";
// import Link from "next/link";
// import { PaginationButtons } from "../../components/PaginationButtons";

export async function getServerSideProps({ query }) {
  const keyword = query.q;
  const page = query.page || 1;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THEMOVIEDB_API_KEY}&query=${keyword}&page=1&include_adult=false`
  );
  const data = await res.json();
  // console.log(data);
  let movies = [];
  if (!data?.results) {
    return {
      notFound: true,
    };
  } else {
    movies = await Promise.all(
      data?.results
        .sort(function (a, b) {
          return b.popularity - a.popularity;
        })
        .slice(0, 8)
        .map(async (movie) => {
          const res = await fetch(
            `https://streaming-availability.p.rapidapi.com/get/ultra?tmdb_id=movie%2F${movie.id}`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
                "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
              },
            }
          );
          try {
            const data = await res.json();
            return data;
          } catch (error) {
            return {};
          }
        })
    );
  }
  // console.log(movies);

  return {
    props: {
      movies,
      keyword,
      page,
    },
  };
}

export default function search({ movies, keyword = "", notFound = false }) {
  const router = useRouter();
  // console.log(movies);
  if (!movies || movies.length === 0 || notFound === true) {
    return (
      <>
        <div className="flex justify-between">
          <p className="text-white text-xl p-4">
            Coincidencias encontradas para:{" "}
            <span className="capitalize font-bold">{keyword}</span>
          </p>

          <p
            onClick={() => router.back()}
            className="text-white text-xl p-4 cursor-pointer transform hover:scale-110"
          >
            &#x2190; Volver
          </p>
        </div>
        <p className="text-xl text-white text-center">
          No se han encontrado resultados.
        </p>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-between">
        <p className="text-white text-xl p-4">
          Coincidencias encontradas para:{" "}
          <span className="capitalize font-bold">{keyword}</span>
        </p>

        <p
          onClick={() => router.back()}
          className="text-white text-xl p-4 cursor-pointer transform hover:scale-110"
        >
          &#x2190; Volver
        </p>
      </div>

      <div className="grid place-items-center min-h-screen">
        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {movies.map(
            (movie) =>
              Object.keys(movie).length > 0 && (
                <MovieCard key={movie.imdbID} movie={movie} />
              )
          )}
        </section>
      </div>
    </>
  );
}
