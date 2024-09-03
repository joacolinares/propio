"use client"
import SelectMembership from "./SelectMembership";

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



const ShowSelectMembership = () => {
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

            <SelectMembership />

      </>
    );
  };
  
  export default ShowSelectMembership;
  