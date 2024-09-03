"use client";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SingMessage = () => {
  const t = useTranslations();
  const [rememberActive, setRememberActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendRequest = () => {
    setIsLoading(true);
    router.push("/membership");
    
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="page-SingMessage">
      <h1 className="title-message">{t("Sign Message")}</h1>
      <p className="text-message">{t("textSingMessage")}.</p>

      <div className="container-remember">
        <span className="text-remember">{t("Remember me")}</span>
        <div
          className={`container-circle ${rememberActive ? "--active" : ""}`}
          onClick={() => setRememberActive(!rememberActive)}
        >
          <div className="circle"></div>
        </div>
      </div>

      <div className="container-signing">
        <p className="text-signing">
          {t("Signing is free and will not send a transaction")}.
        </p>
      </div>

      <div className="container-btn">
        <ButtonPrimary
          text={t("Send Request")}
          onClickFn={handleSendRequest}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default SingMessage;
