import Link from "next/link";
export const Option = ({ url, path, desc }) => {
  return (
    <div className="my-2 px-2 w-full overflow-hidden lg:w-1/3 xl:w-1/3">
      <Link href={`/${url}`}>
        <a className="flex flex-col justify-items-center justify-center py-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
          <img
            loading="lazy"
            src={path ? `/svg/${path}/${url}.svg` : `/svg/${url}.svg`}
            alt={url}
            className="w-24 self-center"
          />
          <span className="text-lg text-white self-center"> {desc} </span>
        </a>
      </Link>
    </div>
  );
};
