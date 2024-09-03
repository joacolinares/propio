"use client";
import React, { useEffect, useState } from "react";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";

import {
  ThirdwebProvider,
  ThirdwebSDK,
  Web3Button,
  useAddress,
} from "@thirdweb-dev/react";
import abiAccount from "@/abis/abiAccount.json";
import "./buttonStyle.css";

const TansferAcc = () => {
  const t = useTranslations();
  const router = useRouter();
  const [nameAccount, setNameAccount] = useState<string>("");
  const [walletReceive, setWalletReceive] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const wallet = localStorage.getItem("wallet");

  const buttonProceedToTransfer = () => {
    setIsModalOpen(true);
    setIsProcessing(true);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');
    setNameAccount(name)
  }, [])

  //ThirdwebProvider
  return (

      <div className="pb-[96px]  bg-gradient-to-t from-[#0E0E33] to-[#39307B] text-white">
        <HeaderPages text={t("Transfer NFT")} />

        <div className="px-6 flex flex-col justify-between min-h-[calc(100vh-200px)]">
          <div className="rounded-[10px] mt-[100px] p-4 border border-solid border-[#AD98FF] bg-gradient-to-t from-[#ffffff1a] to-[#39307B]">
            <h1 className="text-[24px] font-bold mb-6">{t("Transfer NFT")}</h1>

            {/* <div>
              <label className="text-[14px] font-bold">{t("Wallet to receive the NFT")}</label>
              <input
                type="text"
                placeholder={t("Account")}
                disabled
                value={nameAccount}
                onChange={(e) => setNameAccount(e.target.value)}
                className="p-4 rounded-[10px] border border-solid border-[#ffffff1a] w-full bg-inherit mt-1 text-[14px] font-bold text-[#A9AEB4]"
              />
            </div> */}
            <div className="mt-4 mb-6">
              <label className="text-[14px] font-bold">{t("Wallet to receive the account")}</label>
              <input
                type="text"
                placeholder="0x68805b651a3b168d2a1E792f5E54E34Ca00eB55F..."
                required
                value={walletReceive}
                onChange={(e) => setWalletReceive(e.target.value)}
                className="p-4 rounded-[10px] bg-[#ffffff1a] w-full mt-1 text-[14px] font-bold text-[#A9AEB4]"
              />
            </div>

            {/* <ButtonPrimary text={t("Proceed to Transfer")} onClickFn={buttonProceedToTransfer} /> */}

            <Web3Button
              contractAddress={process.env.ACCOUNT_CONTRACT}
              contractAbi={abiAccount}
              action={async (contract: any) => {
                buttonProceedToTransfer();
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const id = urlParams.get('id');
                await contract.call("transferAccount", [wallet,walletReceive,id]);
              }}
              onSuccess={(result) => {
                setIsProcessing(false);
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 2000);
                router.push(`/myAccounts`);
              }}
              onError={(error) => {
                setIsProcessing(false);
                setIsDeclined(true);
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 6000);
              }}
              className="buttonPrimary"
            >
              {t("Send")}
            </Web3Button>

            <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
              {isProcessing ? (
                <div className="w-full h-full flex flex-col items-center justify-center px-16">
                  <div>
                    <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Processing your Request")}</p>
                </div>
              ) : isDeclined ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div>
                    <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Failed Transfer")}</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div>
                    <Image src={CheckDone} alt="Check done" width={60} height={60} />
                  </div>
                  <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Done")}</p>
                </div>
              )}
            </ModalComponent>
          </div>

          <div className="px-4 py-1 flex items-center rounded-lg border border-solid border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_7516_2833)">
                <path
                  d="M17.4105 0.4395C17.2711 0.300024 17.1055 0.189413 16.9233 0.113999C16.741 0.0385838 16.5457 -0.00015458 16.3485 4.6356e-07H7.6515C7.254 4.6356e-07 6.8715 0.1575 6.591 0.4395L0.441003 6.591C0.300933 6.72976 0.189821 6.89496 0.114117 7.07701C0.0384126 7.25906 -0.000376026 7.45434 2.7475e-06 7.6515V16.35C2.7475e-06 16.7475 0.157503 17.13 0.439503 17.4105L6.5895 23.562C6.8715 23.8425 7.2525 24 7.6515 24H16.35C16.7475 24 17.13 23.8425 17.4105 23.5605L23.5605 17.409C23.8425 17.1285 24 16.7475 24 16.3485V7.6515C24 7.254 23.8425 6.8715 23.5605 6.591L17.4105 0.4395ZM22.5 16.3485L16.3485 22.5H7.6515L1.5 16.3485V7.6515L7.6515 1.5H16.35L22.5 7.6515V16.3485ZM12 4.5C11.6022 4.5 11.2206 4.65804 10.9393 4.93934C10.658 5.22064 10.5 5.60218 10.5 6V13.5C10.5 13.8978 10.658 14.2794 10.9393 14.5607C11.2206 14.842 11.6022 15 12 15C12.3978 15 12.7794 14.842 13.0607 14.5607C13.342 14.2794 13.5 13.8978 13.5 13.5V6C13.5 5.60218 13.342 5.22064 13.0607 4.93934C12.7794 4.65804 12.3978 4.5 12 4.5ZM10.5 18C10.5 18.197 10.5388 18.392 10.6142 18.574C10.6896 18.756 10.8001 18.9214 10.9393 19.0607C11.0786 19.1999 11.244 19.3104 11.426 19.3858C11.608 19.4612 11.803 19.5 12 19.5C12.3978 19.5 12.7794 19.342 13.0607 19.0607C13.2 18.9214 13.3104 18.756 13.3858 18.574C13.4612 18.392 13.5 18.197 13.5 18C13.5 17.6022 13.342 17.2206 13.0607 16.9393C12.7794 16.658 12.3978 16.5 12 16.5C11.6022 16.5 11.2206 16.658 10.9393 16.9393C10.658 17.2206 10.5 17.6022 10.5 18Z"
                  fill="#FF4C5A"
                />
              </g>
              <defs>
                <clipPath id="clip0_7516_2833">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p className="ml-4 text-[10px] text-white leading-3">
              {t("Once the account has been transferred it cannot be recovered and will be transferred to the new registrant")}
            </p>
          </div>
        </div>
      </div>

  );
};

export default TansferAcc;
