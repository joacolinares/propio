"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { usePathname, useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";

const StakingInitial = () => {
  const t = useTranslations();
  const [amount, setAmount] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const storedAmount = localStorage.getItem("totalStaking");
    if (storedAmount) {
      setAmount(storedAmount);
    }
  }, []);

  const buttonStake = () => {
    if (pathname === "/staking") {
      localStorage.setItem(
        "totalStaking",
        amount //Guarda email, nombre y usuario
      );
      const urlParams = new URLSearchParams(window.location.search);
      const referral = urlParams.get("referral");
      router.push(`/totalPayment?referral=${referral}`);
    } else {
      router.push("/myAccounts/createNewAccount/totalPayNFT");
    }
  };
  const membershipSelected = localStorage.getItem("membershipSelected");
  console.log(membershipSelected);

  // Variables para valores mínimos y máximos
  let minAmount = "$ 250.00";
  let maxAmount = "$ 9,000.00";

  switch (membershipSelected) {
    case "1":
      minAmount = "$ 500.00";
      maxAmount = "$ 9,999.00";
      break;
    case "2":
      minAmount = "$ 10,000.00";
      maxAmount = "∞";
      break;
    case "3":
      minAmount = "$ 200.00";
      maxAmount = "$ 1,000.00";
      break;
    case "4":
      minAmount = "$ 200.00";
      maxAmount = "$ 2,500.00";
      break;
    case "5":
      minAmount = "$ 200.00";
      maxAmount = "$ 5,000.00";
      break;
    case "6":
      minAmount = "$ 200.00";
      maxAmount = "$ 15,000.00";
      break;
    case "7":
      minAmount = "$ 200.00";
      maxAmount = "$ 100,000.00";
      break;
    case "8":
      minAmount = "$ 200.00";
      maxAmount = "$ 1,000,000.00";
      break;
  }
  

  return (
    <div
      className={`${
        pathname === "/staking" ? "px-[24px] pt-[24px]" : "px-0 pt-0"
      } pb-[96px] bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen text-white`}
    >
      {pathname === "/staking" ? (
        <div className="container-header">
          <div className="container-logo flex">
            <Image src={LogoPeq} alt="logo" width={28} height={24} />
            <div className="w-4/5">
              <div className="text-center text-[12px] text-[#ffffffb3] mx-auto">
                <p>{t("Step 4/4 (Optional)")}</p>
                <p className=" font-bold mt-1">{t("STAKING")}</p>
              </div>
            </div>
          </div>
          <div className="container-bars-progresss grid grid-cols-4 gap-2 mt-[20px]">
            <div className="div-bar h-4">
              <div
                onClick={() => router.push("/register")}
                className={`div-progress h-4 rounded-[20px] bg-[#11BDA0] text-[12px] font-bold cursor-pointer flex items-center justify-center`}
              >
                {`${t("STEP")} 1`}
              </div>
            </div>
            <div className="div-bar bar2">
              <div
                onClick={() => router.push("/purchaseNft")}
                className={`div-progress h-4 rounded-[20px] bg-[#11BDA0] text-[12px] font-bold text-white cursor-pointer flex items-center justify-center`}
              >{`${t("STEP")} 2`}</div>
            </div>
            <div className="div-bar bar3">
              <div
                onClick={() => router.push("/membership")}
                className={`div-progress h-4 rounded-[20px] bg-[#11BDA0] text-[12px] font-bold text-white cursor-pointer flex items-center justify-center`}
              >{`${t("STEP")} 3`}</div>
            </div>
            <div className="div-bar bar4">
              <div
                className={`div-progress h-4 rounded-[20px] bg-[#7A2FF4] text-[12px] font-bold text-white cursor-pointer flex items-center justify-center`}
              >{`${t("STEP")} 4`}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <HeaderPages text={t("Buy NFT")} />
        </div>
      )}

      <div className={`mt-44 ${pathname === "/staking" ? "px-0" : "px-[24px]"}`}>
        <div className="container-Stake-amount text-white p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-gradient-to-t from-[#0E0E33] to-[#39307B] shadow-md">
          <h2 className="text-[24px] font-bold mb-4">{t("Stake")}</h2>
          <div className="mb-6 rounded-[10px] border border-solid border-[#F2F3F8] p-2">
            <p className="text-[14px] font-bold mb-4">{t("Amount")}</p>

            <div className="container-input relative">
              <input
                type="number"
                className="rounded-[10px] p-4 bg-[#ffffff1a] w-full text-white"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$ 0.00"
              />
             {/* <button
                onClick={() => {
                  setAmount("9,000.00");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#A9AEB4]"
              >
                {t("MAX")}
              </button>*/}
            </div>
            <div className="flex justify-between items-center mt-2 mb-4">
              <p className="text-[10px] ">
              <b>{t("MIN")}.:</b> {minAmount}
              </p>

              <p className="text-[10px] ">
              <b>{t("MAX")}.:</b> {maxAmount}
              </p>
            </div>
          </div>
          <div>
            <ButtonPrimary text={t("Stake")} onClickFn={buttonStake} />
          </div>
        </div>
        <div className="w-full mx-auto mt-8 text-center">
          <button
            className="rounded-[10px] border border-solid border-[#A9AEB4] p-4 text-[16px] font-bold text-[#A9AEB4] cursor-pointer"
            onClick={() => {
              const urlParams = new URLSearchParams(window.location.search);
              const referral = urlParams.get("referral");
              localStorage.removeItem('totalStaking');
              pathname === "/staking" ? router.push(`/totalPayment?referral=${referral}`) : router.push("/myAccounts/createNewAccount/totalPayNFT");
            }}
          >
            {t("Skip Now")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StakingInitial;
