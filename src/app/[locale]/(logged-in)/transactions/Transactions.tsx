"use client";
import React from "react";
import { DataTransactions } from "./moskData";
import { useTranslations } from "next-intl";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { usePathname, useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";

interface Props {
  data: DataTransactions[];
}

const Transactions = ({ data }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const numberByPage = 10;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: data as DataTransactions[],
    numberByPage: numberByPage,
  });

  return (
    <>
      <HeaderPages text={t("Transactions")} />

      <div className={`${"px-[24px] min-h-[calc(100vh-200px)]"}`}>
        {elemetsVisibleByPage.length > 0 ? (
          <>
            <div className="component-transactions">
              {elemetsVisibleByPage.map((transaction) => (
                <div key={transaction.id} className="container-map">
                  <div className="container-type">
                    <p>{transaction.type}</p>
                    <span>{transaction.date} </span>
                    <span>{transaction.time}</span>
                  </div>
                  <div className="container-amount">
                    <p>$ {transaction.amount}</p>
                    <span>
                      +${transaction.amountFee} {t("Fee")}
                    </span>
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
          <h1 className="text-white font-bold text-[18px] text-center">{t("No transaction data")}</h1>
        )}
      </div>
    </>
  );
};

export default Transactions;
