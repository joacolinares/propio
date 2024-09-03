"use client";
import React, { useState } from "react";
import Image from "next/image";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import AccountPaymentNFT from "./components/AccountPaymentNFT";
import RegistrationPayNFT from "./components/RegistrationPayNFT";

// Importando todas las imágenes de NFT
import NFTImag1 from "@/assets/imgs/nfts/arte/1-100/1.png";
import NFTImag2 from "@/assets/imgs/nfts/arte/1-100/2.png";
import NFTImag3 from "@/assets/imgs/nfts/arte/1-100/3.png";
import NFTImag4 from "@/assets/imgs/nfts/arte/1-100/4.png";
import NFTImag5 from "@/assets/imgs/nfts/arte/1-100/5.png";
import NFTImag6 from "@/assets/imgs/nfts/arte/1-100/6.png";
import NFTImag7 from "@/assets/imgs/nfts/arte/1-100/7.png";
import NFTImag8 from "@/assets/imgs/nfts/arte/1-100/8.png";
import NFTImag9 from "@/assets/imgs/nfts/arte/1-100/9.png";
import NFTImag10 from "@/assets/imgs/nfts/arte/1-100/10.png";
import NFTImag11 from "@/assets/imgs/nfts/arte/1-100/11.png";
import NFTImag12 from "@/assets/imgs/nfts/arte/1-100/12.png";
import NFTImag13 from "@/assets/imgs/nfts/arte/1-100/13.png";
import NFTImag14 from "@/assets/imgs/nfts/arte/1-100/14.png";
import NFTImag15 from "@/assets/imgs/nfts/arte/1-100/15.png";
import NFTImag16 from "@/assets/imgs/nfts/arte/1-100/16.png";
import NFTImag17 from "@/assets/imgs/nfts/arte/1-100/17.png";
import NFTImag18 from "@/assets/imgs/nfts/arte/1-100/18.png";
import NFTImag19 from "@/assets/imgs/nfts/arte/1-100/19.png";
import NFTImag20 from "@/assets/imgs/nfts/arte/1-100/20.png";
import NFTImag21 from "@/assets/imgs/nfts/arte/1-100/21.png";
import NFTImag22 from "@/assets/imgs/nfts/arte/1-100/22.png";
import NFTImag23 from "@/assets/imgs/nfts/arte/1-100/23.png";
import NFTImag24 from "@/assets/imgs/nfts/arte/1-100/24.png";
import NFTImag25 from "@/assets/imgs/nfts/arte/1-100/25.png";
import NFTImag26 from "@/assets/imgs/nfts/arte/1-100/26.png";
import NFTImag27 from "@/assets/imgs/nfts/arte/1-100/27.png";
import NFTImag28 from "@/assets/imgs/nfts/arte/1-100/28.png";
import NFTImag29 from "@/assets/imgs/nfts/arte/1-100/29.png";
import NFTImag30 from "@/assets/imgs/nfts/arte/1-100/30.png";
import NFTImag31 from "@/assets/imgs/nfts/arte/1-100/31.png";
import NFTImag32 from "@/assets/imgs/nfts/arte/1-100/32.png";
import NFTImag33 from "@/assets/imgs/nfts/arte/1-100/33.png";
import NFTImag34 from "@/assets/imgs/nfts/arte/1-100/34.png";
import NFTImag35 from "@/assets/imgs/nfts/arte/1-100/35.png";
import NFTImag36 from "@/assets/imgs/nfts/arte/1-100/36.png";
import NFTImag37 from "@/assets/imgs/nfts/arte/1-100/37.png";
import NFTImag38 from "@/assets/imgs/nfts/arte/1-100/38.png";
import NFTImag39 from "@/assets/imgs/nfts/arte/1-100/39.png";
import NFTImag40 from "@/assets/imgs/nfts/arte/1-100/40.png";
import NFTImag41 from "@/assets/imgs/nfts/arte/1-100/41.png";
import NFTImag42 from "@/assets/imgs/nfts/arte/1-100/42.png";
import NFTImag43 from "@/assets/imgs/nfts/arte/1-100/43.png";
import NFTImag44 from "@/assets/imgs/nfts/arte/1-100/44.png";
import NFTImag45 from "@/assets/imgs/nfts/arte/1-100/45.png";
import NFTImag46 from "@/assets/imgs/nfts/arte/1-100/46.png";
import NFTImag47 from "@/assets/imgs/nfts/arte/1-100/47.png";
import NFTImag48 from "@/assets/imgs/nfts/arte/1-100/48.png";
import NFTImag49 from "@/assets/imgs/nfts/arte/1-100/49.png";
import NFTImag50 from "@/assets/imgs/nfts/arte/1-100/50.png";
import NFTImag51 from "@/assets/imgs/nfts/arte/1-100/51.png";
import NFTImag52 from "@/assets/imgs/nfts/arte/1-100/52.png";
import NFTImag53 from "@/assets/imgs/nfts/arte/1-100/53.png";
import NFTImag54 from "@/assets/imgs/nfts/arte/1-100/54.png";
import NFTImag55 from "@/assets/imgs/nfts/arte/1-100/55.png";
import NFTImag56 from "@/assets/imgs/nfts/arte/1-100/56.png";
import NFTImag57 from "@/assets/imgs/nfts/arte/1-100/57.png";
import NFTImag58 from "@/assets/imgs/nfts/arte/1-100/58.png";
import NFTImag59 from "@/assets/imgs/nfts/arte/1-100/59.png";
import NFTImag60 from "@/assets/imgs/nfts/arte/1-100/60.png";
import NFTImag61 from "@/assets/imgs/nfts/arte/1-100/61.png";
import NFTImag62 from "@/assets/imgs/nfts/arte/1-100/62.png";
import NFTImag63 from "@/assets/imgs/nfts/arte/1-100/63.png";
import NFTImag64 from "@/assets/imgs/nfts/arte/1-100/64.png";
import NFTImag65 from "@/assets/imgs/nfts/arte/1-100/65.png";
import NFTImag66 from "@/assets/imgs/nfts/arte/1-100/66.png";
import NFTImag67 from "@/assets/imgs/nfts/arte/1-100/67.png";
import NFTImag68 from "@/assets/imgs/nfts/arte/1-100/68.png";
import NFTImag69 from "@/assets/imgs/nfts/arte/1-100/69.png";
import NFTImag70 from "@/assets/imgs/nfts/arte/1-100/70.png";
import NFTImag71 from "@/assets/imgs/nfts/arte/1-100/71.png";
import NFTImag72 from "@/assets/imgs/nfts/arte/1-100/72.png";
import NFTImag73 from "@/assets/imgs/nfts/arte/1-100/73.png";
import NFTImag74 from "@/assets/imgs/nfts/arte/1-100/74.png";
import NFTImag75 from "@/assets/imgs/nfts/arte/1-100/75.png";
import NFTImag76 from "@/assets/imgs/nfts/arte/1-100/76.png";
import NFTImag77 from "@/assets/imgs/nfts/arte/1-100/77.png";
import NFTImag78 from "@/assets/imgs/nfts/arte/1-100/78.png";
import NFTImag79 from "@/assets/imgs/nfts/arte/1-100/79.png";
import NFTImag80 from "@/assets/imgs/nfts/arte/1-100/80.png";
import NFTImag81 from "@/assets/imgs/nfts/arte/1-100/81.png";
import NFTImag82 from "@/assets/imgs/nfts/arte/1-100/82.png";
import NFTImag83 from "@/assets/imgs/nfts/arte/1-100/83.png";
import NFTImag84 from "@/assets/imgs/nfts/arte/1-100/84.png";
import NFTImag85 from "@/assets/imgs/nfts/arte/1-100/85.png";
import NFTImag86 from "@/assets/imgs/nfts/arte/1-100/86.png";
import NFTImag87 from "@/assets/imgs/nfts/arte/1-100/87.png";
import NFTImag88 from "@/assets/imgs/nfts/arte/1-100/88.png";
import NFTImag89 from "@/assets/imgs/nfts/arte/1-100/89.png";
import NFTImag90 from "@/assets/imgs/nfts/arte/1-100/90.png";
import NFTImag91 from "@/assets/imgs/nfts/arte/1-100/91.png";
import NFTImag92 from "@/assets/imgs/nfts/arte/1-100/92.png";
import NFTImag93 from "@/assets/imgs/nfts/arte/1-100/93.png";
import NFTImag94 from "@/assets/imgs/nfts/arte/1-100/94.png";
import NFTImag95 from "@/assets/imgs/nfts/arte/1-100/95.png";
import NFTImag96 from "@/assets/imgs/nfts/arte/1-100/96.png";
import NFTImag97 from "@/assets/imgs/nfts/arte/1-100/97.png";
import NFTImag98 from "@/assets/imgs/nfts/arte/1-100/98.png";
import NFTImag99 from "@/assets/imgs/nfts/arte/1-100/99.png";
import NFTImag100 from "@/assets/imgs/nfts/arte/1-100/100.png";

export interface ListNftBuy {
  id: number;
  name: string;
  price: number;
  img: any;
}

const PurchaseNFT = () => {
  const t = useTranslations();
  const router = useRouter();
  const [stepNft, setStepNft] = useState<number>(1);
  const [selectedNFT, setSelectedNFT] = useState();

  const listNftBuy: ListNftBuy[] = [
    { id: 1, name: "NFT 1", price: 30, img: NFTImag1 },
    { id: 2, name: "NFT 2", price: 30, img: NFTImag2 },
    { id: 3, name: "NFT 3", price: 30, img: NFTImag3 },
    { id: 4, name: "NFT 4", price: 30, img: NFTImag4 },
    { id: 5, name: "NFT 5", price: 30, img: NFTImag5 },
    { id: 6, name: "NFT 6", price: 30, img: NFTImag6 },
    { id: 7, name: "NFT 7", price: 30, img: NFTImag7 },
    { id: 8, name: "NFT 8", price: 30, img: NFTImag8 },
    { id: 9, name: "NFT 9", price: 30, img: NFTImag9 },
    { id: 10, name: "NFT 10", price: 30, img: NFTImag10 },
    { id: 11, name: "NFT 11", price: 30, img: NFTImag11 },
    { id: 12, name: "NFT 12", price: 30, img: NFTImag12 },
    { id: 13, name: "NFT 13", price: 30, img: NFTImag13 },
    { id: 14, name: "NFT 14", price: 30, img: NFTImag14 },
    { id: 15, name: "NFT 15", price: 30, img: NFTImag15 },
    { id: 16, name: "NFT 16", price: 30, img: NFTImag16 },
    { id: 17, name: "NFT 17", price: 30, img: NFTImag17 },
    { id: 18, name: "NFT 18", price: 30, img: NFTImag18 },
    { id: 19, name: "NFT 19", price: 30, img: NFTImag19 },
    { id: 20, name: "NFT 20", price: 30, img: NFTImag20 },
    { id: 21, name: "NFT 21", price: 30, img: NFTImag21 },
    { id: 22, name: "NFT 22", price: 30, img: NFTImag22 },
    { id: 23, name: "NFT 23", price: 30, img: NFTImag23 },
    { id: 24, name: "NFT 24", price: 30, img: NFTImag24 },
    { id: 25, name: "NFT 25", price: 30, img: NFTImag25 },
    { id: 26, name: "NFT 26", price: 30, img: NFTImag26 },
    { id: 27, name: "NFT 27", price: 30, img: NFTImag27 },
    { id: 28, name: "NFT 28", price: 30, img: NFTImag28 },
    { id: 29, name: "NFT 29", price: 30, img: NFTImag29 },
    { id: 30, name: "NFT 30", price: 30, img: NFTImag30 },
    { id: 31, name: "NFT 31", price: 30, img: NFTImag31 },
    { id: 32, name: "NFT 32", price: 30, img: NFTImag32 },
    { id: 33, name: "NFT 33", price: 30, img: NFTImag33 },
    { id: 34, name: "NFT 34", price: 30, img: NFTImag34 },
    { id: 35, name: "NFT 35", price: 30, img: NFTImag35 },
    { id: 36, name: "NFT 36", price: 30, img: NFTImag36 },
    { id: 37, name: "NFT 37", price: 30, img: NFTImag37 },
    { id: 38, name: "NFT 38", price: 30, img: NFTImag38 },
    { id: 39, name: "NFT 39", price: 30, img: NFTImag39 },
    { id: 40, name: "NFT 40", price: 30, img: NFTImag40 },
    { id: 41, name: "NFT 41", price: 30, img: NFTImag41 },
    { id: 42, name: "NFT 42", price: 30, img: NFTImag42 },
    { id: 43, name: "NFT 43", price: 30, img: NFTImag43 },
    { id: 44, name: "NFT 44", price: 30, img: NFTImag44 },
    { id: 45, name: "NFT 45", price: 30, img: NFTImag45 },
    { id: 46, name: "NFT 46", price: 30, img: NFTImag46 },
    { id: 47, name: "NFT 47", price: 30, img: NFTImag47 },
    { id: 48, name: "NFT 48", price: 30, img: NFTImag48 },
    { id: 49, name: "NFT 49", price: 30, img: NFTImag49 },
    { id: 50, name: "NFT 50", price: 30, img: NFTImag50 },
    { id: 51, name: "NFT 51", price: 30, img: NFTImag51 },
    { id: 52, name: "NFT 52", price: 30, img: NFTImag52 },
    { id: 53, name: "NFT 53", price: 30, img: NFTImag53 },
    { id: 54, name: "NFT 54", price: 30, img: NFTImag54 },
    { id: 55, name: "NFT 55", price: 30, img: NFTImag55 },
    { id: 56, name: "NFT 56", price: 30, img: NFTImag56 },
    { id: 57, name: "NFT 57", price: 30, img: NFTImag57 },
    { id: 58, name: "NFT 58", price: 30, img: NFTImag58 },
    { id: 59, name: "NFT 59", price: 30, img: NFTImag59 },
    { id: 60, name: "NFT 60", price: 30, img: NFTImag60 },
    { id: 61, name: "NFT 61", price: 30, img: NFTImag61 },
    { id: 62, name: "NFT 62", price: 30, img: NFTImag62 },
    { id: 63, name: "NFT 63", price: 30, img: NFTImag63 },
    { id: 64, name: "NFT 64", price: 30, img: NFTImag64 },
    { id: 65, name: "NFT 65", price: 30, img: NFTImag65 },
    { id: 66, name: "NFT 66", price: 30, img: NFTImag66 },
    { id: 67, name: "NFT 67", price: 30, img: NFTImag67 },
    { id: 68, name: "NFT 68", price: 30, img: NFTImag68 },
    { id: 69, name: "NFT 69", price: 30, img: NFTImag69 },
    { id: 70, name: "NFT 70", price: 30, img: NFTImag70 },
    { id: 71, name: "NFT 71", price: 30, img: NFTImag71 },
    { id: 72, name: "NFT 72", price: 30, img: NFTImag72 },
    { id: 73, name: "NFT 73", price: 30, img: NFTImag73 },
    { id: 74, name: "NFT 74", price: 30, img: NFTImag74 },
    { id: 75, name: "NFT 75", price: 30, img: NFTImag75 },
    { id: 76, name: "NFT 76", price: 30, img: NFTImag76 },
    { id: 77, name: "NFT 77", price: 30, img: NFTImag77 },
    { id: 78, name: "NFT 78", price: 30, img: NFTImag78 },
    { id: 79, name: "NFT 79", price: 30, img: NFTImag79 },
    { id: 80, name: "NFT 80", price: 30, img: NFTImag80 },
    { id: 81, name: "NFT 81", price: 30, img: NFTImag81 },
    { id: 82, name: "NFT 82", price: 30, img: NFTImag82 },
    { id: 83, name: "NFT 83", price: 30, img: NFTImag83 },
    { id: 84, name: "NFT 84", price: 30, img: NFTImag84 },
    { id: 85, name: "NFT 85", price: 30, img: NFTImag85 },
    { id: 86, name: "NFT 86", price: 30, img: NFTImag86 },
    { id: 87, name: "NFT 87", price: 30, img: NFTImag87 },
    { id: 88, name: "NFT 88", price: 30, img: NFTImag88 },
    { id: 89, name: "NFT 89", price: 30, img: NFTImag89 },
    { id: 90, name: "NFT 90", price: 30, img: NFTImag90 },
    { id: 91, name: "NFT 91", price: 30, img: NFTImag91 },
    { id: 92, name: "NFT 92", price: 30, img: NFTImag92 },
    { id: 93, name: "NFT 93", price: 30, img: NFTImag93 },
    { id: 94, name: "NFT 94", price: 30, img: NFTImag94 },
    { id: 95, name: "NFT 95", price: 30, img: NFTImag95 },
    { id: 96, name: "NFT 96", price: 30, img: NFTImag96 },
    { id: 97, name: "NFT 97", price: 30, img: NFTImag97 },
    { id: 98, name: "NFT 98", price: 30, img: NFTImag98 },
    { id: 99, name: "NFT 99", price: 30, img: NFTImag99 },
    { id: 100, name: "NFT 100", price: 30, img: NFTImag100 },
  ];

  return (
    <div className="px-[24px] pt-[24px] pb-[32px] bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen text-white">
      <div className="container-header mb-8">
        <div className="container-logo flex">
          <Image src={LogoPeq} alt="logo" width={28} height={24} />
          <div className="w-4/5">
            <div className="text-center text-[12px] text-[#ffffffb3] mx-auto">
              <p>{t("Step 2/4 (Required)")} </p>
              <p className=" font-bold mt-1">{t("ACCOUNT (NFT) PURCHASE")}</p>
            </div>
          </div>
        </div>
        <div className="container-bars-progresss grid grid-cols-4 gap-2 mt-[20px]">
          <div className="div-bar h-4">
            <div
              onClick={() => router.push("/register")}
              className={`div-progress h-4 rounded-[20px] bg-[#11BDA0] text-[12px] font-bold cursor-pointer flex items-center justify-center`}
            >
              {`${t("STEP")} 1`}
            </div>
          </div>
          <div className="div-bar bar2">
            <div
              className={`div-progress h-4 rounded-[20px] bg-[#7A2FF4] text-[12px] font-bold text-white cursor-pointer flex items-center justify-center`}
            >{`${t("STEP")} 2`}</div>
          </div>
          <div className="div-bar bar3">
            <div
              className={`div-progress h-4 rounded-[20px] bg-[#F2F3F8] text-[12px] font-bold text-[#A9AEB4] cursor-pointer flex items-center justify-center`}
            >{`${t("STEP")} 3`}</div>
          </div>
          <div className="div-bar bar4">
            <div
              className={`div-progress h-4 rounded-[20px] bg-[#F2F3F8] text-[12px] font-bold text-[#A9AEB4] cursor-pointer flex items-center justify-center`}
            >{`${t("STEP")} 4`}</div>
          </div>
        </div>
      </div>

      {stepNft === 1 ? (
        <AccountPaymentNFT setStepNft={setStepNft} listNftBuy={listNftBuy} selectedNFT={selectedNFT} setSelectedNFT={setSelectedNFT} />
      ) : (
        <RegistrationPayNFT />
      )}
    </div>
  );
};

export default PurchaseNFT;
