import Link from "next/link";
import { useRouter } from "next/router";
import { MovieCard } from "../components/MovieCard";
import { PaginationButtons } from "../components/PaginationButtons";
import { genres } from "./genres";

export async function getServerSideProps({ query }) {
  const genreName = query.genre;
  const page = query.page || 1;
  // Obtengo el genero
  const genre = genres.filter((e) => e.name === genreName)[0];
  const res = await fetch(
    `https://streaming-availability.p.rapidapi.com/search/ultra?country=ar&services=netflix%2Cprime%2Cdisney&type=movie&order_by=imdb_vote_count&year_min=2000&year_max=2020&page=${page}&genres=${genre.id}&genres_relation=or&desc=true&min_imdb_rating=70&max_imdb_rating=90&min_imdb_vote_count=10000&max_imdb_vote_count=1000000`,
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
    },
  };
}

// export const getStaticPaths = async () => {
//   const paths = genres.map((genre) => ({
//     params: { genre: genre.name },
//   }));

//   return { paths, fallback: false };
// };

export default function genre({ movies, genre, page }) {
  // console.log(movies);
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <p className="text-white text-lg p-4">
          Mejores películas de {genre.desc}
        </p>

        <p
          onClick={() => router.back()}
          className="text-white text-lg p-4 cursor-pointer transform hover:scale-110"
        >
          &#x2190; Volver
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
