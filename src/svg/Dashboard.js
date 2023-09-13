import React from "react";

function Icon({ active }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 36 36"
    >
      <path
        fill={active === "dashboard" ? "#DE2574" : "#323232"}
        d="M32 5H4a2 2 0 00-2 2v22a2 2 0 002 2h28a2 2 0 002-2V7a2 2 0 00-2-2zm-9.44 20.94l-7.1-10.58-6.34 9.28-4.5-4L6 19.05l2.7 2.39 6.76-9.88 7.19 10.71 7-9.27 1.7 1.28z"
      ></path>
      <path 
      fill="none" 
      d="M0 0H36V36H0z"></path>
    </svg>
  );
}

export default Icon;
