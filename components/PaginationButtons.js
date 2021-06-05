import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const PaginationButtons = ({ page = 1 }) => {
  const router = useRouter();
  return (
    <div className="flex my-4">
      {page > 1 && (
        <button
          onClick={() => router.back()}
          className="border border-white text-white rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-gray-300 hover:text-gray-800"
        >
          <svg
            className="h-5 w-5 mr-2 fill-current"
            x="0px"
            y="0px"
            viewBox="-49 141 512 512"
            style={{ enableBackground: "new -49 141 512 512" }}
            xmlSpace="preserve"
          >
            <path
              id="XMLID_10_"
              d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"
            ></path>
          </svg>
          Anterior
        </button>
      )}
      <Link
        href={{
          pathname: ``,
          query: { ...router.query, page: +page + 1 },
        }}
      >
        <button className="border border-white bg-white text-gray-800 rounded-sm font-bold py-4 px-6 ml-2 flex items-center hover:bg-gray-300">
          Siguiente
          <svg
            className="h-5 w-5 ml-2 fill-current"
            clasversion="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="-49 141 512 512"
            style={{ enableBackground: "new -49 141 512 512" }}
            xmlSpace="preserve"
          >
            <path
              id="XMLID_11_"
              d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
            l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
            c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};
