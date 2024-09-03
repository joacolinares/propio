"use client";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import EyePassword from "@/assets/icons/eye-off.svg";
import { usePathname, useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/value_object_register_steps";

const FormLogin = () => {
  const t = useTranslations();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldError, setFieldError] = useState({
    email: "",
    password: "",
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

  function getValueInputPassword(value: string) {
    const valuePassword = validatePassword(value);

    setPassword(value);

    if (valuePassword) {
      setFieldError({
        ...fieldError,
        password: valuePassword,
      });
    } else {
      setFieldError({
        ...fieldError,
        password: "",
      });
    }
  }

  const sendDataValues = () => {
    let error = {
      email: "",
      password: "",
    };

    if (email === "") {
      error.email = t("Email is required");
    }
    if (password === "") {
      error.password = t("Password is required");
    }

    if (error.email || error.password) {
      setFieldError(error);
      return;
    }
    // si estan vacios estos campos significa que no hay errores
    if (fieldError.email === "" && fieldError.password === "") {
      if (pathname === "/loginEmail/login") {
        localStorage.setItem("dataLogin", JSON.stringify({ email, password }));
        router.push("/dashboard");
      }
      if (pathname === "/loginEmail/signup") {
        localStorage.setItem("dataSignup", JSON.stringify({ email, password }));
        router.push("/knowOurTerms");
      }
    }
  };

  return (
    <div className="form">
      <div className="mb-4">
        <label className="text-[14px] font-bold block mb-1">{t("Email Address")}</label>
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
        <label className="text-[14px] font-bold block mb-1">{t("Password")}</label>
        <div className="relative">
          <input
            className="w-full p-4 rounded-[10px] bg-[#ffffff1a] "
            type={isVisible ? "text" : "password"}
            required
            value={password}
            onChange={(e) => getValueInputPassword(e.target.value)}
          />

          <Image
            width={18}
            height={18}
            src={EyePassword}
            alt="eye"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>
        <p className="textErrorInput">{fieldError.password}</p>
      </div>
      <div className="mt-6">
        {pathname === "/loginEmail/login" ? (
          <ButtonPrimary text={t("Log in")} onClickFn={sendDataValues} />
        ) : (
          <ButtonPrimary text={t("Sign up")} onClickFn={sendDataValues} />
        )}
      </div>
    </div>
  );
};

export default FormLogin;
