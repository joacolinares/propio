"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import EyePassword from "@/assets/icons/eye-off.svg";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import { validatePassword } from "@/utils/value_object_register_steps";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";

const ChangePassword = () => {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fieldError, setFieldError] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  function getValueInputPassword(value: string) {
    const valuePassword = validatePassword(value);

    setNewPassword(value);

    if (valuePassword) {
      setFieldError({
        ...fieldError,
        newPassword: valuePassword,
      });
    } else {
      setFieldError({
        ...fieldError,
        newPassword: "",
      });
    }
  }

  function getValueInputNewPassword(value: string) {
    const valuePassword = validatePassword(value);

    setConfirmNewPassword(value);

    if (valuePassword) {
      setFieldError({
        ...fieldError,
        confirmNewPassword: valuePassword,
      });
    } else {
      setFieldError({
        ...fieldError,
        confirmNewPassword: "",
      });
    }
  }

  const sendDataValues = () => {
    let error = {
      newPassword: "",
      confirmNewPassword: "",
    };

    if (newPassword === "") {
      error.newPassword = t("Password is required");
    }

    if (newPassword !== confirmNewPassword) {
      error.confirmNewPassword = t("Passwords do not match");
    }

    if (confirmNewPassword === "") {
      error.confirmNewPassword = t("Password is required");
    }

    if (error.newPassword || error.confirmNewPassword) {
      setFieldError(error);
      return;
    }

    // si estan vacios estos campos significa que no hay errores
    if (fieldError.newPassword === "" && fieldError.confirmNewPassword === "") {
      localStorage.setItem("dataChangePassword", JSON.stringify({ newPassword, confirmNewPassword }));
      setIsModalOpen(true);
      setIsProcessing(true);

      setTimeout(() => {
        setIsProcessing(false);
      }, 5000);

      setTimeout(() => {
        setIsModalOpen(false);

        router.push("/loginEmail/login");
      }, 6000);
    }
  };

  return (
    <div className="container-form mx-6 p-4 rounded-[10px] gradientPurpleLight">
      <h1 className="text-[24px] font-bold mb-6">{t("Change password")}</h1>

      <div>
        <label className="text-[14px] font-bold block mb-1">{t("Enter your new password")}</label>
        <div className="relative">
          <input
            className="w-full p-4 rounded-[10px] bg-[#ffffff1a] "
            type={isVisible ? "text" : "password"}
            required
            value={newPassword}
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
      </div>
      <p className="textErrorInput">{fieldError.newPassword}</p>

      <div className="mt-6">
        <label className="text-[14px] font-bold block mb-1">{t("Re-enter your new password")}</label>
        <div className="relative">
          <input
            className="w-full p-4 rounded-[10px] bg-[#ffffff1a] "
            type={isVisible ? "text" : "password"}
            required
            value={confirmNewPassword}
            onChange={(e) => getValueInputNewPassword(e.target.value)}
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
      </div>
      <p className="textErrorInput">{fieldError.confirmNewPassword}</p>

      <div className="mt-6">
        <ButtonPrimary text={t("Change password")} onClickFn={sendDataValues} />
        <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
          {isProcessing ? (
            <div className="w-full h-full flex flex-col items-center justify-center px-16">
              <div>
                <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{`${t("Saving your New Password")}...`}</p>
            </div>
          ) : isDeclined ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Password Un-Successfully Saved!")}</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={CheckDone} alt="Check done" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("New Password Successfully Saved!")}</p>
            </div>
          )}
        </ModalComponent>
      </div>
    </div>
  );
};

export default ChangePassword;
