"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { InfoMembership } from "./moskData";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  infoMembership: InfoMembership[];
};

const EachMembreship = ({ infoMembership }: Props) => {
  const t = useTranslations();
  const router = useRouter();

  const buttonClaimRewards = () => {
    console.log("buttonClaimRewards");
    router.push(`/operations?type=claim`);
  };

  return (
    <>
      <div className="p-2 rounded-[20px] border border-solid border-[#A9AEB4] my-6">
        <h1 className="text-[18px] text-[#554D77] text-center font-bold mb-2">
          {t("Each Membership Liquidity")}
        </h1>

        <div className="grid grid-cols-2 justify-items-center gap-x-2 gap-y-4">
          {infoMembership.length > 0 ? (
            infoMembership.map((info) => (
              <div
                key={info.id}
                className="py-4 px-[10px] rounded-2xl border border-solid border-[#AD98FF] shadow-md w-[145px]"
              >
                <h1 className="text-[#7A2FF4] font-bold text-[18px] text-center mb-2">
                  {info.plan}
                </h1>
                <p className="text-[#1E0E39] text-[10px] text-center">
                  {info.type}
                </p>
                <p className="text-[#1E0E39] text-[14px] font-bold text-center">
                  $ {info.amount}
                </p>

                <div className="mt-4">
                  <div className="flex justify-between items-center ">
                    <p className="text-[#554D77] text-[10px]">{t("Share")}</p>
                    <p className="text-[#A9AEB4] text-[10px]">{info.share}%</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[#554D77] text-[10px]">
                      {t("My Profit")}
                    </p>
                    <p className="text-[#A9AEB4] text-[10px]">
                      ${info.myProfit}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-[#7A2FF4] font-bold text-[18px] text-center col-span-2">
              {t("No membership liquidity data")}
            </h1>
          )}
        </div>
      </div>

      <ButtonPrimary
        text={t("Claim Total Rewards")}
        onClickFn={buttonClaimRewards}
      />
    </>
  );
};

export default EachMembreship;
