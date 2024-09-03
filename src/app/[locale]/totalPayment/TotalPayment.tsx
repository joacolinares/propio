"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import { useTranslations } from "next-intl";
import SponsorData from "../register/components/SponsorData";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { usePathname, useRouter } from "next/navigation";
import ModalComponent from "@/app/components/generals/ModalComponent";
import ProcessingIcon from "@/assets/imgs/processingGifModal.gif";
import CheckDone from "@/assets/icons/checkDone.svg";
import RechazedIcon from "@/assets/icons/rechazadoIcon.svg";
import RegisterCompletedImg from "@/assets/imgs/approvedModalRegister.gif";
import CirclePurple from "@/assets/icons/circle-purple-modal.svg";
import HeaderPages from "@/app/components/generals/HeaderPages";
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
  useChainId,
  useWallet,
  ConnectWallet,
  darkTheme,
  useAddress
} from '@thirdweb-dev/react'
import { ethers } from "ethers";
import abiAccount from "@/abis/abiAccount.json";
import abiMembers from "@/abis/abiMembers.json";
import abiPoi from "@/abis/abiPoi.json";
import abiClaim from "@/abis/abiClaim.json";
import abiToken from '@/abis/abiToken.json'
import "./buttonStyle.css";
import { Polygon } from "@thirdweb-dev/chains";

const TotalPayment = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [discount, setDiscount] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [nuevaCuenta, setNuevaCuenta] = useState(false);
  const [isModalOpenRegistration, setIsModalOpenRegistration] = useState(false);
  const [isProcessingRegistration, setIsProcessingRegistration] = useState(false);
  const [isDeclinedRegistration, setIsDeclinedRegistration] = useState(false);
  const [isModalOpenNFTPurchase, setIsModalOpenNFTPurchase] = useState(false);
  const [isProcessingNFTPurchase, setIsProcessingNFTPurchase] = useState(false);
  const [isDeclinedNFTPurchase, setIsDeclinedNFTPurchase] = useState(false);
  const [isModalOpenMembership, setIsModalOpenMembership] = useState(false);
  const [isProcessingMembership, setIsProcessingMembership] = useState(false);
  const [isDeclinedMembership, setIsDeclinedMembership] = useState(false);
  const [isModalOpenStake, setIsModalOpenStake] = useState(false);
  const [isProcessingStake, setIsProcessingStake] = useState(false);
  const [isDeclinedStake, setIsDeclinedStake] = useState(false);
  const [isModalOpenApprovedRegistration, setIsModalOpenApprovedRegistration] = useState(false);
  const [permitidoComprar, setPermitidoComprar] = useState(false);
  const [error, setError] = useState("");
  
  const [usdt, setUsdt] = useState(0);
  const [matic, setMatic] = useState({
    status: false,
    data: 0
  });

  const wallet = useAddress();

  const connectedWallet = useWallet()
  
  const [member, setMember] = useState<any>({
    data: 0,
    status: false
  });
  const [descuento, setDescuento] = useState<any>({
    data: 0,
    status: false
  });
  const [staking, setStaking] = useState<any>({
    data: 0,
    status: false
  });

  const [total, setTotal] = useState<any>({
    data: 0,
    status: false
  });

  const signer = useSigner();


  const buttonProceedWithPayment = () => {
     setIsModalOpen(true);
     if (pathname === "/totalPayment") {
       setIsModalOpenRegistration(true);
       setIsProcessingRegistration(true);
     } else {
       setIsModalOpenNFTPurchase(true);
       setIsProcessingNFTPurchase(true);
     }
 
     setTimeout(() => {
       setIsProcessingRegistration(false);
     }, 3000);
 
     setTimeout(() => {
       setIsModalOpenRegistration(false);
 
       setIsModalOpenNFTPurchase(true);
       setIsProcessingNFTPurchase(true);
     }, 6000);
 
     setTimeout(() => {
       setIsProcessingNFTPurchase(false);
     }, 9000);
 
     setTimeout(() => {
       setIsModalOpenNFTPurchase(false);
 
       setIsModalOpenMembership(true);
       setIsProcessingMembership(true);
     }, 12000);
 
     setTimeout(() => {
       setIsProcessingMembership(false);
     }, 15000);
 
     setTimeout(() => {
       setIsModalOpenMembership(false);
 
       setIsModalOpenStake(true);
       setIsProcessingStake(true);
     }, 18000);
 
     setTimeout(() => {
       setIsProcessingStake(false);
     }, 21000);
 
     setTimeout(() => {
       setIsModalOpenStake(false);
       setIsModalOpenApprovedRegistration(true);
     }, 24000);
 
     setTimeout(() => {
       setIsModalOpen(false);
       if (pathname === "/totalPayment") {
         router.push("/dashboard");
       } else {
         router.push("/myAccounts");
       }
     }, 27000);
   };



  const nftInfo = localStorage.getItem("nftInfo");
  const membershipSelected = localStorage.getItem("membershipSelected");
  const totalStaking = localStorage.getItem("totalStaking");
  const promoCode = localStorage.getItem("promoCode");
  const loadInfo = async () => {
    let membershipAmountNumber = 0;
    let totalStakingNumber = 0;
    let promoActiva = false;
    let cantPromo = 0
    let permitidoComprar = 0
    if (membershipSelected != undefined || membershipSelected != null) {
      const sdk = new ThirdwebSDK(137);
      const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
      const memberships = await contract.call("memberships", [membershipSelected]);
      const membershipAmount = ethers.utils.formatUnits(memberships.membershipAmount._hex, 6); // 6 decimales para USDT
      membershipAmountNumber = parseFloat(membershipAmount);
    }

    if (totalStaking != undefined || totalStaking != null) {
      totalStakingNumber = parseFloat(totalStaking);
    }

    if (promoCode != undefined || promoCode != null) {
      const sdk = new ThirdwebSDK(137);
      const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
      const promoCodes = await contract.call("promoCodes", [promoCode]);
      console.log(promoCodes)
      if(promoCodes.isUsed){
        setDescuento({
          data: parseInt(promoCodes.discount._hex,16),
          status: true
        })
        promoActiva = true
        cantPromo = parseInt(promoCodes.discount._hex,16)
      }
    }





    setMember({
      data: membershipAmountNumber,
      status: true
    });


    setStaking({
      data: totalStakingNumber,
      status: true
    });

    if (promoActiva) {
      console.log(cantPromo)
      const descuentoAplicado = membershipAmountNumber * (cantPromo / 100);
      const totalConDescuento = (membershipAmountNumber - descuentoAplicado) + totalStakingNumber + 30;

      setTotal({
        data: totalConDescuento,
        status: true
      });
    } else {
      setTotal({
        data: membershipAmountNumber + totalStakingNumber + 30,
        status: true
      });
    }





    const nuevaCuenta = localStorage.getItem('nuevaCuenta');
    if (nuevaCuenta == "true") {
      setNuevaCuenta(true);
    }
  };



  const checkBalance = async () => {
    const sdk = new ThirdwebSDK(137);
    const contractToken = await sdk.getContract(process.env.TOKEN_CONTRACT, abiToken);
    const wallet = localStorage.getItem("wallet");
    const balanceOf = await contractToken.call("balanceOf", [wallet]);
    const balanceFinal = parseInt(balanceOf._hex,16) / 1000000
    console.log("BALANCE:",balanceFinal)









   setUsdt(balanceFinal)


   const personalwallet = connectedWallet.getPersonalWallet();
    console.log(personalwallet)
    console.log(connectedWallet)
    if(balanceFinal > total.data){
      console.log("Tiene USDT suficiente")
      if(connectedWallet && connectedWallet.walletId !== 'smartWallet'){
        const balanceMatic = await signer.getBalance();
        const balanceMaticFormatted = ethers.utils.formatEther(balanceMatic); // MATIC tiene 18 decimales
        console.log("MATIC Balance:", balanceMaticFormatted);
        const balanceMaticNumber = parseFloat(balanceMaticFormatted); // Convierte el string a número

        setMatic({
          status: true,
          data: balanceMaticNumber
        })
          if(balanceMaticNumber >= 1){
            console.log("PUede comprar esta con wallet pero tiene Matic y USDT")
            setError("")
            setPermitidoComprar(true)
          }else{
            console.log("Esta con wallet tiene fondos pero no Matic")
            //setError(`Insufficient Matic balance, you need 1  and you have  ${balanceMaticFormatted}, send Matic to this wallet: ${wallet}`)
            setError(`Insufficient Matic balance`)
            setPermitidoComprar(false)
          }
      }else{
        console.log("Tiene balance y esta en email y puede comprar")
        setError("")
        setPermitidoComprar(true)
      }

    }else{
      console.log("No puede comprar")
      //setError(`Insufficient USDT balance, you need ${total.data}$ and you have  ${balanceFinal}$, send USDT to this wallet: ${wallet}`)
      setError(`Insufficient USDT balance`)
      setPermitidoComprar(false)
    }


  }

  useEffect(() => {
    loadInfo();

  }, []);

  useEffect(() => {
    console.log("Cambio")
    console.log(wallet)


    if(wallet != undefined){
      localStorage.setItem("wallet", wallet);
    }else{
      localStorage.removeItem('wallet');
    }

    const interval = setInterval(() => {
      console.log(connectedWallet)
      if(connectedWallet != undefined){
        checkBalance()
      }
    }, 3000); // Check balance every 10 seconds

    return () => clearInterval(interval);
  }, [connectedWallet,wallet]);

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

      <div className={`${pathname === "/totalPayment" ? "layout-connect" : "pb-[96px] bg-gradient-to-t from-[#0E0E33] to-[#39307B] min-h-screen text-white"}`}>
        {pathname === "/totalPayment" ? (
          <div className="container-up">
            <div className="container-logo flex">
              <Image src={LogoPeq} alt="logo" width={28} height={24} />
            </div>
          </div>
        ) : (
          <div>
            <HeaderPages text={t("Buy NFT")} />
          </div>
        )}

        <div className={`px-6 ${pathname === "/totalPayment" ? "pt-0" : "pt-[80px]"}`}>
          <div className="mb-8">
          <div className="flex justify-end">
  <ConnectWallet
    theme={darkTheme({
      colors: {
        modalBg: "#0E0E33",
        accentText: "#9D87F6",
        accentButtonBg: "#9D87F6",
        primaryText: "#FFFFFF",
        secondaryText: "#F2F3F8",
        primaryButtonBg: "#0E0E33",
        primaryButtonText: "#F2F3F8",
        connectedButtonBg: "#0E0E33",
        connectedButtonBgHover: "#0E0E33",
        walletSelectorButtonHoverBg: "#0E0E33",
        secondaryButtonBg: "#0E0E33",
      },
    })}
    termsOfServiceUrl="https://defily.ai/terms"
    privacyPolicyUrl="https://defily.ai/policy"
    modalTitleIconUrl="https://dapp.defily.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoInitial.eee4a987.gif&w=128&q=75"
    btnTitle="Log in"
    modalTitle="DeFily Wallet"
    showThirdwebBranding={false}
  />
</div>
            <SponsorData
              classContainer="rounded-[8px] border border-solid border-[#ffffff1a] py-2 px-4 flex items-center justify-between text-[#A9AEB4]"
              classValor="text-[14px] text-white"
            />
          </div>
          <div className="py-6 px-4 rounded-[10px] bg-[#ffffff1a] text-white">
         <center> <p className="text-[18px]">USDT balance: {usdt} {matic.status &&  <>|| Matic : {matic.data.toFixed(4)}</>}</p></center>
         <br />
         
          <br></br>
            <h1 className="text-[24px] font-bold mb-[40px]">{t("Total Payment")}</h1>
            {nuevaCuenta ? null : (
              <div className="flex justify-between border-b border-solid border-[#ffffff1a] pb-4">
                <p className="text-[14px] font-bold">{t("User Registration")}</p>
                <p className="text-[14px]">$0</p>
              </div>
            )}
            <div className="flex justify-between border-b border-solid border-[#ffffff1a] py-4">
              <p className="text-[14px] font-bold">{t("NFT")}</p>
              <p className="text-[14px]">$30</p>
            </div>
            {member.status && (
              <div className=" border-b border-solid border-[#ffffff1a] py-4">
                <div className="flex justify-between">
                  <p className="text-[14px] font-bold">{t("Membership")}</p>
                  {descuento.status ? <p className={`${discount ? "text-[#ffffff4d] line-through" : "text-white no-underline"} text-[14px]`}>${member.data}</p> :  <p className="text-[14px]">${member.data}</p>}
                 
                </div>
                 
                        {descuento.status &&  <div className="flex justify-between mt-1">
                            <p className="text-[10px] font-bold rounded-[20px] border border-solid border-[#20DABB] text-[#20DABB] py-[2px] px-[6px]">{`${t(
                              "DISCOUNT"
                            )} ${descuento.data}%`}</p>
                            <p className="text-[14px]">${(member.data * (1 - descuento.data / 100)).toFixed(2)}</p>
                          </div>}
          
              </div>
            )}
            {staking.status && (
              <div className="flex justify-between border-b border-solid border-white py-4">
                <p className="text-[14px] font-bold">{t("Stake")}</p>
                <p className="text-[14px]">${staking.data}</p>
              </div>
            )}
            <div className="flex justify-between pt-4 mb-[40px]">
              <p className="text-[18px] font-bold">{t("Total")}</p>
              <p className="text-[18px]">${total.data}</p>
            </div>
           <center> 
           
           
            
           <br />
            <p className="textErrorInput">{error}</p>
           </center>
           
         
            
            
           { permitidoComprar ?
              <Web3Button
              contractAddress={process.env.POI_CONTRACT}
              contractAbi={abiPoi}
              className="buttonPrimary"
              action={async (contract: any) => {
                const storedData = localStorage.getItem("step1");
                const parsedData = storedData ? JSON.parse(storedData) : {};

                const urlParams = new URLSearchParams(window.location.search);
                const referral = urlParams.get("referral");

                const gasPrice = ethers.utils.parseUnits("75", "gwei"); // Convertir 50 gwei a wei


                setIsModalOpen(true);

               // setIsModalOpenRegistration(true);
               // setIsProcessingRegistration(true);
                  //SE DEBE BORRAR
              const wallet = localStorage.getItem("wallet");
              // buttonProceedWithPayment()
              const personalDataMap = await contract.call("personalDataMap", [wallet]);
              console.log("Wallet conectada",wallet)
              console.log(personalDataMap.encryptedEmail)
              if (!nuevaCuenta && personalDataMap.encryptedEmail == "") {
                  console.log("creando cuenta")
                  setIsModalOpenRegistration(true);
                  setIsProcessingRegistration(true);
                  await contract.call("storeInfo", [
                    parsedData.encryptedHex,
                    parsedData.encryptedHex2,
                    parsedData.encryptedHex3,
                    parsedData.encryptedHex4,
                    "",
                    "",
                    ""
                  ], {
                    gasPrice: gasPrice
                  });
                }else{
                  console.log("Ya hizo POI")
                }




                const sdk = ThirdwebSDK.fromSigner(signer, 137);
                const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
                const contractMember = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
                const contractStake = await sdk.getContract(process.env.CLAIM_CONTRACT, abiClaim);
                const contractToken = await sdk.getContract(process.env.TOKEN_CONTRACT, abiToken);

                const tokenIds = await contractAccount.call("tokenIds", []);
                const nftInfo = localStorage.getItem("nftInfo");
                
                console.log("Entrando a comprar cuenta")
                
                
                
                
                if (nftInfo != undefined || nftInfo != null) {
                  console.log("Entra")
                  const memberValueWithFee = parseInt("30");
                  const valueInWei = ethers.utils.parseUnits(memberValueWithFee.toString(), 6); // 6 decimales para USDT
                  const nftSelected = localStorage.getItem("nftSelected");




                  const idAccount = localStorage.getItem('idAccount');
                  if (nuevaCuenta) {
                    setTimeout(() => {
                      setIsProcessingRegistration(false);
                    }, 3000);
                    setTimeout(() => {
                      setIsModalOpenRegistration(false);
                
                      setIsModalOpenNFTPurchase(true);
                      setIsProcessingNFTPurchase(true);
                    }, 6000);

                    await contractToken.call("approve", [process.env.ACCOUNT_CONTRACT, valueInWei], {
                      gasPrice: gasPrice
                    });
                    await contractAccount.call("createNFT", [nftInfo, wallet, idAccount, nftSelected], {
                      gasPrice: gasPrice
                    });
                  } else {
                    const balanceOf = await contractAccount.call("balanceOf", [wallet]);
                    if(parseInt(balanceOf._hex,16) == 0){
                      setTimeout(() => {
                        setIsProcessingRegistration(false);
                      }, 3000);
                      setTimeout(() => {
                        setIsModalOpenRegistration(false);
                  
                        setIsModalOpenNFTPurchase(true);
                        setIsProcessingNFTPurchase(true);
                      }, 6000);
                      await contractToken.call("approve", [process.env.ACCOUNT_CONTRACT, valueInWei], {
                        gasPrice: gasPrice
                      });
                      console.log("Se esta registrando")
                      const tokenActual = await contractAccount.call("tokenIds", []);
                      localStorage.setItem("idAccount", parseInt(tokenActual._hex, 16).toString());
                      console.log("nftINfo",nftInfo)
                      console.log("wallet",wallet)
                      console.log("referido",referral)
                      console.log("nftselect",nftSelected)
                      await contractAccount.call("createNFT", [nftInfo, wallet, referral !== undefined && referral !== null ? referral : 0, nftSelected], {
                        gasPrice: gasPrice
                    });
                    }else{
                      console.log("Usted ya ejecuto esta funcion: createNft()")
                    }

                  }
                }

                if (membershipSelected != undefined || membershipSelected != null) {

                  const memberships = await contractMember.call("memberships", [membershipSelected]);
                  const membershipAmount = ethers.utils.formatUnits(memberships.membershipAmount._hex, 6); // 6 decimales para USDT
                  const valueInWei = ethers.utils.parseUnits(membershipAmount.toString(), 6); // 6 decimales para USDT
                  
                  console.log("Codigo prmocional: ",promoCode)
                  

                  
                  const idAccount = localStorage.getItem('idAccount');
                  if (nuevaCuenta) {
                    setTimeout(() => {
                      setIsProcessingNFTPurchase(false);
                    }, 2000);
                    setTimeout(() => {
                      setIsModalOpenNFTPurchase(false);
                
                      setIsModalOpenMembership(true);
                      setIsProcessingMembership(true);
                    }, 5000);
                    await contractToken.call("approve", [process.env.MEMBERS_CONTRACT, valueInWei], {
                      gasPrice: gasPrice
                    });
                    await contractMember.call("buyMembership", [membershipSelected, parseInt(tokenIds._hex, 16), idAccount, wallet, promoCode !== undefined && promoCode !== null ? promoCode : ""], {
                      gasPrice: gasPrice
                    });
                  } else {
                    const hasExecuted = await contractMember.call("hasExecuted", [wallet]);
                    if(hasExecuted){
                      console.log("Usted ya ejecuto esta funcion: buyMembership()")
                    }else{
                      console.log("Comprando membresia")
                      setTimeout(() => {
                        setIsProcessingNFTPurchase(false);
                      }, 2000);
                      setTimeout(() => {
                        setIsModalOpenNFTPurchase(false);
                  
                        setIsModalOpenMembership(true);
                        setIsProcessingMembership(true);
                      }, 5000);
                      await contractToken.call("approve", [process.env.MEMBERS_CONTRACT, valueInWei], {
                        gasPrice: gasPrice
                      });
                      await contractMember.call("buyMembership", [membershipSelected, idAccount, referral !== undefined && referral !== null ? referral : 0, wallet, promoCode !== undefined && promoCode !== null ? promoCode : ""], {
                        gasPrice: gasPrice
                      });
                    }


                  }
                }

                if (totalStaking != undefined || totalStaking != null) {


                  const valueInWei = ethers.utils.parseUnits(totalStaking.toString(), 6); // 6 decimales para USDT
                  const idAccount = localStorage.getItem('idAccount');


                  if (nuevaCuenta) {

                    setTimeout(() => {
                      setIsProcessingMembership(false);
                    }, 2000);
                
                    setTimeout(() => {
                      setIsModalOpenMembership(false);
                
                      setIsModalOpenStake(true);
                      setIsProcessingStake(true);
                    }, 5000);
                    await contractToken.call("approve", [process.env.CLAIM_CONTRACT, valueInWei], {
                      gasPrice: gasPrice
                    });
                    await contractStake.call("stake", [valueInWei.toString(), parseInt(tokenIds._hex, 16), 0], {
                      gasPrice: gasPrice
                    });
                  } else {
                    const userStakes = await contractStake.call("userStakes", [idAccount]);
                    if(parseInt(userStakes._hex,16) == 0){

                      setTimeout(() => {
                        setIsProcessingMembership(false);
                      }, 2000);
                  
                      setTimeout(() => {
                        setIsModalOpenMembership(false);
                  
                        setIsModalOpenStake(true);
                        setIsProcessingStake(true);
                      }, 5000);
                      await contractToken.call("approve", [process.env.CLAIM_CONTRACT, valueInWei], {
                        gasPrice: gasPrice
                      });
                      await contractStake.call("stake", [valueInWei.toString(), idAccount, 0], {
                        gasPrice: gasPrice
                      });
                    }else{
                      console.log("Usted ya ejecuto esta funcion: stake()")
                    }
                  }
                }


                console.log("TERMINO CON TODOS LOS PASOS")  

                console.log("Todo bien")
                setTimeout(() => {
                  setIsProcessingStake(false);
                }, 2000);
            
                setTimeout(() => {
                  setIsModalOpenStake(false);
                  setIsModalOpenApprovedRegistration(true);
                }, 4000);
                setIsProcessing(false);
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 2000);

                localStorage.removeItem('nuevaCuenta');
                localStorage.removeItem('promoCode');
                localStorage.removeItem('nftConfirm');
                localStorage.removeItem('nftSelected');
                console.log("IR A DASHBOARD")
                router.push(`/dashboard`);
              }
            }
              onSuccess={() => {
                /*
                console.log("TODO BIEN EN REGISTRO")
                router.push(`/dashboard`);
                localStorage.removeItem('nuevaCuenta');
                localStorage.removeItem('promoCode');
                localStorage.removeItem('nftConfirm');
                localStorage.removeItem('nftSelected');




                console.log("Todo bien")
                setTimeout(() => {
                  setIsProcessingStake(false);
                }, 2000);
            
                setTimeout(() => {
                  setIsModalOpenStake(false);
                  setIsModalOpenApprovedRegistration(true);
                }, 4000);
                setIsProcessing(false);
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 2000);
               */
              }}
              onError={(error) => {
                console.log("ERROR")
                console.log(error)
                setIsDeclined(true);
                setTimeout(() => {
                  setIsModalOpen(false);
                }, 6000);
              }}
            >
              {t("Pay with your wallet")}
            </Web3Button>
              :
              <Web3Button
              contractAddress={process.env.POI_CONTRACT}
              contractAbi={abiPoi}
              className="buttonPrimary"
              action={async (contract: any) => {
             
              }}
              isDisabled
              onSuccess={() => {
                
              }}
            >
              {t("Pay with your wallett")}
            </Web3Button>
                }
          </div>
        </div>
        <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[280px] h-[320px] rounded-[20px] shadow-lg">
          {isModalOpenRegistration &&
            pathname === "/totalPayment" &&
            (isProcessingRegistration ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8 text-center">{t("REGISTRATION")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Registering User")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Registry")}</span>
                  </div>
                </div>
              </div>
            ) : isDeclinedRegistration ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={RechazedIcon} alt="Declined" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("REGISTRATION")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Registering User")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Registry")}</span>
                  </div>
                </div>
                <p className="mt-8 text-[18px] text-[#FF4C5A] text-center">{t("AN ERROR OCURRED!")}!</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <Image src={CheckDone} alt="Check done" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("REGISTRATION")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Registering User")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Successful Registry")}</span>
                  </div>
                </div>
                <p className="mt-8 text-[18px] text-[#20DABB] text-center">{t("DONE")}!</p>
              </div>
            ))}

          {isModalOpenNFTPurchase &&
            (isProcessingNFTPurchase ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8 text-center">{t("NFT PURCHASE")}</p>
                </div>
                <div className="mt-2">
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
            ) : isDeclinedNFTPurchase ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={RechazedIcon} alt="Declined" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("NFT PURCHASE")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Amount")}</span>
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
                <p className="mt-8 text-[18px] text-[#FF4C5A] text-center">{t("AN ERROR OCURRED!")}!</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <Image src={CheckDone} alt="Check done" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("NFT PURCHASE")}</p>
                </div>
                <div className="mt-2">
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
            ))}

          {isModalOpenMembership &&
            (isProcessingMembership ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8 text-center">{t("MEMBERSHIP PAYMENT")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Approving Amount")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Paying Membership")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Payment")}</span>
                  </div>
                </div>
              </div>
            ) : isDeclinedMembership ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={RechazedIcon} alt="Declined" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("MEMBERSHIP PAYMENT")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Amount")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Paying Membership")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
                    <span className="text-[16px] text-[#A9AEB4] ml-2">{t("Successful Payment")}</span>
                  </div>
                </div>
                <p className="mt-8 text-[18px] text-[#FF4C5A] text-center">{t("AN ERROR OCURRED!")}!</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <Image src={CheckDone} alt="Check done" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8">{t("MEMBERSHIP PAYMENT")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Approving Amount")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Paying Membership")}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Image src={CirclePurple} alt="Circle" width={16} height={16} />
                    <span className="text-[16px] text-[#7A2FF4] ml-2">{t("Successful Payment")}</span>
                  </div>
                </div>
                <p className="mt-8 text-[18px] text-[#20DABB] text-center">{t("DONE")}!</p>
              </div>
            ))}

          {isModalOpenStake &&
            (isProcessingStake ? (
              <div className="w-full h-full flex flex-col items-center justify-center px-1">
                <div className="flex flex-col items-center justify-center">
                  <Image src={ProcessingIcon} alt="processing" width={60} height={60} />
                  <p className="text-[14px] font-bold text-[#554D77] mt-8 text-center">{t("STAKE PAYMENT")}</p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border border-solid border-[#A9AEB4]"></div>
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
            ) : isDeclinedStake ? (
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
            ) : (
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
            ))}

          {isModalOpenApprovedRegistration && (
            <div className="w-full h-full flex flex-col items-center justify-center px-1">
              <div className="flex flex-col items-center justify-center">
                <Image src={RegisterCompletedImg} alt="" width={60} height={60} />
                {pathname === "/totalPayment" ? (
                  <>
                    <p className="text-[16px] text-[#554D77] mt-8 text-center">{t("Successful registration and payment!")}</p>
                    <p className="text-[16px] font-bold text-[#554D77] mt-1 text-center">{t("Welcome to Defily!")}</p>
                  </>
                ) : (
                  <p className="text-[16px] font-bold text-[#554D77] mt-[36px] text-center">{t("Successful Payment!")}</p>
                )}
              </div>
            </div>
          )}
        </ModalComponent>

        {pathname === "/totalPayment" ? <div className="container-down"></div> : null}
      </div>

  );
};

export default TotalPayment;
