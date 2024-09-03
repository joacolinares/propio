"use client";
import React from "react";
import { SyncLoader } from "react-spinners";

interface Props {
  text: string;
  onClickFn?: () => void;
  classname?: string;
  typeBtn?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
}

const ButtonPrimary = ({
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
      className={`${classname ? ` ${classname}` : ``} ${
        disabled ? "buttonDisabled" : "buttonPrimary"
      }`}
      type={`${typeBtn}`}
      disabled={loading || disabled}
    >
      {loading ? <SyncLoader color="#00B96B" loading={loading} size={8} /> : text}
    </button>
  );
};

export default ButtonPrimary;
