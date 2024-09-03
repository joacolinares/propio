"use client";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import CirclePurple from "@/assets/icons/circle-purple-modal.svg";
import { useEffect, useState } from "react";
import Image from "next/image";


import { usePathname, useRouter } from "next/navigation";
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
import abiToken from "@/abis/abiToken.json";
import abiAccount from "@/abis/abiAccount.json";
import abiMembers from "@/abis/abiMembers.json";
import abiPoi from "@/abis/abiPoi.json";
import { ethers } from "ethers";
import "./buttonStyle.css";
type Props = {
  title?: string;
  description?: string;
  payAmount?: number;
  linkBtnCard?: string;
  titleHeader?: string;
  textHeader?: string;
  textBtn?: string;
};
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";

const ActivateYourAccount = ({ title, description, linkBtnCard, titleHeader, textHeader, payAmount, textBtn }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [aprobo, setAprobo] = useState(false);
  const [compraMembresia, setCompraMembresia] = useState(false);
  const [precioMembresia, setPrecioMembresia] = useState<number | string>(0);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const wallet = urlParams.get("wallet");
  const idAccount = urlParams.get("idAccount");
  const memberValue = urlParams.get("memberValue");

  const buttonPayWithWallet = () => {
    setIsModalOpen(true);
    setIsProcessing(true);
  };

  const buttonCreateYourAccount = () => {

  

    setIsModalOpen(true);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);

    setTimeout(() => {
      setIsModalOpen(false);
      const urlParams = new URLSearchParams(window.location.search);
      const referral = urlParams.get("referral");
      console.log(referral)
      router.push(`${linkBtnCard ? linkBtnCard : `/membership?referral=${referral}`}`);
    }, 9000);
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const queryStringIndex = currentUrl.indexOf("?");

    if (queryStringIndex !== -1) {
      const queryString = currentUrl.slice(queryStringIndex + 1);
      const params = new URLSearchParams(queryString);

      const idMember = params.get("idMember");
      const memberValue = params.get("memberValue");

      if (idMember) {
        //Si viene con idMember significa que esta comprando membresia desde una cuenta ya existente, si no tiene significa qu ese esta pagando POI
        console.log("Found idMember:", idMember);
        setPrecioMembresia(memberValue);
        setCompraMembresia(true);
      } else {
        console.log("idMember not found");
      }
    } else {
      console.log("Query string not found");
    }
  }, []);



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

      <div className="layout-connect">
        <div className="container-up">
          <div className="container-logo flex">
            <Image src={LogoPeq} alt="logo" width={28} height={24} />
            <div className="w-4/5">
              <div className="text-center text-[12px] text-[#ffffffb3] mx-auto">
                <p>{titleHeader ? titleHeader : t("Step 2/4 (Required)")}</p>
                <p className=" font-bold mt-1">{textHeader ? textHeader : t("ACCOUNT (NFT) PURCHASE")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6">
          <div className="container-infoWallets">
            <h1 className="text-[24px] font-bold mb-4">{title ? title : t("Account Registration Payment (NFT)")}</h1>
            <div className="text-[14px] leading-5">
              {description ? (
                description
              ) : (
                <>
                  <span>{t("This is a one-time payment Earn up to 50% from all direct referrals registrations")} </span>
                </>
              )}
            </div>

            <div className="container-wallets">
              <div className="flex justify-center items-center shadow-sm shadow-[#00000014] rounded-[16px] border-solid border-[1px] border-[#AD98FF] text-[14px] w-[162px] mx-auto p-[24px] bg-[#ffffff1a]">
                <div className="flex justify-center items-center space-x-2">
                  <div className="text-[14px]">{t("Total")}</div>
                  <div className="text-[24px]">
                    {compraMembresia ? <> ${parseInt(precioMembresia.toString())} </> : <>$ {payAmount ? payAmount : 30}</>}{" "}
                    {/*Si esta comprando membresia pone el precio si no esta compando le pone 30$*/}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div>
                {/* {compraMembresia ? (
                  <>
                    {aprobo ? (
                      <>
                        <Web3Button
                          contractAddress={process.env.MEMBERS_CONTRACT}
                          contractAbi={abiMembers}
                          action={async (contract: any) => {
                            const currentUrl = window.location.href;
                            const queryStringIndex = currentUrl.indexOf("?");

                            if (queryStringIndex !== -1) {
                              const queryString = currentUrl.slice(queryStringIndex + 1);
                              const params = new URLSearchParams(queryString);
                              const refferalWallet = params.get("refferalWallet");
                              const idMember = params.get("idMember");
                              const idAccount = params.get("idAccount");

                              if (idMember) {
                                //Si quiero comprar membrsia (Viene de selectMembership) entra
                                if (idAccount == undefined) {
                                  //Si es la primera vez entra aca, ya que esta obteniendo idAccount desde los parametros y esta desde el back, si es undefined significa que lo tiene guardado en back end y no en parametros
                                  const sdk = new ThirdwebSDK(137);
                                  const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
                                  const tokenIds = await contractAccount.call("tokenIds", []); //Obtiene el id de NFT proximo a mintear
                                  buttonPayWithWallet();
                                  console.log(refferalWallet);
                                  await contract.call("buyMembership", [idMember, parseInt(tokenIds._hex, 16), refferalWallet, wallet, ""]);
                                  localStorage.setItem("idAccount", parseInt(tokenIds._hex, 16).toString()); //Setea el nuevo idAccount en el back end de la persona
                                  setCompraMembresia(true);
                                } else {
                                  //Si quiere comprar membresia pero ya tiene idAccount
                                  const sdk = new ThirdwebSDK(137);
                                  buttonPayWithWallet();
                                  await contract.call("buyMembership", [idMember, idAccount, refferalWallet, wallet, ""]);
                                  setCompraMembresia(true);
                                }
                              } else {
                                console.log("ERROR idMember not found");
                              }
                            } else {
                              console.log("ERROR Query string not found");
                            }
                          }}
                          onSuccess={() => {
                            setIsProcessing(false);
                            setTimeout(() => {
                              setIsModalOpen(false);
                            }, 2000);

                            if (idAccount == undefined) {
                              router.push(`/dashboard`);
                            } else {
                              router.push(`/members?idAccount=${idAccount}&wallet=${wallet}`);
                            }
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
                          {t("Pay with your wallet")}
                        </Web3Button>
                      </>
                    ) : (
                      <>
                        <Web3Button
                          contractAddress={process.env.TOKEN_CONTRACT}
                          contractAbi={abiToken}
                          action={async (contract: any) => {
                            buttonPayWithWallet();
                            const valueInWei = ethers.utils.parseUnits(memberValue, "ether"); //Convierte el valor de la membresia en wei
                            await contract.call("approve", [process.env.MEMBERS_CONTRACT, valueInWei]);
                          }}
                          onSuccess={() => {
                            setIsProcessing(false);
                            setTimeout(() => {
                              setIsModalOpen(false);
                            }, 2000);
                            setAprobo(true);
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
                          {t("Approve expenses")}
                        </Web3Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {aprobo ? (
                      <>
                        <Web3Button
                          contractAddress={process.env.POI_CONTRACT}
                          contractAbi={abiPoi}
                          action={async (contract: any) => {
                            const storedData = localStorage.getItem("step1");
                            const parsedData = storedData ? JSON.parse(storedData) : {}; //Trae la informacion del paso 1

                            const storedData2 = localStorage.getItem("step2");
                            const parsedData2 = storedData2 ? JSON.parse(storedData2) : {}; //Trae la informacion del paso 1

                            const storedData3 = localStorage.getItem("step3");
                            const parsedData3 = storedData3 ? JSON.parse(storedData3) : {}; //Trae la informacion del paso 1

                            const currentUrl = window.location.href;
                            const queryStringIndex = currentUrl.indexOf("?");
                            if (queryStringIndex !== -1) {
                              const queryString = currentUrl.slice(queryStringIndex + 1);
                              const params = new URLSearchParams(queryString);
                              const referralWallet = params.get("refferalWallet");
                              console.log(referralWallet);
                              buttonPayWithWallet();
                              await contract.call("storeInfo", [
                                // Guarda la info del usuario en el contrato
                                parsedData.encryptedHex,
                                parsedData.encryptedHex2,
                                parsedData.encryptedHex3,
                                parsedData2.encryptedHex,
                                parsedData2.encryptedHex2,
                                parsedData3.encryptedHex,
                                parsedData3.encryptedHex2,
                                referralWallet,
                              ]);
                            }
                          }}
                          onSuccess={() => {
                            setIsProcessing(false);
                            setTimeout(() => {
                              setIsModalOpen(false);
                            }, 2000);

                            const currentUrl = window.location.href;
                            const queryStringIndex = currentUrl.indexOf("?");
                            if (queryStringIndex !== -1) {
                              const queryString = currentUrl.slice(queryStringIndex + 1);
                              const params = new URLSearchParams(queryString);
                              const referralWallet = params.get("refferalWallet");
                              if (referralWallet) {
                                router.push(
                                  `/membership?refferalWallet=${referralWallet}` //Cuando termina de pagar POI lo manda a comprar la membresia para activar la cuenta
                                );
                              } else {
                                router.push(`/membership?refferalWallet=0`);
                              }
                            } else {
                              router.push(`/membership?refferal=0`);
                            }
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
                          {t("Pay with your wallet")}
                        </Web3Button>
                      </>
                    ) : (
                      <>
                        <Web3Button
                          contractAddress={process.env.TOKEN_CONTRACT}
                          contractAbi={abiToken}
                          action={async (contract: any) => {
                            buttonPayWithWallet();
                            const valueInWei = ethers.utils.parseUnits("30", "ether");
                            await contract.call("approve", [process.env.POI_CONTRACT, valueInWei]);
                          }}
                          onSuccess={(result) => {
                            setIsProcessing(false);
                            setTimeout(() => {
                              setIsModalOpen(false);
                            }, 2000);
                            setAprobo(true);
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
                          {t("Approve expenses")}
                        </Web3Button>
                      </>
                    )}
                  </>
                )} */}

                <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
                  {isProcessing ? (
                    <div className="w-full h-full flex flex-col items-center justify-center px-1">
                      <div>
                        <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                      </div>
                      <div className="mt-8">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Approving Amount")}</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Paying Registration")}</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                          <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Registration")}</span>
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
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Amount")}</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Paying Registration")}</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                          <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Successful Registration")}</span>
                        </div>
                      </div>
                      <p className="mt-8 text-[18px] text-[#20DABB] text-center">{t("DONE")}!</p>
                    </div>
                  )}
                </ModalComponent>
              </div>

              {pathname === "/membership/payMembership" ? <ButtonPrimary text={t("Pay with your wallet")} onClickFn={() => {}} /> : null}

              <ButtonPrimary text={textBtn ? textBtn : t("Create your account")} onClickFn={buttonCreateYourAccount} />
            </div>
          </div>
        </div>
        <div className="container-down"></div>
      </div>

  );
};

export default ActivateYourAccount;
