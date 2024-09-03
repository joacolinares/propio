"use client";
import React from "react";

interface Props {
  text: string;
  onClickFn?: () => void;
  classname?: string;
  typeBtn?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
}

const ButtonSecondary = ({
  text,
  onClickFn = () => {},
  classname = "",
  typeBtn = "button",
  loading = false,
  disabled = false,
}: Props) => {
  return (
    <button
      onClick={disabled ? () => {} : () => onClickFn()}
      className={` ${classname ? ` ${classname}` : ``} ${
        disabled ? "buttonDisabled" : "buttonSecondary"
      }`}
      type={`${typeBtn}`}
      disabled={loading || disabled}
    >
      {text}
    </button>
  );
};

export default ButtonSecondary;
