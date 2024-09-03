import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "../styles/index.scss";
import { ThirdwebProvider } from "@thirdweb-dev/react";
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Create Next App",
  description: "Your Gateway to Desentralized Finance",
};

export const viewport: Viewport = {
  themeColor: "#7A2FF4",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  
  return (
    <html lang="en">

      <body id="root" className={montserrat.className}>{children}</body>
    </html>
  );
}
