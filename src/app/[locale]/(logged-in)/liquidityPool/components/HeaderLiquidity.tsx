"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const HeaderLiquidity = ({ type }: { type?: any }) => {
  const t = useTranslations();
  const router = useRouter();
  const search = useSearchParams().get("type");

  const buttomHandleSearch = () => {
    const searchParams = new URLSearchParams({ type });
    router.push(`/operations?${searchParams.toString()}`);
  };

  return (
    <div className="h-[35px] rounded-[10px] bg-[#ffffff1a] flex items-center justify-between">
      <Link
        href={`/liquidityPool?type=myLiquidity`}
        className={`w-2/4 flex items-center justify-center cursor-pointer ${
          search === `myLiquidity` ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full" : "text-[#F2F3F8]"
        }`}
        onClick={buttomHandleSearch}
      >
        <p className=" text-[14px]">{t("Liquidity")}</p>
      </Link>
      <Link
        href={`/liquidityPool?type=addLiquidity`}
        className={`w-2/4 flex items-center justify-center cursor-pointer ${
          search === `addLiquidity` ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full " : "text-[#F2F3F8]"
        }`}
        onClick={buttomHandleSearch}
      >
        <p className="text-[14px]">{t("Add Liquidity")}</p>
      </Link>
    </div>
  );
};

export default HeaderLiquidity;
