"use client";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core"; // esto solo es tipado
import {
  validatePhoneNumber,
  validateCountry,
} from "@/utils/value_object_register_steps";
import { ThirdwebProvider } from "@thirdweb-dev/react";
var CryptoJS = require("crypto-js");
import "./buttonStyle.css";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import abiPoi from '@/abis/abiPoi.json'
type Props = {
  setStepCompleted: (value: number) => void;
  allCountries: any[];
};

const RegisterTwo = ({ setStepCompleted, allCountries }: Props) => {
  const t = useTranslations();
  const [phone, setPhone] = useState<E164Number | undefined>();
  const [country, setCountry] = useState<string>("");
  const [fieldError, setFieldError] = useState({
    country: "",
    phoneNumber: "",
  });
  const [error, setError] = useState(false)
  const getValueInputCountry = (value: string) => {
    const valueCountry = validateCountry(value);

    setCountry(value);

    if (valueCountry) {
      setFieldError({
        ...fieldError,
        country: valueCountry,
      });
    } else {
      setFieldError({
        ...fieldError,
        country: "",
      });
    }
  };

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

  const sendDataValues = async() => {
    if ((!phone || phone === "") && country === "") {
      setFieldError({
        country: t("Country is required"),
        phoneNumber: t("Phone Number is required"),
      });
      return;
    }

    // si estan vacios estos campos significa que no hay errores
    if (fieldError.country === "" && fieldError.phoneNumber === "") { //Aca lo que hace es que encrypta y guarda el numero de telefono y el pais
      var secretKey = process.env.SECRET_KEY;

      const encryptedMessage = CryptoJS.AES.encrypt(
        phone,
        CryptoJS.enc.Hex.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      const encryptedHex = encryptedMessage.ciphertext.toString(
        CryptoJS.enc.Hex
      );

      const encryptedMessage2 = CryptoJS.AES.encrypt(
        country,
        CryptoJS.enc.Hex.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      const encryptedHex2 = encryptedMessage2.ciphertext.toString(
        CryptoJS.enc.Hex
      );


      const sdk = new ThirdwebSDK(137);
      const contract = await sdk.getContract(process.env.POI_CONTRACT,abiPoi);


      const usedPhoneNumbers = await contract.call("usedPhoneNumbers", [encryptedHex]);
      console.log(usedPhoneNumbers)

      console.log(phone)
      if(!usedPhoneNumbers){
        setError(false)
        
       localStorage.setItem(
          "step2",
          JSON.stringify({ encryptedHex, encryptedHex2 })
        );
 
        setStepCompleted(3);
        

       console.log("Todo bien")
      }else{
        console.log("ERROR")
        setError(true)
      } 


    }
  };


  //ThirdwebProvider
  return (

      <div className="registerTwo">
        <div>
          <div className="container-input-label">
            <label htmlFor="">{t("Phone Number")}</label>
            <PhoneInput
              defaultCountry="MX"
              placeholder="Ej: 5585264448"
              value={phone}
              onChange={(value) =>
                value ? getValueInputPhoneNumber(value) : null
              }
            />
            <p className="textErrorInput">{fieldError.phoneNumber}</p>
          </div>
          <div className="container-input-label">
            <label htmlFor="">{t("Country")}</label>
            <select
              name="country"
              id="country"
              required
              value={country}
              onChange={(e) => getValueInputCountry(e.target.value)}
            >
              {allCountries
                ?.sort((a, b) => {
                  const aa = a.name.common;
                  const bb = b.name.common;

                  if (aa > bb) {
                    return 1;
                  }
                  if (aa < bb) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                })
                .map((country, index) => (
                  <option key={index} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
            </select>
            <p className="textErrorInput">{fieldError.country}</p>
          </div>
        </div>

        <div>
        {error ? <p className="textErrorInput">The phone number has already been used, please choose another and press Continue.</p> : <></>}
          <ButtonPrimary
            text={t("Continue")}
            onClickFn={() => sendDataValues()}
          />

        </div>
      </div>

  );
};

export default RegisterTwo;
