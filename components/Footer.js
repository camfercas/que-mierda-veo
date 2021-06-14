import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      className="flex flex-col justify-center mt-4"
      style={{ fontFamily: "Stint Ultra Condensed" }}
    >
      <div className="flex items-center justify-center border-t-2 border-dotted border-white self-center">
        <Link href="/about">
          <a className="text-white text-2xl flex items-center justify-center hover:underline">
            About
          </a>
        </Link>
        <p className="text-white text-3xl py-4 px-2">&#8226;</p>
        <img
          src="/svg/logo.svg"
          alt="quemierd*veo"
          className="w-5"
          title="quemierd*veo"
        />
        <p className="text-white text-2xl py-4 px-2">Qué mierd* veo?</p>
      </div>
    </footer>
  );
};
