import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
}

const HomeSVG = ({
  width = 28,
  height = 28,
  stroke = "#fff",
  fill = "none",
  className,
  onClick = () => { },
}: Props): React.ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      className={className}
      strokeWidth={1.5}
      height={height}
      width={width}
      fill={fill}
      onClick={onClick} viewBox="0 0 28 28">
      <path d="M24.3018 9.34506L16.6601 3.23173C15.1668 2.04173 12.8335 2.03006 11.3518 3.22006L3.71012 9.34506C2.61345 10.2201 1.94845 11.9701 2.18179 13.3467L3.65179 22.1434C3.99012 24.1151 5.82179 25.6667 7.81679 25.6667H20.1835C22.1551 25.6667 24.0218 24.0801 24.3601 22.1317L25.8301 13.3351C26.0401 11.9701 25.3751 10.2201 24.3018 9.34506ZM14.8751 21.0001C14.8751 21.4784 14.4785 21.8751 14.0001 21.8751C13.5218 21.8751 13.1251 21.4784 13.1251 21.0001V17.5001C13.1251 17.0217 13.5218 16.6251 14.0001 16.6251C14.4785 16.6251 14.8751 17.0217 14.8751 17.5001V21.0001Z" fill={fill}
      />
    </svg>
  );
};

export default HomeSVG;
