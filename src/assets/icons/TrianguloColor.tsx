import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
}

const TrianguloSVG = ({
  width = 30,
  height = 30,
  stroke = "#fff",
  fill = "none",
  className,
  onClick = () => {},
}: Props): React.ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="none"
      viewBox="0 0 30 30"
      onClick={onClick}
    >
      <path d="M30 0L0 30V0H30Z" fill={fill} />
    </svg>
  );
};

export default TrianguloSVG;
