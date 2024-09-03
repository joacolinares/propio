"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import Image from "next/image";
import { useUserRegisterStore } from "@/store/user-register";

const RegistrationPayNFT = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const userStore = useUserRegisterStore();

  const buttonConfirm = () => {
    localStorage.setItem(
      "nftConfirm",
      "true" // Guarda email, nombre y usuario
    );
    if (pathname === "/myAccounts/createNewAccount/paymentNFT") {
      router.push("/myAccounts/createNewAccount/selectMembershipNFT");
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const referral = urlParams.get("referral");
      console.log(referral)
      router.push(`/membership?referral=${referral}`);
    }
  };

  return (
    <div>
      <div className="my-6">
        <div className="p-4 rounded-[10px] bg-gradient-to-b from-[#ffffff1a] to-[#ffffff00]">
          <h1 className="text-[24px] font-bold">{t("Account Registration Payment (NFT)")}</h1>
          <div className="w-full my-8">
            <Image src={userStore?.imgAccount} alt="NFT" width={350} height={350} className="object-cover" />
          </div>
          <div className="text-[14px] leading-5">
            <span>{t("This is a one-time payment Earn up to 50% from all direct referrals registrations")} </span>
          </div>

          <div className="container-wallets mt-8">
            <div className="flex justify-center items-center shadow-sm shadow-[#00000014] rounded-[16px] border-solid border-[1px] border-[#AD98FF] text-[14px] w-[162px] mx-auto p-[24px] bg-[#ffffff1a]">
              <div className="flex justify-center items-center space-x-2">
                <div className="text-[14px]">{t("Total")}</div>
                <div className="text-[24px] font-bold">$30</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <ButtonPrimary text={t("Confirm")} onClickFn={buttonConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPayNFT;
