"use client";
import React, { useState } from "react";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import ModalComponent from "@/app/components/generals/ModalComponent";
import Image from "next/image";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";

const WithdrawRw = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const headerText = pathname.includes("/")
    ? pathname
        .split("/")
        .filter((path) => path.length > 0 && path !== "/")[0]
        .charAt(0)
        .toUpperCase() +
      pathname
        .split("/")
        .filter((path) => path.length > 0 && path !== "/")[0]
        .slice(1)
    : pathname.charAt(0).toUpperCase() + pathname.slice(1);

  const buttonWithdraw = () => {
    setIsModalOpen(true);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);

    setTimeout(() => {
      router.push("/members");
    }, 6000);
  };

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
      <HeaderPages text={headerText} />

      <div className="px-6 min-h-[calc(100vh-150px)] flex flex-col justify-center">
        <div className="text-white  container-unStake-amount p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-[#ffffff14] shadow-md">
          <h2 className="text-[18px] font-bold mb-4">
            {t("Withdraw Rewards")}
          </h2>
          <div className="mb-6 rounded-[10px] border border-solid border-[#F2F3F8] p-2">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[14px] font-bold">{t("Amount")}</p>
              <p className="text-[12px]">{t("MAX")}: $10,000.00</p>
            </div>
            <div className="container-input relative">
              <input
                type="number"
                className="rounded-[10px] p-4 bg-[#ffffff14] w-full"
                value={0.0}
                onChange={(e) => console.log(e.target.value)}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#A9AEB4]">
                {t("MAX")}
              </button>
            </div>
          </div>
          <div>
            <ButtonPrimary
              text={t("Approve Contract")}
              onClickFn={buttonWithdraw}
            />
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
    </div>
  );
};

export default WithdrawRw;
