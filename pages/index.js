import { Options } from "../components/Options";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const [searchByMovie, setSearchByMovie] = useState(true);

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = async ({ target }) => {
    setSearchValue(target.value);

    if (searchValue.length >= 3) {
      const type = searchByMovie ? "movie" : "person";

      const res = await fetch(`/api/search/${type}?query=${searchValue}`);
      const data = await res.json();
      if (data) {
        setSearchResults(data);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleKeyDown = ({ key, target }) => {
    if (key === "Enter") {
      router.push({
        pathname: "/search",
        query: { q: target.value },
      });
    }
  };

  const handleClickSearch = (e) => {
    router.push({
      pathname: "/search",
      query: { q: searchValue },
    });
  };

  const handleResultClick = (id) => {
    if (searchByMovie) {
      router.push({
        pathname: `/movie/${id}`,
      });
    } else {
      router.push({
        pathname: "/search",
        query: { q: id, t: "person" },
      });
    }
  };

  return (
    <>
      <div className="text-white text-xl p-4 inline w-full">
        Buscar por:
        <span
          onClick={() => setSearchByMovie(true)}
          className={`font-bold px-1 inline cursor-pointer ${
            searchByMovie && "text-yellow-500"
          }`}
        >
          Película
        </span>
        -
        <span
          onClick={() => setSearchByMovie(false)}
          className={`font-bold px-1 inline cursor-pointer ${
            !searchByMovie && "text-yellow-500"
          }`}
        >
          Actor/Actriz
        </span>
      </div>
      <div className="w-full h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative mt-5">
        <input
          type="search"
          name="search"
          id="search"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={
            searchByMovie
              ? "Donde mierd* veo esta película?"
              : "Donde mierd* veo a este actor/actriz?"
          }
          className="appearance-none w-full outline-none focus:outline-none active:outline-none"
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="ml-1 outline-none focus:outline-none active:outline-none"
          onClick={handleClickSearch}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
      {searchResults && (
        <>
          <ul className="flex flex-col mt-2">
            {searchResults.map(({ id, name, img, year }) => (
              <li
                key={id}
                onClick={() => handleResultClick(id, name)}
                className="border-gray-100 flex flex-row mb-2"
              >
                <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                    <img src={img} width="40" height="40" className="" />
                  </div>
                  <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium">{name}</div>
                    <div className="text-gray-600 text-sm">{year}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {}
      <Options />
    </>
  );
}
