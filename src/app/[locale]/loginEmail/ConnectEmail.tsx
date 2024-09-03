"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import Google from "@/assets/icons/Google.svg";
import Apple from "@/assets/icons/Apple.svg";
import FaceBook from "@/assets/icons/FacebookLogin.svg";
import Email from "@/assets/icons/mail.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WalletIcon from "@/assets/icons/walletIconLogin.svg";

const ConnectEmail = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="container-infoWallets">
      <h1>{t("Log in")}</h1>

      <div className="container-WalletConnect flex items-center p-4 rounded-lg bg-[#ffffff1a] mt-6" onClick={() => router.push("/connectYourWallet")}>
        <Image src={WalletIcon} alt="Wallet" width={22} height={22} />
        <span className="ml-4 text-[14px] font-bold">{t("Continue with Wallet")}</span>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="h-[1px] bg-[#A9AEB4] w-2/5"></div>
        <span className="text-[14px] font-bold">{t("OR")}</span>
        <div className="h-[1px] bg-[#A9AEB4] w-2/5"></div>
      </div>

      <div className="container-wallets">
        <Link href={"/connectYourWallet/singMessage"} className="container-metamask container-global">
          <Image src={Google} alt="Google" width={22} height={22} />
          <span>{t("Continue with Google")}</span>
        </Link>
        <div className="container-WalletConnect container-global">
          <Image src={Apple} alt="Apple" width={22} height={22} />
          <span>{t("Continue with Apple")}</span>
        </div>
        <div className="container-TrustWallet container-global">
          <Image src={FaceBook} alt="Facebook" width={22} height={22} />
          <span>{t("Continue with Facebook")}</span>
        </div>
        <Link href={"/loginEmail/login"} className="container-Other container-global">
          <Image src={Email} alt="Email" width={22} height={22} />
          <span>{t("Continue with email")}</span>
        </Link>
      </div>

      <div className="p-4 rounded-[8px] border border-solid border-[#ffffff1a] text-center">
        <p className="text-[14px] font-bold">{t("Dont you have an account?")}</p>
        <p className="text-[14px] font-bold text-[#20DABB]" onClick={() => router.push("/loginEmail/signup")}>
          {t("Sign up")}
        </p>
      </div>
    </div>
  );
};

export default ConnectEmail;
