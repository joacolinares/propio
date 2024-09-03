import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
}

const AddSVG = ({
  width = 24,
  height = 24,
  stroke = "#fff",
  fill = "none",
  className,
  onClick = () => { },
}: Props): React.ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}
      height={height}
      width={width}
      fill={fill}
      onClick={onClick} viewBox="0 0 24 24">
      <path d="M12 5.25V18.75M18.75 12H5.25" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default AddSVG;
