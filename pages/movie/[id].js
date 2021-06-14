import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const movieId = query.id;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.THEMOVIEDB_API_KEY}&language=es-MX`
  );
  const movieData = await response.json();

  const { overview, title } = movieData;

  const res = await fetch(
    `https://streaming-availability.p.rapidapi.com/get/ultra?tmdb_id=movie%2F${movieId}`,
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
      movie: data,
      title,
      overview,
    },
  };
}

export default function movie({ movie, title, overview, notFound }) {
  const router = useRouter();
  // Obtengo los proveedores
  let providers = [];

  Object.entries(movie.streamingInfo).forEach((provider) => {
    if (provider[1].ar?.link) {
      providers.push({
        name: provider[0],
        link: provider[1].ar?.link,
      });
    }
  });
  if (notFound)
    return <h1 className="text-white text-xl p-4">Película no encontrada.</h1>;

  return (
    <>
      <div className="flex justify-between">
        <p className="text-white text-xl p-4 font-bold">
          {title} ({movie.year})
        </p>

        <p
          onClick={() => router.back()}
          className="text-white text-xl p-4 cursor-pointer transform hover:scale-110 font-bold"
        >
          &#x2190; Volver
        </p>
      </div>
      <div className="flex flex-wrap -mx-1 overflow-hidden">
        <div className="my-1 px-1 w-full overflow-hidden lg:w-1/3 xl:w-1/3 flex justify-center">
          <Image
            width="300"
            height="300"
            objectFit="contain"
            src={movie.posterURLs[500]}
          />
        </div>
        <div className="flex flex-col my-1 px-1 w-full overflow-hidden lg:w-2/3 xl:w-2/3">
          <p className="text-white text-xl pl-2"> {overview} </p>
          <div>
            <Link href={`https://www.imdb.com/title/${movie.imdbID}`}>
              <a target="_blank" className="pl-2 text-yellow-400 flex">
                <img
                  src="/svg/icons/IMDb.svg"
                  alt="IMDB"
                  title="IMDb Rating"
                  className="w-16 inline"
                />
                <p className="text-4xl sm:text-xl font-bold self-center pl-4">
                  {movie.imdbRating.toString().split("").join(".")}
                </p>
              </a>
            </Link>
            <Link href={`https://www.youtube.com/watch?v=${movie?.video}`}>
              <a target="_blank" className="flex text-white pl-2">
                <img
                  src="/svg/icons/youtube.svg"
                  alt="Ver Tráiler"
                  title="Ver Tráiler"
                  className="w-12 inline"
                />
                <p className="text-4xl sm:text-2xl font-bold self-center pl-4 text-red-500">
                  Ver tráiler
                </p>
              </a>
            </Link>
          </div>

          <p className="text-5xl sm:text-3xl font-bold self-center py-2 sm:py-0 pl-4 text-white  transform group-hover:translate-y-0 group-hover:opacity-100 transition flex">
            Ver en:
          </p>
          {providers.length > 0 ? (
            providers.map((provider, i) => (
              <Link href={provider.link} key={i}>
                <a
                  target="_blank"
                  className="hover:scale-110 self-center text-white  transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                >
                  <img
                    src={`/svg/provider/${provider.name}.svg`}
                    alt={`Ver en ${provider.name}`}
                    title={`Ver en ${provider.name}`}
                    className="w-36 sm:w-28 self-center pb-3"
                  />
                </a>
              </Link>
            ))
          ) : (
            <p className="text-3xl font-bold pl-4 text-white self-center transform group-hover:translate-y-0 group-hover:opacity-100 transition flex">
              No disponible
            </p>
          )}
        </div>
      </div>
    </>
  );
}
