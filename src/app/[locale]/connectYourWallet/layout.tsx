import { Metadata } from "next";
import Image from "next/image";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Connect Your Wallet - Defily",
  };

export default async function RegisterLayout({ children }: Props) {
  return (
    <div className="layout-connect">
          <div className="container-up">
        <div className="container-logo">
          <Image
            src={LogoPeq}
            alt="logo"
            width={28}
            height={24}
          />
        </div>
      </div>
   {children}
      <div className="container-down"></div>
     
   
    </div>
  );
}