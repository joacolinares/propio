"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeaderOperations = ({ type }: { type?: any }) => {
  const t = useTranslations();
  const router = useRouter();
  const search = useSearchParams().get("type");

  const buttomHandleSearch = () => {
    const searchParams = new URLSearchParams({ type });
    router.push(`/operations?${searchParams.toString()}`);
  };

  

  return (
    <div className="h-[35px] px4 rounded-[10px] bg-[#ffffff1a] flex items-center justify-between">
      <Link
        href={"/operations?type=claim"}
        className={`w-2/4 flex items-center justify-center cursor-pointer ${
          search === "claim"
            ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full"
            : "text-[#F2F3F8]"
        }`}
        onClick={buttomHandleSearch}
      >
        <p className=" text-[14px]">{t("Claim")}</p>
      </Link>
      <Link
        href={"/operations?type=unStake"}
        className={`w-2/4 flex items-center justify-center cursor-pointer ${
          search === "unStake"
            ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full "
            : "text-[#F2F3F8]"
        }`}
        onClick={buttomHandleSearch}
      >
        <p className="text-[14px]">{t("Un-Stake")}</p>
      </Link>
    </div>
  );
};

export default HeaderOperations;
