import React from "react";
import Image from "next/image";
import Link from "next/link";

function timeConvert(n) {
  let num = n;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return rhours + "h " + rminutes + " min";
}

export const MovieCard = ({ movie }) => {
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

  return (
    <div className="bg-gray-900 shadow-lg rounded p-3">
      <div className="group relative">
        {movie.posterURLs.original ? (
          <Image
            className="w-full md:w-72 block rounded"
            src={movie?.posterURLs?.original}
            alt={movie.title}
            width={500}
            height={500}
            objectFit="contain"
          />
        ) : (
          <Image
            className="w-full md:w-72 block rounded"
            src="/svg/icons/no-photos.svg"
            alt={movie.title}
            width={500}
            height={500}
            objectFit="contain"
          />
        )}

        <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex flex-col items-center group-hover:opacity-100 transition justify-evenly">
          <Link href={`https://www.imdb.com/title/${movie.imdbID}`}>
            <a
              target="_blank"
              className="hover:scale-110 text-yellow-400 opacity-0 transform group-hover:translate-y-0 group-hover:opacity-100 transition flex"
            >
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
            <a
              target="_blank"
              className="hover:scale-110 text-white opacity-0 transform group-hover:translate-y-0 group-hover:opacity-100 transition flex"
            >
              <img
                src="/svg/icons/youtube.svg"
                alt="Ver Tráiler"
                title="Ver Tráiler"
                className="w-12 inline"
              />
              <p className="text-4xl sm:text-xl font-bold self-center pl-4">
                Ver tráiler
              </p>
            </a>
          </Link>
          <p className="text-5xl sm:text-3xl font-bold  pl-4 text-white opacity-0 transform group-hover:translate-y-0 group-hover:opacity-100 transition flex">
            Ver en:
          </p>
          {providers.length > 0 ? (
            providers.map((provider, i) => (
              <Link href={provider.link} key={i}>
                <a
                  target="_blank"
                  className="hover:scale-110 self-center text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
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
            <p className="text-3xl font-bold  pl-4 text-white opacity-0 transform group-hover:translate-y-0 group-hover:opacity-100 transition flex">
              No disponible
            </p>
          )}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-white text-lg">{movie.title}</h3>
        <div className="flex justify-between">
          <p className="text-gray-400">{movie.year}</p>
          <p className="text-gray-400 italic">{timeConvert(movie.runtime)}</p>
        </div>
      </div>
    </div>
  );
};

// const getProvider = (streamingInfo) => {
//   let provider = JSON.stringify(streamingInfo);
//   console.log(provider);

//   return provider;
// };
