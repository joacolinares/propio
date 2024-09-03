"use client";
import React from "react";
import { ReferralUserData } from "./moskData";
import { useTranslations } from "next-intl";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";

interface Props {
  referralInfo: ReferralUserData[];
}

const ReferralUser = ({ referralInfo }: Props) => {
  const t = useTranslations();

  const numberByPage = 8;
  const {
    currentPage,
    elemetsVisibleByPage,
    goToNextPage,
    goToPage,
    goToPreviousPage,
    totalPages,
  } = usePaginate({
    listElement: referralInfo,
    numberByPage: numberByPage,
  });

  return (
    <div className="text-white mb-[48px]">
      <h1 className="text-[20px] font-bold mb-[16px]">{t("Referral Users")}</h1>
      <div>
        {elemetsVisibleByPage.length > 0 ? (
          <>
            <div className="container-info px-4 rounded-[20px] bg-[#ffffff14]">
              {elemetsVisibleByPage.map((item) => (
                <div
                  className="container-info-user flex items-center justify-between py-[16px] border-b border-solid border-[#ffffff14]"
                  key={item.id}
                >
                  <div className="container-left">
                    <p className="text-[16px] font-bold mb-1">{item.id}</p>
                    <p className="text-[12px] text-[#A9AEB4]">
                      {t("Registered on")} {item.fecha}
                    </p>
                  </div>
                  <div className="container-right">
                    <p className="text-[16px] font-bold mb-1">
                      {t("Level")} {item.level}
                    </p>
                    <p
                      className={`text-[12px] ${
                        item.status === "Active"
                          ? "text-[#20DABB]"
                          : "text-[#FF4C5A]"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-5 ">
              <Pagination
                currentPage={currentPage}
                goToNextPage={goToNextPage}
                goToPage={goToPage}
                goToPreviousPage={goToPreviousPage}
                totalPages={totalPages}
              />
            </div>
          </>
        ) : (
          <p className="text-white font-bold text-[18px] text-center">{t("There is no referral data")}</p>
        )}
      </div>
    </div>
  );
};

export default ReferralUser;
