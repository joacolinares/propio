"use client";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { validateEmail } from "@/utils/value_object_register_steps";

const ForgotPassword = () => {
  const t = useTranslations();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [fieldError, setFieldError] = useState({
    email: "",
  });

  function getValueInputEmail(value: string) {
    const valueEmail = validateEmail(value);

    setEmail(value);

    if (valueEmail) {
      setFieldError({
        ...fieldError,
        email: valueEmail,
      });
    } else {
      setFieldError({
        ...fieldError,
        email: "",
      });
    }
  }

  const sendDataValues = () => {
    let error = {
      email: "",
    };

    if (email === "") {
      error.email = t("Email is required");
    }

    if (error.email) {
      setFieldError(error);
      return;
    }

    // si estan vacios estos campos significa que no hay errores
    if (fieldError.email === "") {
      localStorage.setItem("EmailRecoverPassword", JSON.stringify({ email }));
      router.push("/loginEmail/changePassword");
    }
  };

  return (
    <div className="container-form mx-6 p-4 rounded-[10px] gradientPurpleLight">
      <h1 className="text-[24px] font-bold mb-6">{t("Recover password")}</h1>

      <div className="text-[14px] leading-5">
        <span className="font-bold">{t("Enter the email")} </span>
        <span>
          {t(
            "that you used when you signed up to recover your password You will receive a"
          )}
        </span>
        <span className="font-bold"> {t("password reset link")}</span>
      </div>

      <div className="my-6">
        <label className="text-[14px] font-bold block mb-1">
          {t("Email Address")}
        </label>
        <input
          className="w-full p-4 rounded-[10px] bg-[#ffffff1a]"
          type="email"
          required
          value={email}
          onChange={(e) => getValueInputEmail(e.target.value)}
        />
        <p className="textErrorInput">{fieldError.email}</p>
      </div>

      <div>
        <ButtonPrimary text={t("Send link")} onClickFn={sendDataValues} />
      </div>

      <div className="text-[14px] font-bold mt-8 text-center">
        <p>{t("If you need further assistance")}</p>
        <p className="text-[#20DABB]">{t("contact our support team")}</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
