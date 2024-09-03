"use client";
import Image from "next/image";
import fotoImg from "@/assets/imgs/photoProfile.png";
import { useEffect, useRef, useState } from "react";
import CamaraFoto from "@/assets/imgs/camera-reverse.png";
import convertBase64 from "@/utils/convertBase64";
import WomanSvg from "@/assets/icons/woman.svg";
import ManSvg from "@/assets/icons/man.svg";
import { useTranslations } from "next-intl";
import CryptoJS from "crypto-js";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Polygon } from "@thirdweb-dev/chains";
import poiAbi from "./abis/poiAbi.json";
import axios from "axios";
import { Web3Button,useSigner } from "@thirdweb-dev/react";
import abiPoi from '@/abis/abiPoi.json'

export interface ProfilePicProps {
  src?: string;
}

export default function ProfilePic({ src }: ProfilePicProps) {
  const t = useTranslations();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [genderPhoto, setGenderPhoto] = useState(null);
  const wallet = localStorage.getItem("wallet");
  console.log(wallet);
  const signer = useSigner() 
  const [decryptedImg, setDecryptedImg] = useState<string | null>(null);
  const handleFolderSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageInsert = event.target.files![0];

    if (imageInsert) {
      await uploadImageToImgbb(imageInsert);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImageToImgbb = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: "dc450c17f634648783ed52467ae463d3", // Reemplaza con tu API key de imgbb
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = response.data.data.url;
      const sdk = ThirdwebSDK.fromSigner(signer, Polygon);
      const contractPoi = await sdk.getContract( process.env.POI_CONTRACT,abiPoi);
      await imageUrl
      await contractPoi.call("updateImageLink", [imageUrl]);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const getInfo = async () => {
    const sdk = new ThirdwebSDK(Polygon);
    const contractPoi = await sdk.getContract( process.env.POI_CONTRACT,abiPoi);
    const personalDataMap = await contractPoi.call("personalDataMap", [wallet]);
    const secretKey = process.env.SECRET_KEY;

    const decryptData = (encryptedHex) => {
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
    const decryptedGender = decryptData(personalDataMap.encryptedGender);
    const decryptedImg = personalDataMap.imageLink;
    setGenderPhoto(decryptedGender);
    setDecryptedImg(decryptedImg);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const imgGender = () => {
    if (genderPhoto === t("Female")) {
      return WomanSvg;
    } else {
      return ManSvg;
    }
  };

  return (
    <div className="container-img relative border border-1 border-[#39307b] mb-4">
      <Image
       src={decryptedImg ? decryptedImg : imgGender()}
        className="photoUser object-cover rounded-[50%] h-[160px]"
        alt=""
        width={160}
        height={160}
      />
      <div className="camara-container bg-[#7A2FF4] p-2 rounded-[20px] w-[32px] absolute right-0 bottom-4">
        <Image
          className="camara cursor-pointer"
          src={CamaraFoto}
          alt=""
          onClick={handleImageClick}
          width={18}
          height={18}
        />
      </div>
      <input
        id="folder-select"
        type="file"
        onChange={handleFolderSelect}
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/webp"
      />
    </div>
  );
}
