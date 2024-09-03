"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../../components/generals/ButtonPrimary";

import "react-phone-number-input/style.css";
var CryptoJS = require("crypto-js");
import "./buttonStyle.css";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import abiPoi from '@/abis/abiPoi.json'
import abiAccount from "@/abis/abiAccount.json";
import abiMember from "@/abis/abiMembers.json";
import {
  Web3Button,
} from "@thirdweb-dev/react";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import Image from "next/image";
import { validateEmail, validateFullName, validateUserName, validatePhoneNumber } from "@/utils/value_object_register_steps";
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
var CryptoJS = require("crypto-js");
import "./buttonStyle.css";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core"; // esto solo es tipado

type Props = {
  setStepCompleted: (value: number) => void;
};

const RegisterOne = ({ setStepCompleted }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState({
    email: false,
    name: false,
    userName: false,
    phone: false,
    status: false
  })
  const [fieldError, setFieldError] = useState({
    email: "",
    fullName: "",
    username: "",
    phoneNumber: "",
  });
  const [phone, setPhone] = useState<E164Number | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
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

  function getValueInputFullName(value: string) {
    const valueFullName = validateFullName(value);

    setFullName(value);

    if (valueFullName) {
      setFieldError({
        ...fieldError,
        fullName: valueFullName,
      });
    } else {
      setFieldError({
        ...fieldError,
        fullName: "",
      });
    }
  }

  function getValueInputUsername(value: string) {

    const sanitizedValue = value.replace(/\s+/g, "").toLowerCase();

    const valueUsername = validateUserName(sanitizedValue);

    setUsername(sanitizedValue);

    if (valueUsername) {
      setFieldError({
        ...fieldError,
        username: valueUsername,
      });
    } else {
      setFieldError({
        ...fieldError,
        username: "",
      });
    }
  }


  const getValueInputPhoneNumber = (value: string) => {
    let number = value.replaceAll(" ", "");

    const valuePhoneNumber = validatePhoneNumber(number);

    setPhone(number);

    if (valuePhoneNumber) {
      setFieldError({
        ...fieldError,
        phoneNumber: valuePhoneNumber,
      });
    } else {
      setFieldError({
        ...fieldError,
        phoneNumber: "",
      });
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("step1");
    if (storedData) {
      const { encryptedHex, encryptedHex2, encryptedHex3, encryptedHex4 } = JSON.parse(storedData);
      const secretKey = process.env.SECRET_KEY;

      const decryptData = (encryptedHex: string) => {
        const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);
        const decrypted = CryptoJS.AES.decrypt(
          { ciphertext: encryptedBytes },
          CryptoJS.enc.Hex.parse(secretKey),
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        );
        return decrypted.toString(CryptoJS.enc.Utf8);
      };

      setEmail(decryptData(encryptedHex));
      setFullName(decryptData(encryptedHex2));
      setUsername(decryptData(encryptedHex3));
      setPhone(decryptData(encryptedHex4));
    }
  }, []);

  const sendDataValues = async () => {
    //Funcion para encriptar, almacenar y pasar al siguiente paso
    let error = {
      email: "",
      fullName: "",
      username: "",
      phoneNumber: "",
    };

    if (email === "") {
      error.email = t("Email is required");
    }
    if (fullName === "") {
      error.fullName = t("Full Name is required");
    }
    if (username === "") {
      error.username = t("Username is required");
    }
    if (phone === "") {
      error.username = t("Username is required");
    }

    if (!phone || phone === "") {
      error.phoneNumber = t("Phone Number is required");
    }

    if (error.email || error.fullName || error.username) {
      setFieldError(error);
      return;
    }

    // si estan vacios estos campos significa que no hay errores
    if (fieldError.email === "" && fieldError.fullName === "" && fieldError.username === "" && fieldError.phoneNumber === "") {
      var secretKey = process.env.SECRET_KEY; //La clave para descencriptar
      const encryptedMessage = CryptoJS.AES.encrypt(
        //Encripta email
        email,
        CryptoJS.enc.Hex.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      const encryptedHex = encryptedMessage.ciphertext.toString(CryptoJS.enc.Hex);
      const encryptedMessage2 = CryptoJS.AES.encrypt(
        //Encripta Nombre
        fullName,
        CryptoJS.enc.Hex.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      const encryptedHex2 = encryptedMessage2.ciphertext.toString(CryptoJS.enc.Hex);
      const encryptedMessage3 = CryptoJS.AES.encrypt(
        //Encripta usuario
        username,
        CryptoJS.enc.Hex.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      const encryptedHex3 = encryptedMessage3.ciphertext.toString(
        CryptoJS.enc.Hex
      );
      const encryptedMessage4 = CryptoJS.AES.encrypt(
        phone,
        CryptoJS.enc.Hex.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      const encryptedHex4 = encryptedMessage4.ciphertext.toString(
        CryptoJS.enc.Hex
      );
   
      const sdk = new ThirdwebSDK(137);
      const contract = await sdk.getContract(process.env.POI_CONTRACT,abiPoi);
      const usedEmails = await contract.call("usedEmails", [encryptedHex]);
      const usedNames = await contract.call("usedNames", [encryptedHex2]);
      const usedUsernames = await contract.call("usedUsernames", [encryptedHex3]);
      const usedPhoneNumbers = await contract.call("usedPhoneNumbers", [encryptedHex4]);
      console.log(usedPhoneNumbers)
      if(!usedEmails && !usedNames && !usedUsernames && !usedPhoneNumbers){
        setError({
          email: false,
          name: false,
          userName: false,
          phone: false,
          status: false
        })
        localStorage.setItem(
          "step1",
          JSON.stringify({ encryptedHex, encryptedHex2, encryptedHex3, encryptedHex4}) //Guarda email, nombre y usuario
        );
        const urlParams = new URLSearchParams(window.location.search);
        const referral = urlParams.get("referral");
        router.push(`/purchaseNft?referral=${referral}`); 
        
       console.log("Todo bien")
      }else{
        console.log(usedEmails)
        console.log(usedNames)
        console.log(usedUsernames)
        console.log(usedPhoneNumbers)
        console.log("ERROR")
        setError({
          email: usedEmails,
          name: usedNames,
          userName: usedUsernames,
          phone: usedPhoneNumbers,
          status: true
        })
      } 


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
    <div className="registerOne">
      <div>
        <div className="container-input-label">
          <label htmlFor="">{t("Email Address")}</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={t("Email Address")}
            required
            value={email}
            onChange={(e) => getValueInputEmail(e.target.value)}
          />
          <p className="textErrorInput">{fieldError.email}</p>
          {error.email && <p className="textErrorInput">This email is already in use, please choose another one</p>}
        </div>
        <div className="container-input-label">
          <label htmlFor="">{t("Full Name")}</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder={t("Full Name")}
            required
            value={fullName}
            onChange={(e) => getValueInputFullName(e.target.value)}
          />
          <p className="textErrorInput">{fieldError.fullName}</p>
          {error.name && <p className="textErrorInput">This full name is already in use, please choose another one</p>}
        </div>
        <div className="container-input-label">
          <label htmlFor="">{t("Username")}</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder={t("Username")}
            required
            value={username}
            onChange={(e) => getValueInputUsername(e.target.value)}
          />
          <p className="textErrorInput">{fieldError.username}</p>
          {error.userName && <p className="textErrorInput">This username is already in use, please choose another one</p>}
        </div>
  
        <div className="container-input-label">
          <label htmlFor="">{t("Phone Number")}</label>
          <PhoneInput
            defaultCountry="MX"
            placeholder="Ej: 5585264448"
            value={phone}
            onChange={(value) => (value ? getValueInputPhoneNumber(value) : null)}
          />
          <p className="textErrorInput">{fieldError.phoneNumber}</p>
          {error.phone && <p className="textErrorInput">This phone number is already in use, please choose another one</p>}
        </div>
      </div>
  
      <div>
        {error.status && <p className="textErrorInput">Please correct the fields that are already in use and click Next again</p>}
        <ButtonPrimary text={t("Next")} onClickFn={() => sendDataValues()} />
      </div>
    </div>
  );
  
};

export default RegisterOne;
