"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import abiAccount from "@/abis/abiAccount.json";

import {
  ThirdwebProvider,
  ThirdwebSDK,
  Web3Button,
  useAddress,
} from "@thirdweb-dev/react";
import "./buttonStyle.css";

const RenameAcc = () => {
  const t = useTranslations();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [nameAccount, setNameAccount] = useState<string>("");
  const [newNameAccount, setNewNameAccount] = useState<string>("");

  const buttonRenameAccount = () => {
    setIsModalOpen(true);
    setIsProcessing(true);
  };

  const wallet = localStorage.getItem("wallet");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');
    setNameAccount(name)
  }, [])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remueve espacios y convierte el texto a minúsculas
    const value = e.target.value.replace(/\s+/g, "").toLowerCase();
    setNewNameAccount(value);
  };
  
//ThirdwebProvider
  return (

      <div className="pb-[96px]  bg-gradient-to-t from-[#0E0E33] to-[#39307B] text-white">
        <HeaderPages text={t("Rename Account")} />

        <div className="px-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="rounded-[10px] p-4 border border-solid border-[#AD98FF] bg-gradient-to-t from-[#ffffff1a] to-[#39307B]">
            <h1 className="text-[24px] font-bold mb-6">{t("Rename Account")}</h1>

            {/* <div>
              <label className="text-[14px] font-bold">
                {t("Account to rename")}
              </label>
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
              <label className="text-[14px] font-bold">{t("New Name")}</label>
              <input
                type="text"
                placeholder={t("New Name")}
                required
                value={newNameAccount}
                onChange={handleInputChange}
                className="p-4 rounded-[10px] bg-[#ffffff1a] w-full mt-1 text-[14px] font-bold text-[#A9AEB4]"
              />
            </div>

            <Web3Button
              contractAddress={process.env.ACCOUNT_CONTRACT}
              contractAbi={abiAccount}
              action={async (contract: any) => {
                console.log(wallet);
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const id = urlParams.get('id');
                buttonRenameAccount();
                await contract.call("renameAccount", [
                  id,
                  newNameAccount,
                ]);
              }}
              onSuccess={(result) => {
                setIsProcessing(false);
                setTimeout(() => {
                  //Cierra el modal
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
              {t("Rename Account")}
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
        </div>
      </div>

  );
};

export default RenameAcc;
