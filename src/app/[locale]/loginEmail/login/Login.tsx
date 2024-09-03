"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { useRouter } from "next/navigation";
import FormLogin from "../components/FormLogin";

const Login = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="container-form mx-6 p-4 rounded-[10px] gradientPurpleLight">
      <h1 className="text-[24px] font-bold mb-6">{t("Log in")}</h1>

      <FormLogin />

      <p className="text-[14px] font-bold mt-8 text-[#A9AEB4] text-center" onClick={() => router.push("/loginEmail/forgotPassword")}>
        {t("I forgot my password")}
      </p>

      <div className="p-4 mt-4 rounded-[8px] border border-solid border-[#ffffff1a] text-center">
        <p className="text-[14px] font-bold">{t("Dont you have an account?")}</p>
        <p className="text-[14px] font-bold text-[#20DABB]" onClick={() => router.push("/loginEmail/signup")}>
          {t("Sign up")}
        </p>
      </div>
    </div>
  );
};

export default Login;
