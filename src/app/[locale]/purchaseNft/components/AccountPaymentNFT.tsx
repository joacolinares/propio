"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ListNftBuy } from "@/app/[locale]/purchaseNft/PurchaseNFT";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Image from "next/image";
import Pagination from "@/app/components/generals/pagination/Pagination";
import { useUserRegisterStore } from "@/store/user-register";
import abiAccount from "@/abis/abiAccount.json";
import { ThirdwebSDK } from "@thirdweb-dev/react";




interface Props {
  setStepNft: (value: number) => void;
  listNftBuy: ListNftBuy[];
  selectedNFT: ListNftBuy;
  setSelectedNFT: (value: any) => void;
}

const AccountPaymentNFT = ({ setStepNft, listNftBuy, selectedNFT, setSelectedNFT }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { updateUser, ...user } = useUserRegisterStore();
  const [nameYourNFT, setNameYourNFT] = useState<string>("");
  const [error, setError] = useState(false);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [filteredNftBuy, setFilteredNftBuy] = useState<ListNftBuy[]>([]);


  useEffect(() => {
    // Rellena el nombre del NFT si existe en localStorage
    const savedNftName = localStorage.getItem("nftInfo");
    if (savedNftName) {
      setNameYourNFT(savedNftName);
    }

    // Selecciona el NFT si existe en localStorage
    const savedNftId = localStorage.getItem("nftSelected");
    if (savedNftId) {
      const savedNft = listNftBuy.find(nft => nft.id === parseInt(savedNftId));
      if (savedNft) {
        setSelectedNFT(savedNftId);
        selectItemBuy(savedNft);  // Llamada a selectItemBuy para actualizar el estado
      }
    }
  }, []);


  const selectImg = (id: number) => {
    localStorage.setItem(
      "nftSelected",
      id.toString() // Guarda email, nombre y usuario
    );
  };

  const buttonSelect = async() => {
   
    const sdk = new ThirdwebSDK(137);
    const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
    const accountNames = await contractAccount.call("accountNames", [nameYourNFT]);
    console.log(accountNames)
    if(accountNames){
      console.log("Name already used")
      setError(true)
    }else{
      setStepNft(2);
      localStorage.setItem(
        "nftInfo",
        nameYourNFT // Guarda email, nombre y usuario
      );
      const idAccount = localStorage.getItem("idAccount");
  
      if (idAccount !== null) {
        localStorage.setItem("nuevaCuenta", "true");
      } else {
        console.log("Primera vez entrando");
      }
  
      if (pathname === "/myAccounts/createNewAccount") {
        const urlParams = new URLSearchParams(window.location.search);
        const referral = urlParams.get("referral");
        router.push(`/myAccounts/createNewAccount/paymentNFT?referral=${referral}`);
      }
    }
    /*
    
    */
  };

  const selectItemBuy = (item: ListNftBuy) => {
    setSelectedNFT(item);
    updateUser({
      ...user,
      imgAccount: item.img,
      nameAccount: nameYourNFT,
    });
  };

  const numberByPage = 9;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: filteredNftBuy,
    numberByPage: numberByPage,
  });

  const nftImages = async () => {
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
    const getSelectedImages = await contract.call("getSelectedImages", []);
    const selectedImagesArray = getSelectedImages.map((bn: any) => parseInt(bn._hex, 16));
    setSelectedImages(selectedImagesArray);

    // Filtra los NFTs después de obtener las imágenes seleccionadas
    const filteredList = listNftBuy.filter(item => !selectedImagesArray.includes(item.id));
    setFilteredNftBuy(filteredList);
  };

  useEffect(() => {
    nftImages();
  }, []);

  return (
    <div>
      <div className={`mb-4 ${pathname === "purchaseNft" ? "mt-12" : ""} p-4 rounded-[10px] bg-gradient-to-b from-[#ffffff1a] to-[#ffffff00]`}>
        <h1 className="text-[24px] font-bold mb-4">{t("Name your NFT")}</h1>
        <input
        type="text"
        value={nameYourNFT}
        onChange={(e) => setNameYourNFT(e.target.value.replace(/\s+/g, '').toLowerCase())}
        placeholder="Account 2"
        className="rounded-[10px] p-4 bg-[#ffffff1a] w-full text-[#A9AEB4]"
      />
      </div>

      <div className="p-4 rounded-[10px] bg-gradient-to-b from-[#ffffff1a] to-[#ffffff00] grid grid-cols-3 justify-items-center gap-4">
        {elemetsVisibleByPage.length === 0 ? (
          <p className="text-white text-[18px] text-center col-span-3">{t("Loading")}...</p>
        ) : (
          <>
            {elemetsVisibleByPage.map((item, index) => (
              <div
                key={index}
                className={`rounded-lg flex flex-col items-center w-[88px] h-[107px] p-[2px] ${
                  selectedNFT?.id === item.id ? "bg-[#7A2FF4]" : "bg-[#ffffff1a]"
                }`}
                onClick={() => {
                  selectItemBuy(item);
                  selectImg(item.id);
                }}
              >
                <Image src={item.img} alt={item.name} width={84} height={84} />
                <p className="text-[12px] text-[#A9AEB4] mt-1">$ {item.price}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination
          currentPage={currentPage}
          goToNextPage={goToNextPage}
          goToPage={goToPage}
          goToPreviousPage={goToPreviousPage}
          totalPages={totalPages}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
     <center> {error && <p className="textErrorInput">Account name already used, please select another one and click next again.</p>}</center>
        <ButtonPrimary text={t("Select")} onClickFn={buttonSelect} disabled={!selectedNFT || !nameYourNFT} />
      </div>
    </div>
  );
};

export default AccountPaymentNFT;
