import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
}

const LiquidationSVG = ({
  width = 28,
  height = 28,
  stroke = "#fff",
  fill = "none",
  className,
  onClick = () => { },
}: Props): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={height}
      width={width}
      fill={fill}
      onClick={onClick}
      viewBox="0 0 24 24"
    >
      <path
        d="M20 7H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-1 11H5V10h14v8zm1-12H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2z"
        fill={fill}
      />
    </svg>
  );
};

export default LiquidationSVG;
