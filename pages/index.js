import { Options } from "../components/Options";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleKeyDown = ({ key, target }) => {
    if (key === "Enter") {
      router.push({
        pathname: "/search",
        query: { q: target.value },
      });
    }
  };

  return (
    <>
      <div className="w-full h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative mt-5">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Donde mierd* veo esta película?"
          className="appearance-none w-full outline-none focus:outline-none active:outline-none"
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="ml-1 outline-none focus:outline-none active:outline-none"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
      {}
      <Options />
    </>
  );
}
