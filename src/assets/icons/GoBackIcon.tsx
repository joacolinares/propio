import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}

const GoBackSVG = ({
  width = 18,
  height = 18,
  stroke = "#fff",
  fill = "none",
  className,
}: Props): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={height}
      width={width}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path
        d="M11.4375 18.75L4.6875 12L11.4375 5.25M5.625 12H19.3125"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GoBackSVG;
