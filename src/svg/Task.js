import React from "react";

function Icon({ active }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={active === "task" ? "#DE2574" : "#323232"}
        stroke={active === "task" ? "#DE2574" : "#323232"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 8h13v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8zM5 8h15M13.333 6h-1.666L10 8h5l-1.667-2z"
      ></path>
    </svg>
  );
}

export default Icon;
