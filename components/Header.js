import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header className="flex flex-col">
        <div className="flex items-center justify-center">
          <Link href="/">
            <img
              src="/svg/logo.svg"
              alt="quemierd*veo"
              className="w-32 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              title="Ir al incio"
            />
          </Link>
        </div>
        <p
          className="text-white flex items-center justify-center text-5xl"
          style={{ fontFamily: "Stint Ultra Condensed" }}
        >
          Qué mierd* veo?
        </p>
      </header>
    </>
  );
};
