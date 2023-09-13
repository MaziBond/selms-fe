import React from "react";

function Icon({ active }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 36 36"
    >
      <g data-name="Layer 3">
        <circle cx="16.86" cy="9.73" r="6.46" fill={active === "employment" ? "#DE2574" : "#323232"}></circle>
        <path d="M21 28H28V29.4H21z" fill={active === "employment" ? "#DE2574" : "#323232"}></path>
        <path 
          fill={active === "employment" ? "#DE2574" : "#323232"}
          d="M15 30v3a1 1 0 001 1h17a1 1 0 001-1V23a1 1 0 00-1-1h-7v-1.47a1 1 0 00-2 0V22h-2v-3.58a32.12 32.12 0 00-5.14-.42 26 26 0 00-11 2.39 3.28 3.28 0 00-1.88 3V30zm17 2H17v-8h7v.42a1 1 0 002 0V24h6z"></path>
      </g>
    </svg>
  );
}

export default Icon;
