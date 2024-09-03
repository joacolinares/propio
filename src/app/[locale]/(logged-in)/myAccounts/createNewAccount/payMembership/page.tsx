import React from "react";
import ActivateYourAccount from "@/app/[locale]/activateYourAccount/component/ActivateYourAccount";
import { getTranslations } from "next-intl/server";

const PayMembershipPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <ActivateYourAccount
        title={t("Pay your membership")}
        description={t(
          "This is one time annual payment You can buy new memberships whenever you wish"
        )}
        payAmount={250}
        linkBtnCard="/myAccounts/createNewAccount/payment"
      />
    </>
  );
};

export default PayMembershipPage;
