"use client";
import { useTranslations } from "next-intl";
import React, { use, useCallback, useEffect, useState } from "react";
import { UserRegisterState, useUserRegisterStore } from "@/store/user-register";
import {
  validateCountry,
  validateDateOfBirth,
  validateEmail,
  validateFullName,
  validateGender,
  validatePhoneNumber,
  validateUserName,
} from "@/utils/value_object_register_steps";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";

import {
  ThirdwebProvider,
  Web3Button,
} from "@thirdweb-dev/react";
import abiPoi from '@/abis/abiPoi.json'
import "./buttonStyle.css";
import Image from "next/image";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";

type Props = {
  allCountries: any[];
};
var CryptoJS = require("crypto-js");

const EditProfile = ({ allCountries }: Props) => {
  const t = useTranslations();

  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [fieldError, setFieldError] = useState({
    email: "",
    fullName: "",
    username: "",
    country: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
    setIsProcessing(true);
  };

  //este useEffect solo lo utilizare hasta hacer el fetch de datos real
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email") || "";
    const fullName = searchParams.get("name") || "";
    const username = searchParams.get("username") || "";
    const phoneInfo = searchParams.get("phone") || "";
    const country = searchParams.get("country") || "";
    const gender = searchParams.get("gender") || "";
    const dateOfBirth = searchParams.get("date") || "";
    const bioGra = searchParams.get("bioGra") || "";
    
    const fb = searchParams.get("fb") || "";
    const ig = searchParams.get("ig") || "";
    const yt = searchParams.get("yt") || "";
    const tiktok = searchParams.get("tiktok") || "";
    const wsp = searchParams.get("wsp") || "";

    const formattedDateOfBirth = dateOfBirth.split('-').reverse().join('-');

    setEmail(email);
    setFullName(fullName);
    setUsername(username);
    setPhone(phoneInfo);
    setCountry(country);
    setGender(gender);
    setDateOfBirth(formattedDateOfBirth);
    setBio(bioGra)

    setFacebook(fb)
    setInstagram(ig)
    setYoutube(yt)
    setTiktok(tiktok)
    setWhatsapp(wsp)
  }, [searchParams]);

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
    const valueUsername = validateUserName(value);
    setUsername(value);
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

  const { updateUser, ...user } = useUserRegisterStore();


  //ThirdwebProvider
  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B]">

        <HeaderPages text={t("Edit Profile")} />

        <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
          {isProcessing ? (
            <div className="w-full h-full flex flex-col items-center justify-center px-16">
              <div>
                <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Processing your Request")}</p>
            </div>
          ) : isDeclined ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={RechazedIcon} alt="Decline" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Failed Transfer")}</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <Image src={CheckDone} alt="Check done" width={60} height={60} />
              </div>
              <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Done")}</p>
            </div>
          )}
        </ModalComponent>

        <div className="edit-profile ">
          <form className="container-form-redes container-form border border-solid border-[#AD98FF]">
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
            </div>
            {/* <div className="container-input-label">
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
            </div> */}
            <div className="container-input-label">
              <label htmlFor="">{t("Phone Number")}</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder={"Ej: 5585264448"}
                required
                value={phone}
                onChange={(e) => getValueInputPhoneNumber(e.target.value)}
              />
              <p className="textErrorInput">{fieldError.phoneNumber}</p>
            </div>
            <div className="container-input-label">
              <label htmlFor="">{t("Country")}</label>
              <select name="country" id="country" required value={country} onChange={(e) => getValueInputCountry(e.target.value)}>
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
          </form>
          <div className="container-bio">
            <label htmlFor="">{t("Bio")}</label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Steve Jobs (1955-2011) was a visionary entrepreneur and co-founder of Apple Inc. He revolutionized the technology industry with innovative products such as the iPhone, iPad and Mac. He also led Pixar, transforming animated film. His focus on design and functionality left a lasting legacy."
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <form className="container-form">
            <div className="container-input-label">
              <label htmlFor="">Facebook</label>
              <input
                type="text"
                name="facebook"
                id="facebook"
                placeholder="facebook.com/stevejobs"
                required
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="container-input-label">
              <label htmlFor="">Instagram</label>
              <input
                type="text"
                name="instagram"
                id="instagram"
                placeholder="instagram.com/stevejobs"
                required
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="container-input-label">
              <label htmlFor="">YouTube</label>
              <input
                type="text"
                name="youtube"
                id="youtube"
                placeholder="youtube.com/stevejobs"
                required
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>
            <div className="container-input-label">
              <label htmlFor="">TikTok</label>
              <input
                type="text"
                name="tiktok"
                id="tiktok"
                placeholder="tiktok.com/stevejobs"
                required
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
              />
            </div>
            <div className="container-input-label">
              <label htmlFor="">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                placeholder="wa.me/44221232323"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
          </form>
          <div>
            <Web3Button
              contractAddress={process.env.POI_CONTRACT}
              contractAbi={abiPoi}
              action={async (contract: any) => {
                var secretKey = process.env.SECRET_KEY;
                const encryptedMessage = CryptoJS.AES.encrypt(email, CryptoJS.enc.Hex.parse(secretKey), {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                });
                const encryptedHex = encryptedMessage.ciphertext.toString(CryptoJS.enc.Hex);
                const encryptedMessage2 = CryptoJS.AES.encrypt(fullName, CryptoJS.enc.Hex.parse(secretKey), {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                });
                const encryptedHex2 = encryptedMessage2.ciphertext.toString(CryptoJS.enc.Hex);

                const encryptedMessage3 = CryptoJS.AES.encrypt(username, CryptoJS.enc.Hex.parse(secretKey), {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                });
                const encryptedHex3 = encryptedMessage3.ciphertext.toString(CryptoJS.enc.Hex);

                const encryptedMessage4 = CryptoJS.AES.encrypt(phone, CryptoJS.enc.Hex.parse(secretKey), {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                });
                const encryptedHex4 = encryptedMessage4.ciphertext.toString(CryptoJS.enc.Hex);

                const encryptedMessage5 = CryptoJS.AES.encrypt(country, CryptoJS.enc.Hex.parse(secretKey), {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                });
                const encryptedHex5 = encryptedMessage5.ciphertext.toString(CryptoJS.enc.Hex);

                const encryptedMessage6 = CryptoJS.AES.encrypt(gender, CryptoJS.enc.Hex.parse(secretKey), {
                  mode: CryptoJS.mode.ECB,
                  padding: CryptoJS.pad.Pkcs7,
                });
                const encryptedHex6 = encryptedMessage6.ciphertext.toString(CryptoJS.enc.Hex);

                const encryptedMessage7 = CryptoJS.AES.encrypt(
                  dateOfBirth,
                  CryptoJS.enc.Hex.parse(secretKey),
                  {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                  }
                );
                const encryptedHex7 = encryptedMessage7.ciphertext.toString(
                  CryptoJS.enc.Hex
                );

                const encryptedMessage8 = CryptoJS.AES.encrypt(
                  facebook,
                  CryptoJS.enc.Hex.parse(secretKey),
                  {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                  }
                );
                const encryptedHex8 = encryptedMessage8.ciphertext.toString(
                  CryptoJS.enc.Hex
                );

                const encryptedMessage9 = CryptoJS.AES.encrypt(
                  instagram,
                  CryptoJS.enc.Hex.parse(secretKey),
                  {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                  }
                );
                const encryptedHex9 = encryptedMessage9.ciphertext.toString(
                  CryptoJS.enc.Hex
                );

                const encryptedMessage10 = CryptoJS.AES.encrypt(
                  youtube,
                  CryptoJS.enc.Hex.parse(secretKey),
                  {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                  }
                );
                const encryptedHex10 = encryptedMessage10.ciphertext.toString(
                  CryptoJS.enc.Hex
                );

                const encryptedMessage11 = CryptoJS.AES.encrypt(
                  tiktok,
                  CryptoJS.enc.Hex.parse(secretKey),
                  {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                  }
                );
                const encryptedHex11 = encryptedMessage11.ciphertext.toString(
                  CryptoJS.enc.Hex
                );

                const encryptedMessage12 = CryptoJS.AES.encrypt(
                  whatsapp,
                  CryptoJS.enc.Hex.parse(secretKey),
                  {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                  }
                );
                const encryptedHex12 = encryptedMessage12.ciphertext.toString(
                  CryptoJS.enc.Hex
                );

                const encryptedMessage13 = CryptoJS.AES.encrypt(
                  bio,
                  CryptoJS.enc.Hex.parse(secretKey),
                  {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7,
                  }
                );
                const encryptedHex13 = encryptedMessage13.ciphertext.toString(
                  CryptoJS.enc.Hex
                );

                handleModal();
                await contract.call("updateInfo", [
                  encryptedHex,
                  encryptedHex2,
                  encryptedHex4,
                  encryptedHex5,
                  encryptedHex6,
                  encryptedHex7,
                  encryptedHex8,
                  encryptedHex9,
                  encryptedHex10,
                  encryptedHex11,
                  encryptedHex12,
                  encryptedHex13,
                ]);
              }}
              onSuccess={(result) => {
                setIsProcessing(false);
                setTimeout(() => {
                  //Cierra el modal
                  setIsModalOpen(false);
                }, 2000);
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const wallet = urlParams.get("wallet");
                const idAccount = urlParams.get("idAccount");
                router.push(`/profile`);
              }}
              onError={(error) => {
                setIsProcessing(false);
                setIsDeclined(true);
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 6000);
              }}
              className="buttonPrimary"
            >
              {t("Save changes")}
            </Web3Button>
          </div>
        </div>

    </div>
  );
};

export default EditProfile;
