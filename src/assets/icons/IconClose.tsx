import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
    setIsOpen: (isOpen: boolean) => void;
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
  setIsOpen = () => {},
}: Props): React.ReactElement => {
  return (
    <svg
      className={className}
      stroke={stroke}
      fill={fill}
      width={width}
      height={height}
      strokeWidth={1.5}
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setIsOpen(false)}
    >
      <g id="Icons/close">
        <path
          id="Vector"
          d="M10.1932 9L13.533 5.66016C13.6916 5.50193 13.7807 5.28721 13.7809 5.06324C13.7811 4.83928 13.6923 4.62441 13.5341 4.4659C13.3759 4.30739 13.1612 4.21823 12.9372 4.21803C12.7132 4.21783 12.4984 4.30661 12.3398 4.46484L9 7.80469L5.66016 4.46484C5.50165 4.30633 5.28666 4.21729 5.0625 4.21729C4.83833 4.21729 4.62335 4.30633 4.46484 4.46484C4.30633 4.62335 4.21729 4.83833 4.21729 5.0625C4.21729 5.28666 4.30633 5.50165 4.46484 5.66016L7.80469 9L4.46484 12.3398C4.30633 12.4984 4.21729 12.7133 4.21729 12.9375C4.21729 13.1617 4.30633 13.3766 4.46484 13.5352C4.62335 13.6937 4.83833 13.7827 5.0625 13.7827C5.28666 13.7827 5.50165 13.6937 5.66016 13.5352L9 10.1953L12.3398 13.5352C12.4984 13.6937 12.7133 13.7827 12.9375 13.7827C13.1617 13.7827 13.3766 13.6937 13.5352 13.5352C13.6937 13.3766 13.7827 13.1617 13.7827 12.9375C13.7827 12.7133 13.6937 12.4984 13.5352 12.3398L10.1932 9Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export default IconCloseSVG;
