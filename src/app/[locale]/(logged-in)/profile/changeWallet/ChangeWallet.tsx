"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { UserRegisterState, useUserRegisterStore } from "@/store/user-register";

import {
  ThirdwebProvider,
  ThirdwebSDK,
  Web3Button,
} from "@thirdweb-dev/react";
import "./buttonStyle.css";
import abiPoi from '@/abis/abiPoi.json'
const ChangeWallet = () => {
  const t = useTranslations();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<string>("");
  const [newWallet, setNewWallet] = useState<string>("");

  const getUserRegisterStore = useCallback(useUserRegisterStore, []);
  const userStore = getUserRegisterStore();

  useEffect(() => {
    setNewWallet(userStore.wallet || "");
  }, [getUserRegisterStore]);

  const { updateUser, ...user } = useUserRegisterStore();


  const wallet = localStorage.getItem("wallet");
  console.log(wallet);

  const buttonChangeWallet = () => {


   // updateUser(newObject);

    setIsModalOpen(true);
    setIsProcessing(true);

   // setTimeout(() => {
     // setIsProcessing(false);
  //  }, 5000);

  //  setTimeout(() => {
  //    setIsModalOpen(false);
  //    router.push("/profile");
   // }, 6000);
  };

  //ThirdwebProvider
  return (

    <div className="pb-[96px]  bg-gradient-to-t from-[#0E0E33] to-[#39307B] text-white">
      <HeaderPages text={t("Change Wallet")} />

      <div className="px-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="rounded-[10px] p-4 bg-gradient-to-t from-[#ffffff1a] to-[#39307B]">
          <h1 className="text-[24px] font-bold mb-6">
            {t("Change your Wallet")}
          </h1>

          <div>
            <label className="text-[14px] font-bold">
              {t("Current Wallet")}
            </label>
            <input
              type="text"
              placeholder="0x23c43fe92321419655dbf9587f..."
              required
              value={wallet}
              onChange={(e) => setCurrentWallet(e.target.value)}
              className="p-4 rounded-[10px] border border-solid border-[#ffffff1a] w-full bg-inherit mt-1 text-[14px] font-bold text-[#A9AEB4]"
            />
          </div>
          <div className="mt-4 mb-6">
            <label className="text-[14px] font-bold">{t("New Wallet")}</label>
            <input
              type="text"
              placeholder="0x46d65ff94562365984efd9384e..."
              required
              value={newWallet}
              onChange={(e) => setNewWallet(e.target.value)}
              className="p-4 rounded-[10px] bg-[#ffffff1a] w-full mt-1 text-[14px] font-bold text-[#A9AEB4]"
            />
          </div>

        {/*  <ButtonPrimary
            text={t("Change your Wallet")}
            onClickFn={buttonChangeWallet}
  />*/}

                      <Web3Button
                        contractAddress={process.env.POI_CONTRACT}
                        contractAbi={abiPoi}
                        action={async (contract: any) => {
                          console.log(newWallet)
                          buttonChangeWallet()
                          await contract.call("changeWallet", [
                            newWallet,
                          ]);
                        }}
                        onSuccess={(result) => {
                          setIsProcessing(false);

                          setTimeout(() => {
                            //Cierra el modal
                            setIsModalOpen(false);
                          }, 2000);
                          router.push(`/dashboard`);



                        }}
                        onError={(error) =>{
                          setIsProcessing(false);
                          setIsDeclined(true);
                          setTimeout(() => {
                            setIsModalOpen(false);
                          }, 6000);
                        }}
                        className="buttonPrimary"
                      >
                        {t("Change Wallet")}
                      </Web3Button>

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

  );
};

export default ChangeWallet;
