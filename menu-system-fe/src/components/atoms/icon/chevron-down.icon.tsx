import { SVGProps } from "react";

export default function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#475467"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
