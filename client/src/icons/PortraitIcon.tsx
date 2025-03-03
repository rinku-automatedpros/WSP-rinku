import React from "react"

const PortraitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5 19C5.0875 19 4.73437 18.8531 4.44062 18.5594C4.14687 18.2656 4 17.9125 4 17.5V2.5C4 2.0875 4.14687 1.73438 4.44062 1.44063C4.73437 1.14688 5.0875 1 5.5 1H14.5C14.9125 1 15.2656 1.14688 15.5594 1.44063C15.8531 1.73438 16 2.0875 16 2.5V17.5C16 17.9125 15.8531 18.2656 15.5594 18.5594C15.2656 18.8531 14.9125 19 14.5 19H5.5ZM5.5 15H14.5V5H5.5V15Z"
      fill="currentColor"
    />
  </svg>
)

export default PortraitIcon
