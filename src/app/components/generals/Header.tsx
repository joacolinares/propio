"use client";
import React from "react";
import Navbar from "./Navbar";
import { usePathname, useRouter } from "next/navigation";
import DataStakesClaims from "@/app/[locale]/(logged-in)/dashboard/components/DataStakesClaims";
import ProfileHeader from "@/app/[locale]/(logged-in)/profile/edit/components/ProfileHeader";
import MembersHeader from "@/app/[locale]/(logged-in)/members/components/MembersHeader";
import RewardHeader from "@/app/[locale]/(logged-in)/rewardPool/components/RewardHeader";
import ButtonPrimary from "./ButtonPrimary";
import { useTranslations } from "next-intl";
import HeaderOperations from "@/app/[locale]/(logged-in)/operations/components/HeaderOperations";
import HeaderLiquidity from "@/app/[locale]/(logged-in)/liquidityPool/components/HeaderLiquidity";



const Header = ({ text }: any) => {
  const pathname = usePathname();
  const t = useTranslations();
  const router = useRouter();
  const wallet = localStorage.getItem('wallet');
  return (
    <div className="header">
      <Navbar text={text} wallet={wallet} />
      {pathname === "/dashboard" ? <DataStakesClaims /> : null}
      {pathname === "/profile" ? <ProfileHeader /> : null}
      {pathname === "/members" ? <MembersHeader /> : null}
      {pathname === "/rewardPool" ? <RewardHeader /> : null}
      {pathname === "/operations" ? <HeaderOperations /> : null}
      {pathname === `/liquidityPool` ? <HeaderLiquidity /> : null}
      {pathname === "/governance" ? (
        <ButtonPrimary
          text={t("Create Proposal")}
          onClickFn={() => router.push("/governance/create")}
        />
      ) : null}
    </div>
  );
};

export default Header;
