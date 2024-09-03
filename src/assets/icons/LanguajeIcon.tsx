import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  className?: string;
}

const LanguajeSVG = ({
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
      strokeWidth={1.4}
      height={height}
      width={width}
      fill={fill}
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2.25C6.61547 2.25 2.25 6.61547 2.25 12C2.25 17.3845 6.61547 21.75 12 21.75C17.3845 21.75 21.75 17.3845 21.75 12C21.75 6.61547 17.3845 2.25 12 2.25Z"
        stroke={stroke}
        strokeWidth={1.4}
        strokeMiterlimit="10"
      />
      <path
        d="M12.0002 2.25C9.27812 2.25 6.71875 6.61547 6.71875 12C6.71875 17.3845 9.27812 21.75 12.0002 21.75C14.7222 21.75 17.2816 17.3845 17.2816 12C17.2816 6.61547 14.7222 2.25 12.0002 2.25Z"
        stroke={stroke}
        strokeWidth={1.4}
        strokeMiterlimit="10"
      />
      <path
        d="M5.5 5.49976C7.2925 6.77241 9.54906 7.53132 12.0002 7.53132C14.4513 7.53132 16.7078 6.77241 18.5003 5.49976M18.5003 18.5001C16.7078 17.2274 14.4513 16.4685 12.0002 16.4685C9.54906 16.4685 7.2925 17.2274 5.5 18.5001"
        stroke={stroke}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2.25V21.75M21.75 12H2.25"
        stroke={stroke}
        strokeWidth={1.4}
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default LanguajeSVG;
