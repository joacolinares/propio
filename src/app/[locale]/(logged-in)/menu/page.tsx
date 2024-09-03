"use client";
import React, { useState } from "react";
import RewardPoolIcon from "@/assets/icons/RewardPoolIcon.svg";
import TransactionsIcon from "@/assets/icons/transationsIcon.svg";
import ConfigurationIcon from "@/assets/icons/configurationIcon.svg";
import ClaimIcon from "@/assets/icons/claimIconMenu.svg";
import MyTeamIcon from "@/assets/icons/myTeamIcon.svg";
import MembershipIcon from "@/assets/icons/membreshipIcon.svg";
import RankingIcon from "@/assets/icons/rankingIcon.svg";
import HistoryIcon from "@/assets/icons/historyIcon.svg";
import MyAccountsIcon from "@/assets/icons/myAccountMenu.svg";
import GovernanceIcon from "@/assets/icons/governanceIcon.svg";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import HeaderPages from "@/app/components/generals/HeaderPages";
import Link from "next/link";
import ModalComponent from "@/app/components/generals/ModalComponent";
import RelojGif from "@/assets/imgs/reloj-de-bolsillo.gif";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";

interface SvgIcon extends React.FC<React.SVGProps<SVGSVGElement>> {}
interface ListMenu {
  title: string;
  icon: any;
  link: string;
}

const MenuPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idAccount = urlParams.get("idAccount");
  const wallet = urlParams.get("wallet");
  const listMenu: ListMenu[] = [
    {
      title: t("My NFTs"),
      icon: MyAccountsIcon,
      link: `/myAccounts`,
    },
    {
      title: t("My Team"),
      icon: MyTeamIcon,
      link: `/myTeam`,
    },
    {
      title: t("Claims"),
      icon: ClaimIcon,
      link: "/operations?type=claim",
    },
    {
      title: t("Membership"),
      icon: MembershipIcon,
      link: `/members`,
    },
    {
      title: t("Rewards"),
      icon: RewardPoolIcon,
      link: "/rewardPool",
    },
    {
      title: t("Ranking"),
      icon: RankingIcon,
      link: "/ranking",
    },
    {
      title: t("History"),
      icon: HistoryIcon,
      link: "/history",
    },
    {
      title: t("Transactions"),
      icon: TransactionsIcon,
      link: "/transactions",
    },
    {
      title: t("Governance"),
      icon: GovernanceIcon,
      link: ``,
    },
    {
      title: t("Operations"),
      icon: ClaimIcon,
      link: ``,
    },
  ];

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
      <HeaderPages text={t("Menu")} />
      <div className="menu-page">
        {listMenu.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className={`menu-page-item cursor-pointer ${item.title === t("Governance") || item.title === t("Operations") ? "-center-Container" : ""}`}
            onClick={(e) => {
              if (item.title === t("Governance") || item.title === t("Operations")) {
                e.preventDefault();
                setIsModalOpen(true);
              }
            }}
          >
            <div className="container-img">
              <Image src={item.icon} alt="icon" width={22} height={22} />
            </div>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[240px] h-[240px] rounded-xl ">
        <div className="container-modal">
          <div className="container-icon-close cursor-pointer w-6 float-right pt-2" onClick={() => setIsModalOpen(false)}>
            <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <Image src={RelojGif} alt="Reloj" width={132} height={132} />
            <p className="text-center text-[18px] font-bold text-[#A9AEB4] italic mt-[20px]">{t("Coming soon!")}</p>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
};

export default MenuPage;
