"use client";
import React from "react";
import Image from "next/image";
import IconLogo from "@/assets/imgs/LogoTipoPeq.png";
import { useTranslations } from "next-intl";

type Props = {
  step: number;
};

const HeaderRegister = ({ step }: Props) => {
  const t = useTranslations();

  return (
    <div className="headerRegister">
      <div className="headerRegister-logo flex">
        <Image src={IconLogo} alt="logo" width={28} height={24} />
        <div className="w-4/5">
          <div className="text-center text-[12px] text-[#ffffffb3] mx-auto">
            <p>{t("Step 1/4 (Required)")}</p>
            <p className=" font-bold mt-1">{t("USER REGISTRATION")}</p>
          </div>
        </div>
      </div>
      <div className="container-bars-progresss grid grid-cols-4 gap-2 mt-[20px]">
        <div className="div-bar h-4">
          <div className={`div-progress h-4 rounded-[20px] bg-[#7A2FF4] text-[12px] font-bold cursor-pointer flex items-center justify-center`}>
            {`${t("STEP")} 1`}
          </div>
        </div>
        <div className="div-bar bar2">
          <div
            className={`div-progress h-4 rounded-[20px] bg-[#F2F3F8] text-[12px] font-bold text-[#A9AEB4] cursor-pointer flex items-center justify-center`}
          >{`${t("STEP")} 2`}</div>
        </div>
        <div className="div-bar bar3">
          <div
            className={`div-progress h-4 rounded-[20px] bg-[#F2F3F8] text-[12px] font-bold text-[#A9AEB4] cursor-pointer flex items-center justify-center`}
          >{`${t("STEP")} 3`}</div>
        </div>
        <div className="div-bar bar4">
          <div
            className={`div-progress h-4 rounded-[20px] bg-[#F2F3F8] text-[12px] font-bold text-[#A9AEB4] cursor-pointer flex items-center justify-center`}
          >{`${t("STEP")} 4`}</div>
        </div>
      </div>
      <div className="headerRegister-title">
        <h1 className="text-[24px] font-bold">{t("welcome")}!</h1>
        <p>{t("Please complete the registration")}</p>
      </div>
    </div>
  );
};

export default HeaderRegister;
