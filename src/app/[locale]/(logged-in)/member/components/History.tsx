"use client";
import React from "react";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import { useTranslations } from "next-intl";
import { DataHistoryMember } from "./moskData";
import EyeIcon from "@/assets/icons/eye.svg";
import Image from "next/image";

type Props = {
  dataListHistory: DataHistoryMember[];
};

const History = ({ dataListHistory }: Props) => {
  const t = useTranslations();

  const numberByPage = 8;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: dataListHistory as DataHistoryMember[],
    numberByPage: numberByPage,
  });

  return (
    <div className="mt-4">
      <div className={`${"px-[24px] min-h-[calc(100vh-200px)]"}`}>
        {elemetsVisibleByPage.length > 0 ? (
          <>
            <div className="component-transactions">
              {elemetsVisibleByPage.map((history) => (
                <div key={history.id} className="container-map">
                  <div className="container-type">
                    <p>{history.type}</p>
                    <span>{history.date} </span>
                    <span>{history.time}</span>
                  </div>
                  <div className="container-amount flex items-start">
                    <p className="mr-2">${history.amount}</p>
                    <div className="cursor-pointer flex justify-center items-center rounded-[5px] border border-solid border-[#AD98FF] bg-[#ffffff1a] w-[36px] h-[36px]">
                      <Image width={18} height={18} src={EyeIcon} alt="eye" />
                    </div>
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
          <h1 className="text-white font-bold text-[18px] text-center">{t("No history data")}</h1>
        )}
      </div>
    </div>
  );
};

export default History;
