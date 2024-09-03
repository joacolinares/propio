import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { validateDateOfBirth, validateGender } from "@/utils/value_object_register_steps";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUserRegisterStore } from "@/store/user-register";
var CryptoJS = require("crypto-js");
import "./buttonStyle.css";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import Image from "next/image";
import abiPoi from '@/abis/abiPoi.json'

import {
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
  metamaskWallet,
  smartWallet,
  trustWallet,
  rainbowWallet,
  zerionWallet,
  phantomWallet,
  ThirdwebProvider
} from '@thirdweb-dev/react'

import CirclePurple from "@/assets/icons/circle-purple-modal.svg";

const RegisterThree = () => {
  const t = useTranslations();
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isDeclined, setIsDeclined] = useState(false);
  const [fieldError, setFieldError] = useState({
    gender: "",
    dateOfBirth: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const { updateUser, ...user } = useUserRegisterStore();

  const getValueInputGender = (value: string) => {
    const valueGender = validateGender(value);

    setGender(value);

    if (valueGender) {
      setFieldError({
        ...fieldError,
        gender: valueGender,
      });
    } else {
      setFieldError({
        ...fieldError,
        gender: "",
      });
    }
  };

  const getValueInputDateOfBirth = (value: string) => {
    const valueDateOfBirth = validateDateOfBirth(value);
    setDateOfBirth(value);

    if (valueDateOfBirth) {
      setFieldError({
        ...fieldError,
        dateOfBirth: valueDateOfBirth,
      });
    } else {
      setFieldError({
        ...fieldError,
        dateOfBirth: "",
      });
    }
  };

  const sendDataValues = () => {
    if ((!gender || gender === "") && dateOfBirth === "") {
      setFieldError({
        gender: t("Gender is required"),
        dateOfBirth: t("Date Of Birth is required"),
      });
      return;
    }

    // si estan vacios estos campos significa que no hay errores
    if (fieldError.gender === "" && fieldError.dateOfBirth === "") {
      // Esta ruta es solo para pasar a la siguiente page
      setIsModalOpen(true);
      setIsProcessing(true);

      setTimeout(() => {
        setIsProcessing(false);
      }, 5000);

      setTimeout(() => {
        setIsModalOpen(false);

        router.push(`/activateYourAccount`);
      }, 6000);

      //Aca lo que hace es encryptar y almacenar el genero y la fecha de cumpleaños
      var secretKey = process.env.SECRET_KEY;

      const encryptedMessage = CryptoJS.AES.encrypt(gender, CryptoJS.enc.Hex.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const encryptedHex = encryptedMessage.ciphertext.toString(CryptoJS.enc.Hex);

      const encryptedMessage2 = CryptoJS.AES.encrypt(dateOfBirth, CryptoJS.enc.Hex.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const encryptedHex2 = encryptedMessage2.ciphertext.toString(CryptoJS.enc.Hex);

      localStorage.setItem("step3", JSON.stringify({ encryptedHex, encryptedHex2 }));

    /*  const currentUrl = window.location.href;
      const queryStringIndex = currentUrl.indexOf("?");
      if (queryStringIndex !== -1) {
        const queryString = currentUrl.slice(queryStringIndex + 1);
        const params = new URLSearchParams(queryString);
        const referralWallet = params.get("refferalWallet");
        const wallet = params.get("wallet");
        console.log(referralWallet);

        setIsModalOpen(true);
        setIsProcessing(true);

        setTimeout(() => {
          setIsProcessing(false);
        }, 5000);

        setTimeout(() => {
          setIsModalOpen(false);

          router.push(`/activateYourAccount?refferalWallet=${referralWallet}`);
        }, 9000);
      }
      */
    }
  };

  const buttonPayWithWallet = () => {
    setIsModalOpen(true);
    setIsProcessing(true);
  };

  const smartWalletConfig = {
    factoryAddress: '0x15C8D84d83D02BBDe62018105955f896652f2AAd',
    gasless: false // true si queres que la app cubra los gastos de gas. Debe estar fondeado en dashboard de thirdweb
  };
  const cocayWallet = smartWallet(
    embeddedWallet({ recommended: true }),
    smartWalletConfig
  );
  cocayWallet.meta.name = "Defily Wallet";

  return (

      <div className="registerThree">
        <div>
          <div className="container-input-label">
            <label htmlFor="">{t("Gender")}</label>
            <select
              aria-label="Default select example"
              className="selectGender form-control"
              id="inputGender"
              value={gender}
              onChange={(e) => getValueInputGender(e.target.value)}
            >
              <option value={t("Gender")}>{t("Gender")}</option>
              <option value={t("Male")}>{t("Male")}</option>
              <option value={t("Female")}>{t("Female")}</option>
            </select>
            <p className="textErrorInput">{fieldError.gender}</p>
          </div>
          <div className="container-input-label">
            <label htmlFor="">{t("Date of Birth")}</label>
            <input
              type="date"
              name="username"
              id="username"
              placeholder={t("Select your Date of Birth")}
              required
              value={dateOfBirth}
              onChange={(e) => getValueInputDateOfBirth(e.target.value)}
            />
            <p className="textErrorInput">{fieldError.dateOfBirth}</p>
          </div>
        </div>

        <div>
          <ButtonPrimary text={t("Activate your account")!} onClickFn={sendDataValues} />
          <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
            {isProcessing ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div>
                  <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                </div>
                <div className="mt-8">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Registering User")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Registry")}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div>
                  <Image src={CheckDone} alt="Check done" width={60} height={60} />
                </div>
                <div className="my-8">
                  <div className="flex items-center">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Registering User")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Successful Registry")}</span>
                  </div>
                </div>
                <p className="mt-8 text-[18px] text-[#20DABB] text-center">{t("DONE")}!</p>
              </div>
            )}
          </ModalComponent>
        </div>
        
      </div>

  );
};

export default RegisterThree;
