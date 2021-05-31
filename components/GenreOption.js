import Link from "next/link";
export const GenreOption = ({ url, path, desc }) => {
  return (
    <div className="my-1 px-1 w-1/2 overflow-hidden md:w-1/3 lg:w-1/4 xl:w-1/4">
      <Link href={`/${url}`}>
        <a className="flex flex-col justify-items-center justify-center py-2">
          <img
            loading="lazy"
            src={`/svg/${path}/${url}.svg`}
            alt={url}
            className="w-24 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 self-center"
          />
          <span className="text-lg text-white self-center"> {desc} </span>
        </a>
      </Link>
    </div>
  );
};
