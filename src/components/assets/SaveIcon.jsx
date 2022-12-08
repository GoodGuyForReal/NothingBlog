import * as React from "react";

const SaveIcon = ({ size = 24, color = "#000000", ...props }) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M5.1 4.333c0-.423.343-.766.767-.766h12.266c.424 0 .767.343.767.766V21.2a.766.766 0 01-1.173.65L12 18.27l-5.727 3.58A.767.767 0 015.1 21.2V4.333zm1.533.767v14.717l4.554-2.847a1.534 1.534 0 011.626 0l4.554 2.847V5.1H6.633z"
      clipRule="evenodd"
    ></path>
  </svg>
);


export default SaveIcon;
