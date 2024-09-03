"use client";
import React from "react";
import Header from "@/app/components/generals/Header";
import { usePathname } from "next/navigation";
import { DataSigner } from "./components/moskData";
import { useTranslations } from "next-intl";
import ApprovedIcon from "@/assets/icons/approvedIcon.svg";
import ExpiredIcon from "@/assets/icons/expiredIcon.svg";
import Image from "next/image";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";

interface Props {
  governanceSigner: DataSigner[];
}
const Governance = ({ governanceSigner }: Props) => {
  const pathname = usePathname();
  const t = useTranslations();

  // funcion para recortar la wallet
  const recortarWallet = (userAddress: any) => {
    let onePart = null;
    let twoPart = null;

    if (userAddress) {
      onePart = userAddress.slice(0, 4);
      twoPart = userAddress.slice(userAddress.length - 4, userAddress);
      let walletRecortada = `${onePart}...${twoPart}`;
      return walletRecortada;
    }
  };

  return (
    <>
      <Header text={t("Governance")} />
      <div className="container-cards mx-6 mt-8 pb-24">
        {governanceSigner.map((governance) => (
          <div
            key={governance.dataWallet}
            className="card p-6 mb-4 shadow-sm rounded-[16px]"
          >
            <h1 className="title text-[18px] font-bold text-[#7A2FF4] mb-4">
              {t("Add Signer")}
            </h1>
            <div className="container-info text-[#1E0E39] mb-6">
              <div className="container-data flex items-center justify-between mb-2">
                <p className="text-[14px] ">{t("Data")}</p>
                <p className="text-[14px] font-bold">
                  {t("mint")} ({recortarWallet(governance.dataWallet)},{" "}
                  {governance.invertion})
                </p>
              </div>
              <div className="container-end flex items-center justify-between mb-2">
                <p className="text-[14px] ">{t("End")}</p>
                <p className="text-[14px] font-bold">{governance.dateEnd}</p>
              </div>
              <div className="container-votes flex items-center justify-between ">
                <p className="text-[14px] ">{t("Votes")}</p>
                <p className="text-[14px] font-bold">{governance.votes}</p>
              </div>
              <div className="p-4 mt-6">
                {governance.votes === 100 ? (
                  <div className="flex items-center justify-center">
                    <Image
                      src={ApprovedIcon}
                      alt="Approved Icon"
                      width={18}
                      height={18}
                    />
                    <span className="text-[16px] font-bold ml-2">
                      {t("Approved")}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Image
                      src={ExpiredIcon}
                      alt="Expired Icon"
                      width={18}
                      height={18}
                    />
                    <span className="text-[16px] font-bold ml-2">
                      {t("Expired")}
                    </span>
                  </div>
                )}

                {governance.votes === 100 ? (
                  <div className="mt-4">
                    <ButtonPrimary text={t("Execute")} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Governance;
