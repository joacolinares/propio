"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ButtonSecondary from "@/app/components/generals/ButtonSecondary";
import { useEffect, useState, useCallback } from "react";
import ModalComponent from "@/app/components/generals/ModalComponent";
import { usePathname, useRouter } from "next/navigation";
import { useUserPlanStore } from "@/store/user-plan";
import Navbar from "@/app/components/generals/Navbar";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";

import { ThirdwebProvider, ThirdwebSDK, Web3Button } from "@thirdweb-dev/react";
import abiAccount from "@/abis/abiAccount.json";
import { ethers } from "ethers";
import "./buttonStyle.css";
import abiMembers from '@/abis/abiMembers.json';
import abiToken from '@/abis/abiToken.json';

interface PlansMembership {
  plan: string;
  price: string;
  minStake: string;
  maxStake: string;
  fee: string;
  expiration: number;
  performanceFee: number;
}


const test = async() => {
  const wallet = localStorage.getItem("wallet");
  const sdk = new ThirdwebSDK(137);
  const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
  const arrayInfo = await contractAccount.call("arrayInfo", [wallet, 0]);
  
  console.log(arrayInfo); // Esto debería mostrar el BigNumber con _hex: "0x0e"
  console.log(arrayInfo.toNumber()); // Esto debería imprimir 14 en decimal
}

const CreateNewAccount = () => {
  const t = useTranslations();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProcessingOpen, setIsModalProcessingOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [aprobado, setAprobado] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedPlanNumber, setSelectedPlanNumber] = useState(0);
  const [membresias, setMembresias] = useState<{
    data: PlansMembership[];
    status: boolean;
  }>({
    data: [],
    status: false,
  });
  const [nameAccount, setNameAccount] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");

  const handleSelectPlan = useCallback((plan: string, index: number): void => {
    setSelectedPlanNumber(index);
    const findPlan = membresias.data.find((p) => p.plan === plan);
    console.log(index)
    if (findPlan) {
      setSelectedPlan(findPlan);
    }
  }, [membresias.data]);

  const wallet = localStorage.getItem("wallet");

  const confirmMembership = () => {
    setIsModalProcessingOpen(true);
    setIsProcessing(true);
  };

  const llamadoMembresias = useCallback(async () => {
    console.log("Llamado");
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
    let membresiaTemporal: any = [];
    try {
      for (let i = 0; i < 9; i++) { // Limit to 8 memberships
        const memberships = await contract.call("memberships", [i]);
        membresiaTemporal.push({
          plan: memberships.membershipTitle,
          price: ethers.utils.formatEther(memberships.membershipAmount._hex),
          minStake: ethers.utils.formatEther(memberships.minInv._hex),
          maxStake: ethers.utils.formatEther(memberships.maxInv._hex),
          fee: memberships.fee,
          expiration: parseInt(memberships.expirationMembership._hex, 16),
          performanceFee: parseInt(memberships.amountFee._hex, 16) / 10,
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
    llamadoMembresias();

    const currentUrl = window.location.href;
    const queryStringIndex = currentUrl.indexOf("?");
    if (queryStringIndex !== -1) {
      const queryString = currentUrl.slice(queryStringIndex + 1);
      const params = new URLSearchParams(queryString);
      const referral = params.get("referral");
    }
  }, [llamadoMembresias]);

  const removeSingleQuotes = (text: any) => {
    return text.replace(/'/g, "");
  };
//ThirdwebProvider
  return (

      <div className={`container-Membership`}>
        <div className="header">
          <div>
            <Navbar text={t("Buy New Account")} />
         </div>
         
          <div>
            <h1 className="text-2xl text-white font-bold mb-4">
              {t("Name your Account")}
            </h1>
            <input
              placeholder={t("Account")}
              className="w-full p-4 text-[14px] font-bold text-[#A9AEB4] rounded-[10px] bg-[#ffffff1a]"
              required
              value={nameAccount}
              onChange={(e) => setNameAccount(e.target.value)}
            />
          </div>
        </div>

        <div className="header-title mt-8 px-6">
          <h1 className="text-2xl text-[#1E0E39] text-center font-bold mb-4">
            {t("Select your Membership")}!
          </h1>
          <p className="text-[14px] text-[#554D77]">
            {t(
              "This is a one-time annual payment You can upgrade your plan whenever you wish"
            )}
          </p>
        </div>

        <div
          className={`container-members grid grid-cols-2 justify-items-center gap-y-4`}
        >
          {membresias.status ? (
            <>
              {membresias.data.map(
                (plan, index) =>
                  index > 0 && ( // Changed to index >= 0 to include all memberships
                    <div
                      className={`container-plan ${
                        selectedPlan?.plan === plan.plan
                          ? "--container-Selected"
                          : ""
                      } w-[150px] h-[160px] flex flex-col rounded-[20px] ${
                        plan.plan === "Zero" || plan.plan === "Zero Plus"
                          ? "border border-solid border-[#A9AEB4]"
                          : "border border-solid border-[#AD98FF]"
                      }`}
                      onClick={() => handleSelectPlan(plan.plan, index)}
                      key={plan.plan}
                    >
                      <h1 style={{ fontSize: "15px" }} className="plan-title">
                        {removeSingleQuotes(plan.plan)}
                      </h1>
                      <p className="plan-price">{parseInt(plan.price)}</p>
                      <div className="container-btn">
                        <ButtonSecondary
                          text={t("See more")}
                          classname={`${
                            selectedPlan?.plan === plan.plan
                              ? "--btnSelected"
                              : " --btnMember"
                          }`}
                          onClickFn={() => {
                            handleSelectPlan(plan.plan, index);
                            setIsModalOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  )
              )}
            </>
          ) : (
            <h1 className="text-[#1E0E39] font-bold text-[18px] text-center w-full col-span-2">
              {t("Loading memberships")}...
            </h1>
          )}
          <ModalComponent
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            classBody="bg-white w-[320px] h-auto rounded-xl"
          >
            <div className="container-modal">
              <div
                className={`${
                  selectedPlan?.plan === "Zero" ||
                  selectedPlan?.plan === "Zero Plus"
                    ? "bg-[#A9AEB4]"
                    : "bg-[#7A2FF4]"
                } rounded-tl-xl rounded-tr-xl flex justify-center items-center text-[#FFFFFF] p-[24px]`}
              >
                <p className="font-bold text-[20px] mr-2">
                  {selectedPlan?.plan != undefined &&
                    removeSingleQuotes(selectedPlan?.plan)}
                </p>
                {parseInt(selectedPlan?.price) != 0 && <p className="text-[16px]">$ {parseInt(selectedPlan?.price)}</p>}
              </div>
              <div className="p-[24px] ">
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">
                    {t("Min Stake")}
                  </p>
                  <div
                    className={`container-check ${
                      selectedPlan?.plan === "Zero" ||
                      selectedPlan?.plan === "Zero Plus"
                        ? "bg-[#A9AEB4]"
                        : "bg-[#7A2FF4]"
                    } rounded-[10px] p-2`}
                  >
                    <span className="text-[14px] text-[#ffffff] font-bold">
                      ${parseInt(selectedPlan?.minStake)}
                    </span>
                  </div>
                </div>
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px] my-[24px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">
                    {t("Max Stake")}
                  </p>
                  <div
                    className={`container-check ${
                      selectedPlan?.plan === "Zero" ||
                      selectedPlan?.plan === "Zero Plus"
                        ? "bg-[#A9AEB4]"
                        : "bg-[#7A2FF4]"
                    } rounded-[10px] p-2`}
                  >
                    <span className="text-[14px] text-[#ffffff]">
                      ${parseInt(selectedPlan?.maxStake)}
                    </span>
                  </div>
                </div>
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px] my-[24px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">
                    {t("Fee")}
                  </p>
                  <div
                    className={`container-check ${
                      selectedPlan?.plan === "Zero" ||
                      selectedPlan?.plan === "Zero Plus"
                        ? "bg-[#A9AEB4]"
                        : "bg-[#7A2FF4]"
                    } rounded-[10px] p-2`}
                  >
                    <span className="text-[14px] text-[#ffffff]">
                      {selectedPlan?.fee ? <>Has a fee</> : <>Has not fee</>}
                    </span>
                  </div>
                </div>
                <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px] my-[24px]">
                  <p className="text-[#1E0E39] font-bold text-[14px]">
                    {t("Performance Fee")}
                  </p>
                  <div
                    className={`container-check ${
                      selectedPlan?.plan === "Zero" ||
                      selectedPlan?.plan === "Zero Plus"
                        ? "bg-[#A9AEB4]"
                        : "bg-[#7A2FF4]"
                    } rounded-[10px] p-2`}
                  >
                    <span className="text-[14px] text-[#ffffff]">
                      {parseInt(selectedPlan?.performanceFee)}%
                    </span>
                  </div>
                </div>
                {selectedPlan?.plan === "Zero" ||
                selectedPlan?.plan === "Zero Plus" ? null : (
                  <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center p-[8px]">
                    <p className="text-[#1E0E39] font-bold text-[14px]">
                      {t("Expiration")}
                    </p>
                    <div
                      className={`container-check bg-[#7A2FF4] rounded-[10px] p-2`}
                    >
                      <span className="text-[14px] text-[#ffffff]">
                        {selectedPlan?.expiration} {t("days")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ModalComponent>
        </div>

        <div
          className={`px-[24px] ${
            pathname === "/membership" ? "mb-6" : "mb-[90px]"
          }`}
        >
          <center>
            <div className="my-8 relative">
              <input
                type="text"
                placeholder={t("Promo code")}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="relative p-4 bg-[#F2F3F8] rounded-[10px] w-full font-bold"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[14px] text-[#7A2FF4] font-bold">
                {t("Apply")}
              </span>
            </div>
            {aprobado ? (
              <Web3Button
                contractAddress={process.env.ACCOUNT_CONTRACT}
                contractAbi={abiAccount}
                action={async (contract: any) => {
                  const sdk = new ThirdwebSDK(137);
                  const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
                  const arrayInfo = await contractAccount.call("arrayInfo", [wallet, 0]);
                  console.log(arrayInfo.toNumber())
                  console.log(promoCode)
                  confirmMembership();
                  await contract.call("createAccount", [nameAccount, wallet, arrayInfo.toNumber(), selectedPlanNumber,promoCode !== undefined && promoCode !== null ? promoCode : ""]);
                }}
                onSuccess={() => {
                  setIsProcessing(false);
                  setTimeout(() => {
                    setIsModalProcessingOpen(false);
                  }, 2000);
                  setAprobado(true);
                  router.push(`/myAccounts`);
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
                {t("Create New Account")}
              </Web3Button>
            ) : (
              <>
                {selectedPlanNumber == 0 ? (
                  <Web3Button
                    contractAddress={process.env.TOKEN_CONTRACT}
                    contractAbi={abiToken}
                    action={async (contract) => {
                      confirmMembership();
                      await contract.call("approve", [process.env.MEMBERS_CONTRACT, ethers.constants.MaxUint256]);
                    }}
                    onSuccess={(result) => {
                      setIsProcessing(false);
                      setTimeout(() => {
                        setIsModalProcessingOpen(false);
                      }, 2000);
                      setAprobado(true);
                    }}
                    onError={(error) => {
                      setIsProcessing(false);
                      setIsDeclined(true);
                      setTimeout(() => {
                        setIsModalProcessingOpen(false);
                      }, 6000);
                    }}
                    className="buttonPrimary"
                    isDisabled
                    style={{ backgroundColor: "gray" }}
                  >
                    {t("Approve expenses")}
                  </Web3Button>
                ) : (
                  <>
                    {nameAccount == "" ? (<>
                      <h2 style={{color:"red"}} className=" font-bold text-[18px] text-center w-full col-span-2">
                      Please write the account name 
            </h2>
                      <Web3Button
                        contractAddress={process.env.TOKEN_CONTRACT}
                        contractAbi={abiToken}
                        action={async (contract) => {
                          confirmMembership();
                          await contract.call("approve", [process.env.MEMBERS_CONTRACT, ethers.constants.MaxUint256]);
                        }}
                        onSuccess={(result) => {
                          setIsProcessing(false);
                          setTimeout(() => {
                            setIsModalProcessingOpen(false);
                          }, 2000);
                          setAprobado(true);
                        }}
                        onError={(error) => {
                          setIsProcessing(false);
                          setIsDeclined(true);
                          setTimeout(() => {
                            setIsModalOpen(false);
                          }, 6000);
                        }}
                        className="buttonPrimary"
                        isDisabled
                      >
                        {t("Approve expenses")}
                      </Web3Button>
                      </>
                    ) : (
                      <Web3Button
                        contractAddress={process.env.TOKEN_CONTRACT}
                        contractAbi={abiToken}
                        action={async (contract) => {
                          const sdk = new ThirdwebSDK(137);
                          const memberContract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
                          const memberships = await memberContract.call("memberships", [selectedPlanNumber]);
                          console.log(memberships);
                          // Convertir 30 Ether a Wei
                          const valueInWei = ethers.utils.parseUnits("30", "ether"); 

                          // Convertir memberships.membershipAmount a BigNumber
                          const membershipAmountInWei = ethers.BigNumber.from(memberships.membershipAmount._hex);

                          // Sumar ambos valores
                          const total = membershipAmountInWei.add(valueInWei);
                          console.log(total.toString());
                          confirmMembership();
                          await contract.call("approve", [process.env.MEMBERS_CONTRACT, total]);
                        }}
                        onSuccess={(result) => {
                          setIsProcessing(false);
                          setTimeout(() => {
                            setIsModalProcessingOpen(false);
                          }, 2000);
                          setAprobado(true);
                        }}
                        onError={(error) => {
                          setIsProcessing(false);
                          setIsDeclined(true);
                          setTimeout(() => {
                            setIsModalProcessingOpen(false);
                          }, 6000);
                        }}
                        className="buttonPrimary"
                      >
                        {t("Approve expenses")}
                      </Web3Button>
                    )}
                  </>
                )}
              </>
            )}
          </center>

          <ModalComponent
            isOpen={isModalProcessingOpen}
            setIsOpen={setIsModalProcessingOpen}
            classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg"
          >
            {isProcessing ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-16">
                <div>
                  <Image
                    src={ProcessingIcon}
                    alt="processing"
                    width={60}
                    height={60}
                  />
                </div>
                <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                  {t("Processing your Request")}
                </p>
              </div>
            ) : isDeclined ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div>
                  <Image
                    src={RechazedIcon}
                    alt="Decline"
                    width={60}
                    height={60}
                  />
                </div>
                <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                  {t("Failed Transfer")}
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div>
                  <Image
                    src={CheckDone}
                    alt="Check done"
                    width={60}
                    height={60}
                  />
                </div>
                <p className="mt-8 text-[18px] text-[#A9AEB4] text-center">
                  {t("Done")}
                </p>
              </div>
            )}
          </ModalComponent>
        </div>
      </div>

  );
};

export default CreateNewAccount;
