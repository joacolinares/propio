import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}

const IconCloseSVG = ({
  width = 18,
  height = 18,
  stroke = "#fff",
  fill = "none",
  className,
}: Props): React.ReactElement => {
  return (
    <svg
      className={className}
      strokeWidth={1.5}
      height={height}
      width={width}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icons/checkmark" clipPath="url(#clip0_6030_225)">
        <path
          id="Vector"
          d="M15.1111 2.66669L5.15558 13.3334L0.888916 9.33335"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6030_225">
          <rect stroke={stroke} width={width} height={height} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconCloseSVG;
