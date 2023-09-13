import React from "react";

function Icon({ active }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 96 96"
    >
      <path 
        fill={active === "account" ? "#DE2574" : "#323232"}
      d="M69.368 51.006a30 30 0 10-42.736 0A41.997 41.997 0 000 90a5.997 5.997 0 006 6h84a5.997 5.997 0 006-6 41.997 41.997 0 00-26.632-38.994zM48 12a18 18 0 11-18 18 18.02 18.02 0 0118-18zM12.598 84A30.062 30.062 0 0142 60h12a30.062 30.062 0 0129.402 24z"></path>
    </svg>
  );
}

export default Icon;
