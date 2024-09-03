"use client";
import React, { useEffect, useState } from "react";
import ModalComponent from "@/app/components/generals/ModalComponent";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import SelectedButton from "./SelectButton";
import { useClickOutside } from "@/utils/useClickOutside";
import CirclePurple from "@/assets/icons/circle-purple-modal.svg";
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
  ThirdwebProvider,
  ThirdwebSDK,
  Web3Button,
  useSigner
} from '@thirdweb-dev/react'
import abiClaim from "@/abis/abiClaim.json";
import abiToken from "@/abis/abiToken.json";
import abiMembers from "@/abis/abiMembers.json";
import { ethers } from "ethers";
import "./buttonStyle.css";
import { useRouter } from "next/navigation";

const AddLiquidity = () => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingTwo, setIsProcessingTwo] = useState(false);
  const [aprobado, setAprobado] = useState(false);
  const [isOpenSelectPlan, SetIsOpenSelectPlan] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>(t("Select Membership"));
  const [index, setIndex] = useState<any>(-1);
  const [amount, setAmount] = useState<string>("");
  const [misMembresias, setmisMembresias] = useState({
    status: false,
    data: [],
  });
  const [blanceUsdt, setBlanceUsdt] = useState<any>(0);
  const [totalRewards, setTotalRewards] = useState(0)
  const [totalPayedRewards, setTotalPayedRewards] = useState(0)
  const [minMax, setMinMax] = useState<any>({ min: "Select One", max: "Select One" });
  const router = useRouter();
  const wallet = localStorage.getItem("wallet");
  const idAccount = localStorage.getItem("idAccount");



  const [idExtra, setIdExtra] = useState<any>()
  const membersOfUser = async () => {
    //Obtiene las membresias de la persona
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
    const contractToken = await sdk.getContract(process.env.TOKEN_CONTRACT, abiToken);
    const contractClaim = await sdk.getContract(process.env.CLAIM_CONTRACT, abiClaim);

    const rewards = await contractClaim.call("rewards",[idAccount]);
    console.log("rewards",rewards)
    setTotalRewards(parseInt(rewards._hex, 16))
    const totalPayedRewards = await contractClaim.call("totalPayedRewards",[idAccount]);
    console.log("totalPayedRewards",totalPayedRewards)
    setTotalPayedRewards(parseInt(totalPayedRewards._hex, 16))

    const balanceOf = await contractToken.call("balanceOf", [wallet]);
    setBlanceUsdt(ethers.utils.formatUnits(balanceOf._hex, 6)); //CAMBIO
    const getMembershipOfUsersLength = await contract.call("getMembershipOfUsersLength", [idAccount]);

    let arrayTemporal = [];
    let memberSelected = false;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const indexMember = urlParams.get("indexMember");
    try {
      
      for (let i = 0; i < getMembershipOfUsersLength; i++) {
        const membershipOfUsers = await contract.call("membershipOfUsers", [idAccount, i]);
        const memberships = await contract.call("memberships", [parseInt(membershipOfUsers.memberId._hex, 16)]);
        const cleanedTitle = memberships.membershipTitle.replace(/'/g, "");
        console.log(indexMember)
       if(indexMember == undefined || indexMember == null){
          if (!memberSelected) {
            if (
              parseFloat(ethers.utils.formatUnits(memberships.maxInv._hex, 6)) - parseFloat(ethers.utils.formatUnits(membershipOfUsers.staked._hex, 6)) >
              0
            ) {
              setSelectedPlan(cleanedTitle);
              setIndex(i);
              memberSelected = true;
            } else {
              console.log("La membresia ", i, "NO puede stakear va a la siguiente");
            }
          }
        }else{ //Si la persona viene de las membresias
          console.log("Viene")
          console.log(arrayTemporal)
          console.log(indexMember)
          const membershipOfUsers = await contract.call("membershipOfUsers", [idAccount, indexMember]);
          const memberships = await contract.call("memberships", [parseInt(membershipOfUsers.memberId._hex, 16)]);
          const cleanedTitle = memberships.membershipTitle.replace(/'/g, "");
          setSelectedPlan(cleanedTitle);
          setIndex(indexMember);
        }
        arrayTemporal.push(cleanedTitle);
      }
    } catch (error) {
      console.log("Error", error);
    }

    setmisMembresias({
      status: true,
      data: arrayTemporal,
    });
  };

  useEffect(() => {
    membersOfUser();
  }, []);

  function handleOpenSelectCountry() {
    SetIsOpenSelectPlan(!isOpenSelectPlan);
  }

  useClickOutside("#select-plan", () => SetIsOpenSelectPlan(!selectedPlan));

  const buttonApproveContract = () => {
    setIsModalOpen(true); //Abre el modal
    setIsProcessing(true); //Muestra el cargando en true
  };

  function getValueInputEmail(value: string) {
    setAmount(value);
  }

  const buscarMinimoMaximo = async () => {
    //Esta funcion buscara los maximos y minimos de stakear de la membresia seleccionada
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
    const membershipOfUsers = await contract.call("membershipOfUsers", [idAccount, index]);
    const memberships = await contract.call("memberships", [parseInt(membershipOfUsers.memberId._hex, 16)]);
    setIdExtra(parseInt(membershipOfUsers.memberId._hex, 16))
    setMinMax({
      min: ethers.utils.formatUnits(memberships.minInv._hex, 6), //CAMBIO
      max: parseFloat(ethers.utils.formatUnits(memberships.maxInv._hex, 6)) - parseFloat(ethers.utils.formatUnits(membershipOfUsers.staked._hex, 6)), //CAMBIO
    });
  };

  useEffect(() => {
    console.log(index);
    if (index != -1) {
      buscarMinimoMaximo();
    }
  }, [index]);


  const smartWalletConfig = {
    factoryAddress: '0x15C8D84d83D02BBDe62018105955f896652f2AAd',
    gasless: false // true si queres que la app cubra los gastos de gas. Debe estar fondeado en dashboard de thirdweb
  };
  const cocayWallet = smartWallet(
    embeddedWallet({ recommended: true }),
    smartWalletConfig
  );
  cocayWallet.meta.name = "Defily Wallet";

  const signer = useSigner()
  return (



      <div className="min-h-[calc(100vh-150px)] flex flex-col justify-between">
        <div className="container-up m-6 ">
          <div className="container-purple py-6 px-12 rounded-[20px] shadow-md bg-[#7A2FF4] text-white text-center">
            <p className="text-[14px] mb-2">{t("Available to Stake")}</p>
            <p className="text-[24px] font-bold ">$ {parseInt(blanceUsdt)}</p>
          </div>
          <br></br>
          <div className="container-purple py-6 px-12 rounded-[20px] shadow-md bg-[#7A2FF4] text-white text-center">
            <p className="text-[14px] mb-2">{t("Claim available")}</p>
            <p className="text-[24px] font-bold ">$ {totalRewards / 1000000}{" "}</p>
            <br></br>
            <Web3Button
                  contractAddress={process.env.CLAIM_CONTRACT}
                  contractAbi={abiClaim}
                        action={async (contract: any) => {
                          const idAccount = localStorage.getItem('idAccount');
                          await contract.call("claimStakingReward", [idAccount]);
                        }}
                        onSuccess={async() => {
                          const sdk = new ThirdwebSDK(137);
                          const contractClaim = await sdk.getContract(process.env.CLAIM_CONTRACT, abiClaim);
                          const rewards = await contractClaim.call("rewards",[idAccount]);
                          console.log("rewards",rewards)
                          setTotalRewards(parseInt(rewards._hex, 16))
                          const totalPayedRewards = await contractClaim.call("totalPayedRewards",[idAccount]);
                          console.log("totalPayedRewards",totalPayedRewards)
                          setTotalPayedRewards(parseInt(totalPayedRewards._hex, 16))
                        }}
                        onError={(error) =>{
                         
                        }}
                        className="buttonPrimary"
                      >
                        {t("Claim Rewards")}
              </Web3Button>
              <br></br>
              <p style={{paddingTop:"5px"}} className="text-[14px] mb-2">{t("Total Claimed")}</p>
              <p className="text-[24px] font-bold ">$ {totalPayedRewards / 1000000}{" "}</p>
          </div>
         
        </div>

        <div className="container-down mb-[60px] px-[24px] pt-[32px] pb-[96px] rounded-t-[40px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
          <div>
            <p className="text-[12px] text-[#F2F3F8] text-center  mb-1">{t("Select the Membership you are adding liquidity to")}</p>
            <SelectedButton
              isOpenList={isOpenSelectPlan}
              filterBy={selectedPlan}
              listSelect={misMembresias.data}
              openAndClose={handleOpenSelectCountry}
              selectedSingle={setSelectedPlan}
              textView={t("Select Membership")}
              id="select-plan"
              selectId={setIndex}
            />
          </div>
          <div className="container-Stake-amount text-white p-6 rounded-[16px] border border-solid border-[#AD98FF] bg-gradient-to-t from-[#0E0E33] to-[#39307B] shadow-md">
            <h2 className="text-[18px] font-bold mb-4">{t("Stake")}</h2>
            <div className="mb-6 rounded-[10px] border border-solid border-[#F2F3F8] p-2">
              <p className="text-[14px] font-bold mb-4">{t("Amount")}</p>

              <div className="container-input relative">
                <input
                  className="rounded-[10px] p-4 bg-[#ffffff1a] w-full"
                  value={amount}
                  onChange={(e) => getValueInputEmail(e.target.value)}
                />
                <button onClick={() =>{
                      const maxAmount = parseFloat(minMax.max);
                      const balance = parseFloat(blanceUsdt);
                      if (maxAmount > balance) {
                        setAmount(balance.toString());
                      } else {
                        setAmount(maxAmount.toString());
                      }
                      console.log(maxAmount > balance ? balance.toString() : maxAmount.toString());
                      console.log(blanceUsdt);
                }} className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#A9AEB4]">
                  {t("MAX")}
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 mb-4">
                <p className="text-[10px] ">
                  <b>{t("MIN")}.:</b> {`$${isNaN(parseInt(minMax.min)) ? "0" : parseInt(minMax.min)}`}
                </p>

                <p className="text-[10px] ">
                  <b>{t("MAX")}.:</b> {`$${isNaN(parseInt(minMax.max)) ? "0" : parseInt(minMax.max)}`}
                </p>
              </div>
            </div>
            <div>
              {aprobado ? (
                <Web3Button
                  contractAddress={process.env.CLAIM_CONTRACT}
                  contractAbi={abiClaim}
                  action={async (contract: any) => {
                    const amountInWei = ethers.utils.parseUnits(amount, 6); // Aquí se utiliza 6 decimales
                    const sdk = new ThirdwebSDK(137);
                    const contractMembers = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
                    const getInfoOfMembership = await contractMembers.call("getInfoOfMembership", [idAccount, index]);
                    buttonApproveContract();
                    await contract.call("stake", [amountInWei.toString(),idAccount,index]);
                  }}
                  onSuccess={() => {
                    setIsProcessing(false);
                    setTimeout(() => {
                      setIsModalOpen(false);
                    }, 2000);
                    router.push(`/dashboard`);
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
                  {t("Add Liquidity")}
                </Web3Button>
              ) : (
                <Web3Button
                  contractAddress={process.env.TOKEN_CONTRACT}
                  contractAbi={abiToken}
                  action={async (contract) => {
                    let extraAmount = 0;
                    if (idExtra === 1) {
                      extraAmount = parseFloat(amount) * 0.1; // 10% extra
                    } else if (idExtra === 2) {
                      extraAmount = parseFloat(amount) * 0.05; // 5% extra
                    }
                    const totalAmount = parseFloat(amount) + extraAmount;
                    const valueInWei = ethers.utils.parseUnits(totalAmount.toString(), 6); // Aquí se utiliza 6 decimales
                    buttonApproveContract();
                    const gasPrice = ethers.utils.parseUnits("50", "gwei"); // Convertir 50 gwei a wei
                    console.log("Aprobando...")
                    await contract.call("approve", [process.env.CLAIM_CONTRACT,valueInWei], {
                      gasPrice: gasPrice
                    });
                    console.log("Aprobado")
                    setIsProcessing(false);
                    setIsProcessingTwo(true);
                    const sdk = ThirdwebSDK.fromSigner(signer, 137);
                    const contractAccount = await sdk.getContract(process.env.CLAIM_CONTRACT,abiClaim);
                    const amountInWei = ethers.utils.parseUnits(amount, 6); // Aquí se utiliza 6 decimales
                    await contractAccount.call("stake", [amountInWei.toString(),idAccount,index], {
                      gasPrice: gasPrice
                    });
                  }}
                  onSuccess={(result) => {
                    setIsProcessing(false);
                    setIsProcessingTwo(false);
                    setTimeout(() => {
                      setIsModalOpen(false);
                    }, 2000);
                    router.push(`/dashboard`);
                    //setAprobado(true);
                  }}
                  onError={(error) => {
                    setIsProcessing(false);
                    setIsProcessingTwo(false);
                    setIsDeclined(true);
                    setTimeout(() => {
                      setIsModalOpen(false);
                    }, 6000);
                  }}
                  className="buttonPrimary"
                >
                  {t("Add Liquidity")}
                </Web3Button>
              )}
              <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg">
                {isProcessing ? (
                  <div className="w-full h-full flex flex-col items-center justify-center px-1">
                  <div className="flex flex-col items-center justify-center">
                    <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                    <p className="text-[14px] font-bold text-[#554D77] mt-8 text-center">{t("STAKE PAYMENT")}</p>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                      <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Approving Amount")}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                      <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Staking")}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                      <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Staking")}</span>
                    </div>
                  </div>
                </div>
                ) : isProcessingTwo ? (
                  <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={ProcessingIcon} alt="Declined" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("STAKE PAYMENT")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Amount")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                  <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Staking")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Staking")}</span>
                  </div>
                </div>
              </div>
                ) : isDeclined ? (
                  <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={RechazedIcon} alt="Declined" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("STAKE PAYMENT")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Amount")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Staking")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Staking")}</span>
                  </div>
                </div>
                <p className="mt-8 text-[18px] text-[#FF4C5A] text-center">{t("AN ERROR OCURRED!")}!</p>
              </div>
                ): 
                (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <Image src={CheckDone} alt="Check done" width={60} height={60} />
                    <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("STAKE PAYMENT")}</p>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                      <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Amount")}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                      <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Staking")}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                      <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Successful Staking")}</span>
                    </div>
                  </div>
                  <p className="mt-8 text-[18px] text-[#20DABB] text-center">{t("DONE")}!</p>
                </div>
                )}
              </ModalComponent>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AddLiquidity;
