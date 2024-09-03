"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/imgs/Logo.png";
import { useTranslations } from "next-intl";
import ButtonSecondary from "../generals/ButtonSecondary";
import { ThirdwebProvider,useChainId } from "@thirdweb-dev/react";

import "./buttonStyle.css";
import ConnectButton from "./ConnectButton";
import LogoInitial from "@/assets/imgs/logoInitial.gif";
import ButtonPrimary from "../generals/ButtonPrimary";

import {
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
  metamaskWallet,
  smartWallet,
  trustWallet,
  rainbowWallet,
  zerionWallet,
  phantomWallet
} from '@thirdweb-dev/react'


const LoginPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  setTimeout(() => {
    setIsStarting(true);
  }, 3000);

  const btnRedirect = (): void => {
    router.push("/loginEmail/signup");
  };

  const btnRedirectLogin = (): void => {
    router.push("/loginEmail");
  };




console.log("Contrato POI",process.env.POI_CONTRACT)
console.log("Contrato Account",process.env.ACCOUNT_CONTRACT)
console.log("Contrato Members",process.env.MEMBERS_CONTRACT)
console.log("Contrato Staking",process.env.CLAIM_CONTRACT)
console.log("Contrato Treasury",process.env.TREASURY_CONTRACT)
console.log("Contrato  Token",process.env.TOKEN_CONTRACT)
console.log("Client ID: ",process.env.CLIENT_ID)


const smartWalletConfig = {
  factoryAddress: '0x15C8D84d83D02BBDe62018105955f896652f2AAd',
  gasless: false // true si queres que la app cubra los gastos de gas. Debe estar fondeado en dashboard de thirdweb
};
const cocayWallet = smartWallet(
  embeddedWallet({ recommended: true }),
  smartWalletConfig
);
cocayWallet.meta.name = "Defily Wallet";

  return (
      <>
      {isStarting ? (
        <div className="welcome">
          <div className="container-up">
            <div className="container-text">
              <Image src={Logo} alt="logo" width={160} height={40} />
              <h1 className="title">
                {t("Welcome to")} <span>Defily</span>!
              </h1>
              <span className="text-span">{t("Please connect to enter the system")}</span>
            </div>
          </div>
          <div className="container-center">
            <div className="container-btn-primary">
               <ConnectButton /> 
             {/* <ButtonPrimary text={t("Log In")} onClickFn={btnRedirectLogin} />*/}
            </div>

            {/*<div className="container-btn-secondary">
              <ButtonSecondary text={t("Create New User")} onClickFn={btnRedirect} />
            </div>*/}
          </div>
          <div className="container-down"></div>
        </div>
      ) : (
        <div className="layout-connect">
          <div className="container-up"></div>
          <div className="mx-auto">
            <Image src={LogoInitial} alt="logo" width={56} height={50} />
          </div>
          <div className="container-down"></div>
        </div>
      )}
      </>
  );
};

export default LoginPage;
