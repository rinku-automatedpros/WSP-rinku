import React from "react"

const TagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5 16L6.125 13.5H3L3.375 12H6.5L7.375 8.5H4L4.375 7H7.75L8.5 4H10L9.25 7H12.25L13 4H14.5L13.75 7H17L16.625 8.5H13.375L12.5 12H16L15.625 13.5H12.125L11.5 16H10L10.625 13.5H7.625L7 16H5.5ZM8 12H11L11.875 8.5H8.875L8 12Z"
      fill="currentColor"
    />
  </svg>
)

export default TagIcon
