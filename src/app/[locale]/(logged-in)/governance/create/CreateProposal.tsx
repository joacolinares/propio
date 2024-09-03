"use client";
import React, { useState } from "react";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { usePathname } from "next/navigation";
import CreateIcon from "@/assets/icons/CreateProposalIcon.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";

const CreateProposal = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const [selectSigner, setSelectSigner] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const handleSelectSigner = (): void => {
    setSelectSigner(!selectSigner);
  };

  const buttonAddSigner = () => {
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
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
      <HeaderPages text={t("Governance")} />
      <div className="container-create pt-8 px-6 pb-24 h-[calc(100vh-145px)]">
        <div className="container-header text-white mb-6">
          <div className="container-title flex items-center mb-2">
            <div className="container-img p-1 rounded-full bg-gradient-to-t from-[#AD98FF] to-[#612DFE] mr-2">
              <Image
                src={CreateIcon}
                alt="Image Create"
                width={16}
                height={16}
              />
            </div>
            <h1 className="title text-[18px] font-bold">
              {t("Create Proposal")}
            </h1>
          </div>
          {!selectSigner ? (
            <p className="text-[14px]">
              {t("Select one of the following options")}
            </p>
          ) : (
            <p className="text-[14px]">
              {t(
                "Now complete your application Your proposal will be subject to a voting process"
              )}
            </p>
          )}
        </div>

        <div className="container-body text-white p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-gradient-to-t from-[#ffffff1a] to-[#ffffff00]">
          {!selectSigner ? (
            <div className="container-options ">
              <p className="pb-4 text-[16px] border-b border-solid border-[#ffffff1a]">
                {t("Enable Staking Time")}
              </p>
              <p className="py-4 text-[16px] border-b border-solid border-[#ffffff1a]">
                {t("Disable Staking Time")}
              </p>
              <p className="py-4 text-[16px] border-b border-solid border-[#ffffff1a]">
                {t("Add Performance Fee Bracket")}
              </p>
              <p className="py-4 text-[16px] border-b border-solid border-[#ffffff1a]">
                {t("Edit Performance Fee Bracket")}
              </p>
              <p className="py-4 text-[16px] border-b border-solid border-[#ffffff1a]">
                {t("Remove Performance Fee Bracket")}
              </p>
              <p className="py-4 text-[16px] border-b border-solid border-[#ffffff1a]">
                {t("Set Performance Fee Recipient Shares")}
              </p>
              <p className="py-4 text-[16px] border-b border-solid border-[#ffffff1a]">
                {t("Set Global Min Deposit")}
              </p>
              <p className="pt-4 text-[16px]" onClick={handleSelectSigner}>
                {t("Add Signer")}
              </p>
            </div>
          ) : (
            <div className="container-add-signer">
              <h1 className="text-[18px] font-bold mb-6">{t("Add Signer")}</h1>
              <div className="container-role-type rounded-[10px] border border-solid border-[#ffffff1a] p-2 text-white">
                <div className="container-role mb-6">
                  <p className="text-[14px] font-bold mb-1">{t("Role")}</p>
                  <input
                    type="text"
                    placeholder={t("Admin")}
                    className="text-[14px] w-full p-4 rounded-[10px] bg-[#ffffff1a]"
                  />
                </div>
                <div className="container-type">
                  <p className="text-[14px] font-bold mb-1">
                    {t("Type the Wallet")}
                  </p>
                  <input
                    type="text"
                    placeholder="0x983110309620D911731A...06091b6744"
                    className="text-[14px] text-wrap w-full p-4 rounded-[10px] bg-[#ffffff1a]"
                  />
                </div>
              </div>

              <div className="container-buttons flex justify-between mt-6 space-x-4">
                <div className="w-1/2">
                  <ButtonSecondary
                    text={t("Cancel")}
                    onClickFn={handleSelectSigner}
                  />
                </div>
                <div className="w-1/2">
                  <ButtonPrimary text={t("Add")} onClickFn={buttonAddSigner} />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProposal;
