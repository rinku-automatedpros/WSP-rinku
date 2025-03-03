import React from "react"

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.5 16C3.09722 16 2.74653 15.8507 2.44792 15.5521C2.14931 15.2535 2 14.9028 2 14.5V5.5C2 5.09722 2.14931 4.74653 2.44792 4.44792C2.74653 4.14931 3.09722 4 3.5 4H16.5C16.9167 4 17.2708 4.14931 17.5625 4.44792C17.8542 4.74653 18 5.09722 18 5.5V14.5C18 14.9028 17.8542 15.2535 17.5625 15.5521C17.2708 15.8507 16.9167 16 16.5 16H3.5ZM10 11L16.5 7.27083V5.5L10 9.22917L3.5 5.5V7.27083L10 11Z"
      fill="currentColor"
    />
  </svg>
)

export default MailIcon
