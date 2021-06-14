import { genres } from "../../data/genres";
import { useRouter } from "next/router";
import { GenreOption } from "../../components/GenreOption";

export async function getStaticProps(context) {
  return {
    props: {
      allGenres: genres,
    },
  };
}

export default function byGenres({ allGenres }) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <p className="text-white text-xl p-4">Seleccione un género:</p>

        <p
          onClick={() => router.push("/")}
          className="text-white text-xl font-bold p-4 cursor-pointer transform hover:scale-110"
        >
          &#x2190; Volver
        </p>
      </div>
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
