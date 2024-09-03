"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { DataOperationsClaim } from "./moskData";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";

interface Props {
  dataClaim: DataOperationsClaim[];
}

const Claim = ({ dataClaim }: Props) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const numberByPage = 10;
  const {
    currentPage,
    elemetsVisibleByPage,
    goToNextPage,
    goToPage,
    goToPreviousPage,
    totalPages,
  } = usePaginate({
    listElement: dataClaim,
    numberByPage: numberByPage,
  });

  const buttonClaim = () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 6000);
  };

  return (
    <div className="container-claim">
      <div className="container-up my-[32px] mx-6">
        <div className="container-available rounded-[16px] shadow-md bg-[#7A2FF4] p-6 text-white text-center">
          <p className="text-[24px] font-bold mb-2">$ 0</p>
          <p className="text-[14px]">{t("Available to Claim")}</p>
        </div>
        <div className="container-text my-4 shadow-md p-6 rounded-[16px] ">
          <span className="text-[#A9AEB4] text-[12px]">
            {t("You can claim all the profits any time you want")}
          </span>
        </div>
        <div className="container-claim-amount p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-white shadow-md">
          <h2 className="text-[18px] font-bold mb-4">{t("Claim")}</h2>
          <div className="mb-6 rounded-[10px] border border-solid border-[#F2F3F8] p-2">
            <p className="text-[14px] font-bold mb-4">{t("Amount")}</p>
            <div className="container-input relative">
              <input
                type="number"
                className="rounded-[10px] p-4 bg-[#F2F3F8] w-full"
                value={0.0}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#7A2FF4]">
                {t("MAX")}
              </button>
            </div>
            <div className="mt-4 mb-2 flex items-center justify-between">
              <span className="text-[14px] text-[#A9AEB4]">
                {t("Performance Fee")}
              </span>
              <span className="text-[14px] text-[#A9AEB4] font-bold">
                $ 0.00
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#A9AEB4]">
                {t("Profit to Send")}
              </span>
              <span className="text-[14px] text-[#A9AEB4] font-bold">
                $ 0.00
              </span>
            </div>
          </div>

          <div>
            <ButtonPrimary text={t("Claim")} onClickFn={buttonClaim} />
            <ModalComponent
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg"
            >
              {isProcessing ? (
                <div className="w-full h-full flex flex-col items-center justify-center px-16">
                  <div>
                    <Image
                      src={ProcessingIcon}
                      alt="processing"
                      width={60}
                      height={60}
                    />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                    {t("Processing your Request")}
                  </p>
                </div>
              ) : isDeclined ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div>
                    <Image
                      src={RechazedIcon}
                      alt="Decline"
                      width={60}
                      height={60}
                    />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                    {t("Failed Transfer")}
                  </p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div>
                    <Image
                      src={CheckDone}
                      alt="Check done"
                      width={60}
                      height={60}
                    />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                    {t("Done")}
                  </p>
                </div>
              )}
            </ModalComponent>
          </div>
        </div>
      </div>

      <div
        className={`px-[24px] pt-[32px] pb-[96px] rounded-t-[40px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]`}
      >
        <div className="mb-6">
          <h1 className="text-[20px] text-white  font-bold">
            {t("Claim History")}
          </h1>
        </div>
        {elemetsVisibleByPage.length > 0 ? (
          <>
            <div className="component-claimHistory bg-[#ffffff1a] rounded-[16px] p-4">
              {elemetsVisibleByPage.map((claim) => (
                <div
                  key={claim.id}
                  className="container-map flex justify-between items-center py-4 border-b border-solid border-[#ffffff1a] last:border-b-0"
                >
                  <div className="container-claim-amount">
                    <p className="text-[#20DABB] text-[16px] font-bold">
                      {claim.amountClaim}
                    </p>
                    <span className="text-[12px] text-[#A9AEB4]">
                      {claim.date}{" "}
                    </span>
                    <span className="text-[12px] text-[#A9AEB4]">
                      {claim.time}
                    </span>
                  </div>
                  <div className="container-amount">
                    <p className="text-white text-[14px] font-bold">
                      $ {claim.amountProfit} {t("Profit")}
                    </p>
                    <span className="text-[14px] text-[#A9AEB4] font-bold">
                      +${claim.amountFee} {t("Fee")}
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
          <h1 className="text-white font-bold text-[18px] text-center">
            {t("No claims history")}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Claim;
