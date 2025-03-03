import React from "react"

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.30772 20.5C7.80259 20.5 7.37503 20.325 7.02503 19.975C6.67503 19.625 6.50003 19.1974 6.50003 18.6923V8H17.5V18.6923C17.5 19.1974 17.325 19.625 16.975 19.975C16.625 20.325 16.1974 20.5 15.6923 20.5H8.30772Z"
      fill="currentColor"
    />
    <path
      d="M6.5 6.00005H5.5V4.50008H8.99997V3.61548H15V4.50008H18.5V6.00005C18.5 6.00005 17.9999 6.00011 17.5 6.00005C17 6 6.5 6.00005 6.5 6.00005Z"
      fill="currentColor"
    />
  </svg>
)

export default TrashIcon
