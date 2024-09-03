"use client";
import React, { useEffect } from "react";
import "./buttonStyle.css";
import { ConnectWallet, ThirdwebSDK, useAddress,useChainId,darkTheme } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";

import abiAccount from "@/abis/abiAccount.json";
import abiMember from "@/abis/abiMembers.json";
import abiPoi from '@/abis/abiPoi.json'
import { useDisconnect} from "@thirdweb-dev/react";


const ConnectButton = () => {
  const router = useRouter();
  const wallet = useAddress();
  const chainId = useChainId();
  console.log(chainId)
  const searchPosition = async () => { //Buscar la posiciion que se quedo el cliente
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract( process.env.POI_CONTRACT,abiPoi);
    const personalDataMap = await contract.call("personalDataMap", [wallet]); //Obtiene la informacion de la wallet
    console.log(personalDataMap)
    if (personalDataMap.encryptedEmail == "") { //Si no tiene email en POI significa que se quedo en alguna parte sea en registro, nft, membresia o stake
      const currentUrl = window.location.href;
      const queryStringIndex = currentUrl.indexOf("?");
      console.log(personalDataMap.encryptedEmail)
        const step1 = localStorage.getItem("step1");

        if (step1 === null || step1 === "") {
          const currentUrl = window.location.href;
          const queryStringIndex = currentUrl.indexOf("?");
          if (queryStringIndex !== -1) {
            const queryString = currentUrl.slice(queryStringIndex + 1);
            const params = new URLSearchParams(queryString);
            const referral = params.get("referral"); //Obtiene el referido
            const userRegister = await contract.call("userRegister", [wallet]);
            if(userRegister){
              console.log("ERROR no esta registrado pero tiene la variable userRegister")
            }else{
              if (referral) {
                router.push(
                  `/register?referral=${referral}` //Si tiene codigo de referido lo manda a pagar el POI con ese codigo
                );
              } else {
                router.push(`/register?referral=0`); //Si no tiene referido lo manda a pagar con la wallet master
              }
            } 
          }else {
            const userRegister = await contract.call("userRegister", [wallet]); 
            if(userRegister){
              console.log("ERROR no esta registrado pero tiene la variable")
              }else{
                  router.push(`/register?referral=0`); //Si no tiene referido lo manda a pagar con la wallet master
              } 
          }
        } else{ //Ya se registro
          router.push(`/purchaseNft?referral=0`);
        }

       
    } 
    else {//Si ya esta registrado y pago POI sigue por aca
      const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT,abiAccount);
      const contractMember = await sdk.getContract(process.env.MEMBERS_CONTRACT,abiMember);

      const hasExecuted = await contractMember.call("hasExecuted", [wallet]); //Verifica si alguna vez esta wallet comrpo membresia
      const balanceOf = await contractAccount.call("balanceOf", [wallet]); //Verifica si alguna vez esta wallet comrpo membresia
      console.log(balanceOf )
      if(hasExecuted || parseInt(balanceOf._hex,16) >= 1) {
        const arrayInfo = await contractAccount.call("arrayInfo", [wallet,0]);
        const hexValue = typeof arrayInfo._hex === 'number' ? arrayInfo._hex : parseInt(arrayInfo._hex, 16);
        localStorage.setItem("idAccount", hexValue);
        router.push(`/dashboard`); //Si la compro lo manda a dashboard con el idAccount main
      }else{
        console.log("No compro la membresia")
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const referral = urlParams.get('referral'); //Si nunca compro membresia lo manda a comprar y si tiene codigo de referidos con su codigo y sino sin
          console.log(referral)
          if (referral) {
            console.log("Tiene codigo")
            router.push(
              `/membership?referral=${referral}`
            );
          } else {
            console.log("No tiene")
            router.push(`/membership?referral=0`);
          }
      }
    }
  };


  const searchPosition2 = async () => { //Buscar la posiciion que se quedo el cliente
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract( process.env.POI_CONTRACT,abiPoi);
    const personalDataMap = await contract.call("personalDataMap", [wallet]); //Obtiene la informacion de la wallet
    console.log(personalDataMap)
    if (personalDataMap.encryptedEmail == "") { //Si no tiene email en POI significa que se quedo en alguna parte sea en registro, nft, membresia o stake
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const referral = urlParams.get('referral'); 
       console.log("Si no tiene email en POI significa que se quedo en alguna parte sea en registro, nft, membresia o stake")
       const step1 = localStorage.getItem("step1");
       const nftConfirm = localStorage.getItem("nftConfirm");
       const membershipSelected = localStorage.getItem("membershipSelected");
       const totalStaking = localStorage.getItem("totalStaking");
       console.log(nftConfirm)
        if (step1 === null || step1 === "") {
          console.log("No tiene paso registro completado")
          if (referral) {
            router.push(`/register?referral=${referral}`);
          } else {
            router.push(`/register?referral=0`); 
          }
        }else if(nftConfirm === null || nftConfirm === ""){
          console.log("No selecciono NFT")
          if (referral) {
            router.push(`/purchaseNft?referral=${referral}`);
          } else {
            router.push(`/purchaseNft?referral=0`); 
          }
        }else if(membershipSelected === null || membershipSelected === ""){
          console.log("No compro membresia")
          if (referral) {
            router.push(`/membership?referral=${referral}`);
          } else {
            router.push(`/membership?referral=0`); 
          }
        }else if(totalStaking === null || totalStaking === ""){
          console.log("No hizo stake")
          if (referral) {
            router.push(`/staking?referral=${referral}`);
          } else {
            router.push(`/staking?referral=0`); 
          }
        }else if(totalStaking != null || totalStaking != ""){
          console.log("Hizo stake pero no presiono el boton")
          if (referral) {
            router.push(`/totalPayment?referral=${referral}`);
          } else {
            router.push(`/totalPayment?referral=0`); 
          }
        }
    } 
    else {//Si ya esta registrado y pago POI sigue por aca
      const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT,abiAccount);
      const contractMember = await sdk.getContract(process.env.MEMBERS_CONTRACT,abiMember);

      const hasExecuted = await contractMember.call("hasExecuted", [wallet]); //Verifica si alguna vez esta wallet comrpo membresia
      const balanceOf = await contractAccount.call("balanceOf", [wallet]); //Verifica si alguna vez esta wallet comrpo membresia
      console.log(balanceOf)
      if(hasExecuted || parseInt(balanceOf._hex,16) >= 1) {
        const arrayInfo = await contractAccount.call("arrayInfo", [wallet,0]);
        const hexValue = typeof arrayInfo._hex === 'number' ? arrayInfo._hex : parseInt(arrayInfo._hex, 16);
        localStorage.setItem("idAccount", hexValue);
        router.push(`/dashboard`); //Si la compro lo manda a dashboard con el idAccount main
      }else{ //Se registro pero en algun momento del proceso abandono
          console.log("Se registro pero en algun momento del proceso abandono")
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const referral = urlParams.get('referral'); //Si nunca compro membresia lo manda a comprar y si tiene codigo de referidos con su codigo y sino sin
          console.log(referral)
          if (referral) {
            console.log("Tiene codigo")
            router.push(`/totalPayment?referral=${referral}`);
          } else {
            console.log("No tiene")
            router.push(`/totalPayment?referral=0`);
          }
      }
    }
  };

  useEffect(() => {
    if (wallet != undefined) {
      localStorage.setItem("wallet", wallet);
      searchPosition2();
    }
  }, [wallet]);

  return (
    <div>
      <ConnectWallet
      
      theme={darkTheme({
        colors: {
          modalBg: "#0E0E33",
          accentText: "#9D87F6",
          accentButtonBg: "#9D87F6",
          primaryText: "#FFFFFF",
          secondaryText: "#F2F3F8",
          primaryButtonBg: "#004BC6",
          primaryButtonText: "#F2F3F8",
          connectedButtonBg: "#004BC6",
          connectedButtonBgHover: "#9D87F6",
          walletSelectorButtonHoverBg:
            "#612DFE",
          secondaryButtonBg: "#9D87F6",
        },
      })}

      termsOfServiceUrl= "https://defily.ai/terms"
      privacyPolicyUrl="https://defily.ai/policy"

      modalTitleIconUrl="https://dapp.defily.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoInitial.eee4a987.gif&w=128&q=75"

      btnTitle="Connect Wallet" 

      modalTitle="DeFily Wallet"

      className="buttonPrimary" 

      showThirdwebBranding={false}  />
    </div>
  );
};

export default ConnectButton;