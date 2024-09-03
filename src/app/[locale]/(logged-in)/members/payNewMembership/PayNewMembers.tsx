"use client";
import React from "react";
import ActivateYourAccount from "@/app/[locale]/activateYourAccount/component/ActivateYourAccount";
import { useTranslations } from "next-intl";
import Navbar from "@/app/components/generals/Navbar";

const PayNewMembers = () => {
  const t = useTranslations();

  return (
    <div className="layout-connect">
      <div className="container-up">
        <div className="container-logo">
          <Navbar text={"New Membership"} />
        </div>
      </div>

      <ActivateYourAccount
        title={t("Pay your membership")}
        description={t(
          "This is one time annual payment You can buy new memberships whenever you wish"
        )}
        payAmount={250}
        linkBtnCard="/members/paymentNewMembership"
      />
      <div className="container-down"></div>
    </div>
  );
};

export default PayNewMembers;
