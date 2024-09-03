"use client";
import GoBackSVG from "@/assets/icons/GoBackIcon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = ({ text }: { text: string }) => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div onClick={() => router.back()} className="flex items-center cursor-pointer">
      {/*<GoBackSVG width={24} height={24} />*/}
      <h2 className="text-white text-[18px] font-bold ml-2">{text}</h2>
    </div>
  );
};

export default GoBack;
