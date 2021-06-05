import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <p className="text-xl text-white text-center font-bold">404</p>
      <p className="text-xl text-white text-center">Página no encontrada.</p>
      <Link href="/">
        <p className="text-4xl text-white text-center font-bold cursor-pointer mt-5 hover:text-yellow-500">
          Ir al Inicio
        </p>
      </Link>
    </>
  );
}
