"use client";
import React from "react";
import ChartsDonus from "@/app/components/generals/charts/ChartsDonus";
import { useTranslations } from "next-intl";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { ProfitHistoryMyLiquidity, InfoMembership, sortedProfitHistoryMyLiquidity } from "./moskData";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import EachMembreship from "./EachMembreship";

interface Props {
  dataMyLiquidity: ProfitHistoryMyLiquidity[];
  infoMembership: InfoMembership[];
}

const MyLiquidity = ({ dataMyLiquidity = sortedProfitHistoryMyLiquidity, infoMembership }: Props) => {
  const t = useTranslations();

  const numberByPage = 4;
  const {
    currentPage,
    elemetsVisibleByPage,
    goToNextPage,
    goToPage,
    goToPreviousPage,
    totalPages,
  } = usePaginate({
    listElement: dataMyLiquidity,
    numberByPage: numberByPage,
  });

  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col justify-between">
      <div className="container-up m-6 ">
        <div className="container-purple py-6 px-12 rounded-[20px] shadow-md bg-[#7A2FF4] text-white text-center">
          <p className="text-[14px] mb-2">{t("Total Value Locked")}</p>
          <p className="text-[24px] font-bold">$ 0</p>
        </div>
        <div>
          <ChartsDonus />
        </div>
        <EachMembreship infoMembership={infoMembership} />
      </div>
      <div className="container-down px-[24px] pt-[32px] pb-[96px] rounded-t-[40px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
        <div className="text-white ">
          <h1 className="text-[20px] font-bold mb-[16px]">
            {t("Profit History")}
          </h1>
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
                        <p className="text-[16px] font-bold mb-1">
                          {item.month}
                        </p>
                        <p className="text-[12px]">{item.year}</p>
                      </div>
                      <div className="container-right">
                       {/* <p className="text-[14px] text-[#20DABB] font-bold mb-1">
                          $ {item.amountProfit} {t("Profit")}
                        </p>*/}
                        <p className={`text-[14px] font-bold`}>
                        {item.amountProfit}% {(item.id === 17 || item.id === 18 || item.id === 19 || item.id === 20) && "Development"}
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
              <p className="text-white font-bold text-[18px] text-center">
                {t("There is no profit history")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLiquidity;
