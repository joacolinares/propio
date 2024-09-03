"use client";
import React from "react";
import ContainerLanguage from "./ContainerLanguage";
import NotificationsSVG from "@/assets/icons/NotificationsIcon";
import AccountSVG from "@/assets/icons/Door.svg";
import SupportSVG from "@/assets/icons/Support.svg";
import GoBack from "./GoBack";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type HeaderPagesProps = {
  text: string;
};

const HeaderPages = ({ text }: HeaderPagesProps) => {
  const router = useRouter();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const wallet = localStorage.getItem("wallet");

  return (
    <div className="headerPage">
      <GoBack text={text} />

      <div className="container-language-notifications">
        <Link href={`/accountLogin`} className="cursor-pointer">
          <Image src={AccountSVG} alt="icon" width={24} height={24} />
        </Link>
        <div className="cursor-pointer">
          <Image src={SupportSVG} alt="icon" width={24} height={24} />
        </div>

        <ContainerLanguage />
        <NotificationsSVG fill="#fff" width={24} height={24} onClick={() => router.push("/notifications")} />
      </div>
    </div>
  );
};

export default HeaderPages;
