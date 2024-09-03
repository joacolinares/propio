import React from "react";
import ActivateYourAccount from "../../activateYourAccount/component/ActivateYourAccount";
import { getTranslations } from "next-intl/server";

const PayMembershipPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <ActivateYourAccount
        title={t("Pay your membership")}
        description={t("This is one time annual payment You can buy new memberships whenever you wish")}
        payAmount={250}
        linkBtnCard="/membership/payment"
        titleHeader={t("Step 3/4 (Required)")}
        textHeader={t("MEMBERSHIP PURCHASE")}
        textBtn={t("Pay with your credit card")}
      />
    </>
  );
};

export default PayMembershipPage;
