"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const HeaderMember = ({ type }: { type?: any }) => {
  const t = useTranslations();
  const router = useRouter();
  const search = useSearchParams().get("type");

  const buttomHandleSearch = () => {
    const searchParams = new URLSearchParams({ type });
    router.push(`/member?${searchParams.toString()}`);
  };

  return (
    <div className="h-[35px] rounded-[10px] bg-[#ffffff1a] flex items-center justify-between mx-6">
      <Link
        href={"/member?type=commissions"}
        className={`w-2/4 flex items-center justify-center cursor-pointer ${
          search === "commissions"
            ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full"
            : "text-[#F2F3F8]"
        }`}
        onClick={buttomHandleSearch}
      >
        <p className=" text-[14px]">{t("Commissions")}</p>
      </Link>
      <Link
        href={"/member?type=history"}
        className={`w-2/4 flex items-center justify-center cursor-pointer ${
          search === "history"
            ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full "
            : "text-[#F2F3F8]"
        }`}
        onClick={buttomHandleSearch}
      >
        <p className="text-[14px]">{t("History")}</p>
      </Link>
    </div>
  );
};

export default HeaderMember;
