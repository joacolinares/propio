"use client"
import TotalPayment from "./TotalPayment";

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



const ShowTotalPayment = () => {
  
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
      <>

            <TotalPayment />

      </>
    );
  };
  
  export default ShowTotalPayment;
  