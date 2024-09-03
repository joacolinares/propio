"use client";

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
    useChainId
  } from '@thirdweb-dev/react'
  import { Polygon } from "@thirdweb-dev/chains";

interface Props {
  children: React.ReactNode;
}

export default function LayoutThirdweb({ children }: Props) {


    console.log("MENSAJE PRUEBA")
    const smartWalletConfig = {
      factoryAddress: '0x15C8D84d83D02BBDe62018105955f896652f2AAd',
      gasless: true // true si queres que la app cubra los gastos de gas. Debe estar fondeado en dashboard de thirdweb
    };
    const cocayWallet = smartWallet(
      embeddedWallet({ recommended: true }),
      smartWalletConfig
    );
    cocayWallet.meta.name = "Defily Wallet";


  return (
    <ThirdwebProvider
    // activeChain={137}
    activeChain={Polygon}
    clientId={process.env.CLIENT_ID}
    supportedWallets={[
     // coinbaseWallet(),
      walletConnect(),
      metamaskWallet(),
      cocayWallet,
     // trustWallet(),
     // rainbowWallet(),
     // zerionWallet(),
     // phantomWallet()
    ]}

  >{children}</ThirdwebProvider>


  );
}
