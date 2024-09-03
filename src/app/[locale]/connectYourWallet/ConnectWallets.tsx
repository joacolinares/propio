"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import MetamaskIcon from "@/assets/icons/Metamask.svg";
import WalletConnectIcon from "@/assets/icons/WalletConnect.svg";
import TrustWalletIcon from "@/assets/icons/TrustWallet.svg";
import OtherIcon from "@/assets/icons/Other.svg";
import Link from "next/link";

const ConnectWallets = () => {
  const t = useTranslations();

  return (
    <div className="container-infoWallets">
      <h1>{t("Connect your wallet")}</h1>
      <p>{t("Select your wallet from these supported options")}:</p>

      <div className="container-wallets">
        <Link href={"/connectYourWallet/singMessage"} className="container-metamask container-global">
          <Image
            src={MetamaskIcon}
            alt="metamask"
            width={22}
            height={22}
          />
          <span>{t("Metamask")}</span>
        </Link>
        <div className="container-WalletConnect container-global">
          <Image
            src={WalletConnectIcon}
            alt="Wallet Connect"
            width={22}
            height={22}
          />
          <span>{t("Wallet Connect")}</span>
        </div>
        <div className="container-TrustWallet container-global">
          <Image
            src={TrustWalletIcon}
            alt="Trust Wallet"
            width={22}
            height={22}
          />
          <span>{t("Trust Wallet")}</span>
        </div>
        <div className="container-Other container-global">
          <Image src={OtherIcon} alt="Other" width={22} height={22} />
          <span>{t("Other")}</span>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallets;
