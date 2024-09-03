"use client";
import React from "react";
import PaymentMethodCreditCard from "@/app/[locale]/paymentMethod/component/PaymentMethodCreditCard";
import Navbar from "@/app/components/generals/Navbar";
import { useTranslations } from "next-intl";
import Image from "next/image";
import creditCard from "@/assets/imgs/credit-Card-01.png";

const PaymentNewMembership = () => {
  const t = useTranslations();

  return (
    <div className="page-transactions pb-[96px] bg-gradient-to-t from-[#0E0E33] to-[#39307B] h-dvh text-white">
      <div className="container-up p-4">
        <Navbar text={t("New Membership")} />
      </div>
      <Image
        src={creditCard}
        alt="logo"
        width={300}
        height={300}
        className="mx-auto mt-6"
      />
      <PaymentMethodCreditCard amountPay={250} linkBtnPay="/members" />
    </div>
  );
};

export default PaymentNewMembership;
