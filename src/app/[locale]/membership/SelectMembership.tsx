"use client";
import Image from "next/image";
import IconLogo from "@/assets/imgs/LogoTipoPeq.png";
import { useTranslations } from "next-intl";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { useEffect, useState, useCallback, useRef } from "react";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/app/components/generals/Navbar";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";

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
  ThirdwebSDK,
  useSigner,
  ThirdwebProvider,
  Web3Button,
  useChainId
} from '@thirdweb-dev/react'

import abi from "./abis/abi.json";
import { ethers } from "ethers";
import "./buttonStyle.css";
import abiToken from '@/abis/abiToken.json'
import abiAccount from "@/abis/abiAccount.json";
import abiMembers from "@/abis/abiMembers.json";
import abiPoi from "@/abis/abiPoi.json";
import { Polygon } from "@thirdweb-dev/chains";

interface Props {
  dataPlans: PlansMembership[];
}

interface PlansMembership {
  plan: string;
  price: string;
  minStake: string;
  maxStake: string;
  fee: any;
  expiration: number;
  performanceFee: number;
}

const SelectMembership = () => {
  const router = useRouter();
  const t = useTranslations();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [haveMembership, setHaveMembership] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProcessingOpen, setIsModalProcessingOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalProcessingOpen2, setIsModalProcessingOpen2] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [isDeclined2, setIsDeclined2] = useState(false);
  const [login, setLogin] = useState(false)
  const [aprobado, setAprobado] = useState(false);
  const pathname = usePathname();
  const [selectedPlanNumber, setSelectedPlanNumber] = useState(0);
  const [promoCode, setPromoCode] = useState<string>("");
  const approveExpensesButtonRef = useRef<HTMLButtonElement>(null);
  const [membresias, setMembresias] = useState<{
    data: PlansMembership[];
    status: boolean;
  }>({
    data: [],
    status: false,
  });
  const [actualCode, setActualCode] = useState<string | null>(null);
  const [memberValue, setMemberValue] = useState<string | null>()
  const [idMember, setIdMember] = useState<number | null>()
  const [aprobo, setAprobo] = useState(false);

  const handleSelectPlan = useCallback(
    (plan: string, index: number): void => {
      setSelectedPlanNumber(index);
      const findPlan = membresias.data.find((p) => p.plan === plan);
      if (findPlan) {
        console.log("Encontro");
        setSelectedPlan(findPlan);
      }
    },
    [membresias.data]
  );

  const wallet = localStorage.getItem('wallet');
  const idAccount = localStorage.getItem('idAccount');
  const urlParams = new URLSearchParams(window.location.search);
  const buyNewMember = urlParams.get("buyNewMember");
  console.log(buyNewMember)
  const signer = useSigner() 

  const confirmMembership = async () => {
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
    const memberships = await contract.call("memberships", [selectedPlanNumber]);

    localStorage.setItem(
      "membershipSelected",
      selectedPlanNumber.toString() //Guarda email, nombre y usuario
    );
    if(promoCode != ""){
      localStorage.setItem(
        "promoCode",
        promoCode //Guarda el codigo de promocion
      );
    }


    const memberValue = ethers.utils.formatUnits(memberships.membershipAmount, 6); //CAMBIO
    console.log(memberValue)
    const nuevaCuenta = localStorage.getItem('nuevaCuenta');
    if(nuevaCuenta == "true"){
      router.push(
        `/staking?referral=${idAccount}`
      );
    }else{
      if (idAccount == undefined) {
        const currentUrl = window.location.href;
        const queryStringIndex = currentUrl.indexOf("?");
        const queryString = currentUrl.slice(queryStringIndex + 1);
        const params = new URLSearchParams(queryString);
        const referral = params.get("referral");
        if (queryStringIndex !== -1) {
          if (referral) {
            if (pathname === "/membership") {
              router.push(
                `/staking?referral=${referral}&idMember=${selectedPlanNumber}&wallet=${wallet}&memberValue=${memberValue}`
              );
            } else {
              router.push(
                `/staking?referral=${referral}&idMember=${selectedPlanNumber}&wallet=${wallet}&memberValue=${memberValue}`
              );
            }
          } else {
            if (pathname === "/membership") {
              router.push(`/staking?referral=0&idMember=${selectedPlanNumber}&wallet=${wallet}&memberValue=${memberValue}`);
            } else {
              router.push(`/staking?referral=0&idMember=${selectedPlanNumber}&wallet=${wallet}&memberValue=${memberValue}`);
            }
          }
        } else {
          if (pathname === "/membership") {
            router.push(`/staking?referral=0&idMember=${selectedPlanNumber}&wallet=${wallet}&memberValue=${memberValue}`);
          } else {
            router.push(`/staking?referral=0&idMember=${selectedPlanNumber}&wallet=${wallet}&memberValue=${memberValue}`);
          }
        }
      } else {
        const sdk = new ThirdwebSDK(137);
        const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
        const leadershipSplitPartners = await contract.call("leadershipSplitPartners", [idAccount]);
        await leadershipSplitPartners;
        if (pathname === "/membership") {
          router.push(
            `/staking?idAccount=${idAccount}&referral=${parseInt(
              leadershipSplitPartners,
              16
            )}&idMember=${selectedPlanNumber}&memberValue=${memberValue}&wallet=${wallet}`
          );
        } else {
          router.push(
            `/staking?staking?idAccount=${idAccount}&referral=${parseInt(
              leadershipSplitPartners,
              16
            )}&idMember=${selectedPlanNumber}&memberValue=${memberValue}&wallet=${wallet}`
          );
        }
      }
    }
  };

  const checkPoi = async () => {
    if (wallet == null) {
      router.push(`/`);
    }
    if (wallet != null) {
      const sdk = new ThirdwebSDK(137);
      const contract = await sdk.getContract(process.env.POI_CONTRACT, abiPoi);
      const personalDataMap = await contract.call("personalDataMap", [wallet]);
      //if (personalDataMap.encryptedEmail == "") {
      //  router.push(`/register?referral=0&wallet=${wallet}`);
     // }
    }
  };


  useEffect(() => {
    const storedMembership = localStorage.getItem("membershipSelected");
    console.log(storedMembership)
    if (storedMembership && membresias.data.length > 0) {
      console.log
      const storedPlanIndex = parseInt(storedMembership);
      const storedPlan = membresias.data[storedPlanIndex];

      if (storedPlan) {
        setSelectedPlan(storedPlan);
        setSelectedPlanNumber(storedPlanIndex);
        setMemberValue(storedPlan.price);
      }
    }
  }, [membresias.data]);

  const llamadoMembresias = useCallback(async () => {
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
    const idAccount = localStorage.getItem('idAccount');
    const nuevaCuenta = localStorage.getItem('nuevaCuenta');
    console.log(idAccount)
    console.log(nuevaCuenta)
    if((idAccount != null || idAccount != undefined) && nuevaCuenta != "true")  {
    const haveMembership = await contract.call("haveMembership", [idAccount]);
    console.log(haveMembership)
    setHaveMembership(haveMembership)
  }else{
    setHaveMembership(false)
    }
    let membresiaTemporal: any = [];
    try {
      for (let i = 0; i < 9; i++) {
        const memberships = await contract.call("memberships", [i]);
        console.log(memberships)
        membresiaTemporal.push({
          plan: memberships.membershipTitle,
          price: ethers.utils.formatUnits(memberships.membershipAmount._hex, 6), //CAMBIO:
          minStake: ethers.utils.formatUnits(memberships.minInv._hex, 6), //CAMBIO:
          maxStake: ethers.utils.formatUnits(memberships.maxInv._hex, 6), //CAMBIO:
          fee: parseInt(memberships.amountFee._hex, 16) / 10,
          expiration: parseInt(memberships.expirationMembership._hex, 16),
          performanceFee: parseInt(memberships.performanceFee._hex, 16),
        });
      }
    } catch (error) {
      console.log("Error");
    }
    setMembresias({
      data: membresiaTemporal,
      status: true,
    });
  }, []);

  useEffect(() => {
    checkPoi();
    llamadoMembresias();

    const currentUrl = window.location.href;
    const queryStringIndex = currentUrl.indexOf("?");
    if (queryStringIndex !== -1) {
      const queryString = currentUrl.slice(queryStringIndex + 1);
      const params = new URLSearchParams(queryString);
      const referral = params.get("referral");
      if (referral) {
        setActualCode(referral);
      } else {
        setActualCode(referral);
      }
    } else {
      setActualCode("0");
    }
  }, [llamadoMembresias]);

  const removeSingleQuotes = (text: any) => {
    if (!text) return text;
    return text.replace(/^'|'$/g, "");
  };

  const buttonPayWithWallet = () => {
    setIsModalOpen2(true);
    setIsProcessing2(true);
  };

  const handleApproveExpenses = () => {
    if (approveExpensesButtonRef.current) {
      approveExpensesButtonRef.current.click();
    }
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
  const chainId = useChainId();
  console.log(chainId)

  return (

      <div className={`container-Membership`}>
        <div className="header">
          {pathname !== "/membership" ? (
            <div>
              <Navbar text={t("Buy NFT")} />
            </div>
          ) : (
            <div className="header-logo ">
              <div className="flex">
                <Image src={IconLogo} alt="logo" width={28} height={24} />
                <div className="w-4/5">
                  <div className="text-center text-[12px] text-[#ffffffb3] mx-auto">
                    <p>{t("Step 3/4 (Optional)")}</p>
                    <p className=" font-bold mt-1">{t("MEMBERSHIP PURCHASE")}</p>
                  </div>
                </div>
              </div>
              <div className="container-bars-progresss grid grid-cols-4 gap-2 mt-[20px]">
                <div className="div-bar h-4">
                  <div
                    onClick={() => {console.log("a")}}
                    className={`div-progress h-4 rounded-[20px] bg-[#11BDA0] text-[12px] font-bold cursor-pointer flex items-center justify-center`}
                  >
                    {`${t("STEP")} 1`}
                  </div>
                </div>
                <div className="div-bar bar2">
                  <div
                    onClick={() => router.push("/purchaseNft")}
                    className={`div-progress h-4 rounded-[20px] bg-[#11BDA0] text-[12px] font-bold text-white cursor-pointer flex items-center justify-center`}
                  >{`${t("STEP")} 2`}</div>
                </div>
                <div className="div-bar bar3">
                  <div
                    className={`div-progress h-4 rounded-[20px] bg-[#7A2FF4] text-[12px] font-bold text-white cursor-pointer flex items-center justify-center`}
                  >{`${t("STEP")} 3`}</div>
                </div>
                <div className="div-bar bar4">
                  <div
                    className={`div-progress h-4 rounded-[20px] bg-[#F2F3F8] text-[12px] font-bold text-[#A9AEB4] cursor-pointer flex items-center justify-center`}
                  >{`${t("STEP")} 4`}</div>
                </div>
              </div>
            </div>
          )}

          <div className="header-title">
            <h1>{t("Select your Membership")}!</h1>
            <p>{t("This is a one-time annual payment You can upgrade your plan whenever you wish")}</p>
          </div>
        </div>

        <div className={`container-members grid grid-cols-2 justify-items-center gap-y-4`}>
          {membresias.status ? (
            <>
              {membresias.data.map(
                (plan, index) =>
                  index > 0 && (
                    <div
                      className={`container-plan ${
                        selectedPlan?.plan === plan.plan ? "--container-Selected" : ""
                      } w-[150px] h-[160px] flex flex-col rounded-[20px] ${
                        plan.plan === "Zero" || plan.plan === "Zero Plus"
                          ? "border border-solid border-[#A9AEB4]"
                          : "border border-solid border-[#AD98FF]"
                      }`}
                      key={plan.plan}
                      onClick={() => {
                        handleSelectPlan(plan.plan, index);
                        setMemberValue(plan.price)
                        setIdMember(index)
                      }}
                    >
                      <h1 style={{ fontSize: "15px" }} className="plan-title">
                        {removeSingleQuotes(plan.plan)}
                      </h1>
                      <p className="plan-price">{parseInt(plan.price).toLocaleString()}</p>
                      <div className="container-btn">
                        <ButtonSecondary
                          text={t("See more")}
                          classname={`${selectedPlan?.plan === plan.plan ? "--btnSelected" : " --btnMember"}`}
                          onClickFn={() => {
                            handleSelectPlan(plan.price, index);
                            setIsModalOpen(true);
                          }}
                        />
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                  )
              )}
            </>
          ) : (
            <h1 className="text-[#1E0E39] font-bold text-[18px] text-center w-full col-span-2">{t("Loading memberships")}...</h1>
          )}
          <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[320px] h-auto rounded-xl">
            <div className="container-modal">
              <div
                className={`${
                  selectedPlan?.plan === "Zero" || selectedPlan?.plan === "Zero Plus" ? "bg-[#A9AEB4]" : "bg-[#7A2FF4]"
                } rounded-tl-xl rounded-tr-xl flex justify-center items-center text-[#FFFFFF] p-[24px]`}
              >
                <p className="font-bold text-[20px] mr-2">
                  {removeSingleQuotes(selectedPlan?.plan)}
                </p>
                {parseInt(selectedPlan?.price) != 0 && <p className="text-[16px]">$ {parseInt(selectedPlan?.price).toLocaleString()}</p>}
              </div>
              <div className="p-[24px] ">
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">{t("Min Stake")}</p>
                  <div
                    className={`container-check ${
                      selectedPlan?.plan === "Zero" || selectedPlan?.plan === "Zero Plus" ? "bg-[#A9AEB4]" : "bg-[#7A2FF4]"
                    } rounded-[10px] p-2`}
                  >
                    <span className="text-[14px] text-[#ffffff] font-bold">
                      ${parseInt(selectedPlan?.minStake).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px] my-[24px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">{t("Max Stake")}</p>
                  <div
                    className={`container-check ${
                      selectedPlan?.plan === "Zero" || selectedPlan?.plan === "Zero Plus" ? "bg-[#A9AEB4]" : "bg-[#7A2FF4]"
                    } rounded-[10px] p-2`}
                  >
                    <span className="text-[14px] text-[#ffffff]">
                      ${parseInt(selectedPlan?.maxStake).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px] my-[24px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">{t("Fee")}</p>
                  <div
                    className={`container-check ${
                      selectedPlan?.plan === "Zero" || selectedPlan?.plan === "Zero Plus" ? "bg-[#A9AEB4]" : "bg-[#7A2FF4]"
                    } rounded-[10px] p-2`}
                  >
                    <span className="text-[14px] text-[#ffffff]">
                      {selectedPlan?.fee}%
                    </span>
                  </div>
                </div>
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px] my-[24px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">{t("Performance Fee")}</p>
                  <div
                    className={`container-check ${
                      selectedPlan?.plan === "Zero" || selectedPlan?.plan === "Zero Plus" ? "bg-[#A9AEB4]" : "bg-[#7A2FF4]"
                    } rounded-[10px] p-2`}
                  >
                    <span className="text-[14px] text-[#ffffff]">{selectedPlan?.performanceFee}%</span>
                  </div>
                </div>
                {selectedPlan?.plan === "Zero" || selectedPlan?.plan === "Zero Plus" ? null : (
                  <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px]">
                    <p className="text-[#1E0E39] font-bold text-[14px]">{t("Expiration")}</p>
                    <div className={`container-check bg-[#7A2FF4] rounded-[10px] p-2`}>
                      <span className="text-[14px] text-[#ffffff]">
                        365 {t("days")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ModalComponent>
        </div>

        <div className={`px-[24px] ${pathname === "/membership" ? "mb-6" : "mb-[90px]"}`}>
            <div className="my-8 relative">
            {/*  <input
                type="text"
                placeholder={t("Promo code")}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="relative p-4 bg-[#F2F3F8] rounded-[10px] w-full font-bold"
              />*/}
             {/* <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[14px] text-[#7A2FF4] font-bold">
                {t("Apply")}
              </span>*/}
            </div>
            {selectedPlanNumber == 0 ? (
             <>
             </>
            ) : (

              <>
             {/* <ButtonPrimary onClickFn={confirmMembership} text={t("Confirm")} />*/}


            {/*  <Web3Button
                        contractAddress={process.env.TOKEN_CONTRACT}
                        contractAbi={abiToken}
                        action={async (contract: any) => {
                        //  buttonPayWithWallet();
                        console.log(memberValue)
                          const memberValueWithFee = parseInt(memberValue) + 30; // Sumar 30 al valor de memberValue
                          console.log(memberValueWithFee)
                          const valueInWei = ethers.utils.parseUnits(memberValueWithFee.toString(), "ether"); // Convertir el valor a Wei
                          console.log(valueInWei)
                          buttonPayWithWallet();
                          await contract.call("approve", [process.env.MEMBERS_CONTRACT,valueInWei]);

                          const sdk = ThirdwebSDK.fromSigner(signer, 137);
                          const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT,abiAccount);
                          const contractMember = await sdk.getContract(process.env.MEMBERS_CONTRACT,abiMembers);
                          if (idAccount == undefined){
                            const tokenIds = await contractAccount.call("tokenIds",[]); //Obtiene el id de NFT proximo a mintear
                            const queryString = window.location.search;
                            const urlParams = new URLSearchParams(queryString);
                            const referral = urlParams.get('referral');
                            console.log(referral)
                            await contractMember.call("buyMembership", [idMember,parseInt(tokenIds._hex, 16),referral !== undefined && referral !== null ? referral : 0,wallet,promoCode !== undefined && promoCode !== null ? promoCode : ""]);
                            localStorage.setItem("idAccount", parseInt(tokenIds._hex, 16).toString()); //Setea el nuevo idAccount en el back end de la persona
                            setLogin(true)
                          }else{
                           // const arrayInfo = await contractAccount.call("arrayInfo",[wallet,0]); //Obtiene el id del primer NFT
                           // console.log(parseInt(arrayInfo._hex, 16))
                           const leadershipSplitPartners = await contractMember.call("leadershipSplitPartners",[idAccount]); //Obtiene el id de NFT proximo a mintear
                           console.log(parseInt(leadershipSplitPartners._hex, 16))
                            await contractMember.call("buyMembership", [idMember,idAccount,parseInt(leadershipSplitPartners._hex, 16),wallet,promoCode !== undefined && promoCode !== null ? promoCode : ""]);
                          }

                        }}
                        onSuccess={async() => {
                        console.log("Aprobado bien")
                        setIsProcessing2(false);
                        setTimeout(() => {
                          setIsModalOpen2(false);
                          if(login){
                            router.push(
                              `/liquidityPool?type=addLiquidity` //Cuando termina de pagar POI lo manda a comprar la membresia para activar la cuenta
                            );
                          }else{
                            router.push(
                              `/dashboard` //Cuando termina de pagar POI lo manda a comprar la membresia para activar la cuenta
                            );
                          }
                        }, 2000);
                        }}
                        onError={(error) =>{
                          setIsProcessing2(false);
                          setIsDeclined2(true);
                          setTimeout(() => {
                            setIsModalOpen2(false);
                          }, 6000);
                        }}
                        className="buttonPrimary"
                      >
                        {t("Pay Membership")}
              </Web3Button>*/}
                     
                     
              </>
              
            )}
              
              <input type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={t("Promo code")} 
                className="relative p-4 bg-[#F2F3F8] rounded-[10px] w-full font-bold" />
             {/* <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[14px] text-[#7A2FF4] font-bold">{t("Apply")}</span>*/}
            </div>
            {selectedPlanNumber == 0 ? (
            <> {haveMembership
                ?<ButtonPrimary text={t("Buy membership")} disabled={true} />: <ButtonPrimary text={t("Next")} disabled={true} />}</>
            ) : (<>
             {haveMembership ||( buyNewMember != null || buyNewMember != undefined)
                  ?
                  <Web3Button
                        contractAddress={process.env.TOKEN_CONTRACT}
                        contractAbi={abiToken}
                        action={async (contract: any) => {
                        //  buttonPayWithWallet();
                        console.log(memberValue)
                          const memberValueWithFee = parseInt(memberValue); // Sumar 30 al valor de memberValue
                          const valueInWei = ethers.utils.parseUnits(memberValueWithFee.toString(), "ether"); // Convertir el valor a Wei
                          console.log(valueInWei)
                          buttonPayWithWallet();
                          await contract.call("approve", [process.env.MEMBERS_CONTRACT,valueInWei]);
                          console.log("Aprobado")
                          const sdk = ThirdwebSDK.fromSigner(signer, Polygon);
                          const contractMember = await sdk.getContract(process.env.MEMBERS_CONTRACT,abiMembers);
                           const leadershipSplitPartners = await contractMember.call("leadershipSplitPartners",[idAccount]); //Obtiene el id de NFT proximo a mintear
                           console.log(parseInt(leadershipSplitPartners._hex, 16))
                           if(buyNewMember != null || buyNewMember != undefined){ //Verifica si fue una cuenta que no tiene nada comprado
                            const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT,abiAccount);
                            const arrayInfo = await contractAccount.call("arrayInfo", [wallet, 0]);
                            console.log("SPONSOR: ",arrayInfo.toNumber())
                            await contractMember.call("buyMembership", [idMember,idAccount,parseInt(leadershipSplitPartners._hex, 16),wallet,promoCode !== undefined && promoCode !== null ? promoCode : ""]);
                           }else{
                             await contractMember.call("buyMembership", [idMember,idAccount,parseInt(leadershipSplitPartners._hex, 16),wallet,promoCode !== undefined && promoCode !== null ? promoCode : ""]);
                           }
                        }}
                        onSuccess={async() => {
                        console.log("Aprobado bien")
                        setIsProcessing2(false);
                        setTimeout(() => {
                          setIsModalOpen2(false);
                          if(login){
                            router.push(
                              `/liquidityPool?type=addLiquidity` //Cuando termina de pagar POI lo manda a comprar la membresia para activar la cuenta
                            );
                          }else{
                            router.push(
                              `/dashboard` //Cuando termina de pagar POI lo manda a comprar la membresia para activar la cuenta
                            );
                          }
                        }, 2000);
                        }}
                        onError={(error) =>{
                          setIsProcessing2(false);
                          setIsDeclined2(true);
                          setTimeout(() => {
                            setIsModalOpen2(false);
                          }, 6000);
                        }}
                        className="buttonPrimary"
                      >
                        {t("Pay Membership")}
              </Web3Button>
                  :
              <ButtonPrimary onClickFn={confirmMembership} text={t("Next")} />
             }
              </>
            )}
           
           {/* <div className="w-full mx-auto mt-8 text-center mb-4">
            {haveMembership ||( buyNewMember != null || buyNewMember != undefined)? <></>:<>
              <button
                className="rounded-[10px] border border-solid border-[#A9AEB4] p-4 text-[16px] font-bold text-[#A9AEB4] cursor-pointer"
                onClick={() => {
                  localStorage.removeItem('membershipSelected');
                  const urlParams = new URLSearchParams(window.location.search);
                  const referral = urlParams.get("referral");
                  router.push(
                    `/totalPayment?referral=${referral}`
                  );
                }}
              >
                {t("Skip Now")}
              </button>
              </>}
           </div>*/}
           <div className="w-full mx-auto mt-8 text-center mb-4">
           
           </div>
          
          <br></br>            
          <br></br>            
         {/* <ModalComponent
            isOpen={isModalOpen2}
            setIsOpen={setIsModalOpen2}
            classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg"
          >
            {isProcessing2 ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-16">
                <div>
                  <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                </div>
                <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">{t("Processing your Request")}</p>
              </div>
            ) : isDeclined2 ? (
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
          </ModalComponent>*/}
        </div>

  );
};

export default SelectMembership;
