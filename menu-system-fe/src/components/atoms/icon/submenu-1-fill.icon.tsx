import { SVGProps } from "react";

export default function IconSubmenu1Fill({
  fill,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="3.65625"
        y="3.66992"
        width="6.69214"
        height="6.69336"
        rx="1"
        fill={fill || "white"}
      />
      <rect
        x="3.65625"
        y="13.6523"
        width="6.69214"
        height="6.69336"
        rx="1"
        fill={fill || "white"}
      />
      <rect
        x="13.6539"
        y="13.6523"
        width="6.69214"
        height="6.69336"
        rx="1"
        fill={fill || "white"}
      />
      <circle cx="16.9871" cy="7.04102" r="3.69067" fill={fill || "white"} />
    </svg>
  );
}
