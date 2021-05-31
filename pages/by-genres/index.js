import { genres } from "./genres";

import { GenreOption } from "../components/GenreOption";

export async function getStaticProps(context) {
  return {
    props: {
      allGenres: genres,
    },
  };
}

export default function byGenres({ allGenres }) {
  return (
    <>
      <p className="text-xl text-white">Selecciona un género:</p>
      <div className="flex flex-wrap overflow-hidden place-content-center place-items-center mt-5">
        {allGenres.map((genre, i) => (
          <GenreOption
            key={genre.id}
            url={`by-genres/${genre.name}`}
            path={`options`}
            desc={genre.desc}
          ></GenreOption>
        ))}
      </div>
    </>
  );
}
