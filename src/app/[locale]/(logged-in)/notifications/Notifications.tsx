"use client";
import { MessagesNotifications } from "./components/moskData";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import { ethers } from "ethers";
import Image from "next/image";
import Navbar from "@/app/components/generals/Navbar";
import NotificationActive from "@/assets/icons/notificationsActive.svg";
import NotificationInActive from "@/assets/icons/notificationsInactive.svg";
import { useAddress } from "@thirdweb-dev/react";

const Notifications = () => {
  const t = useTranslations();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const walletAddress = urlParams.get("walletAddress");
        if (!walletAddress) {
          throw new Error("Wallet address not found in URL parameters");
        }

        const contractAddress = "0x39F3D9F347db5f43d096826728e6B147f153C4Bb"; // Dirección del contrato
        const targetFunctionName =
          "buyMembership(uint256 _tokenIndex,uint256 _planId,uint256 _cycles)";

        const apiKey = "AABG8TZX1JPB9JJMFFPF42IBYSC6PI1ED8"; // Reemplaza con tu clave API de BscScan

        const response = await axios.get(
          `https://api.polygonscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
        );

        const transactions = response.data.result
          .filter(
            (tx) =>
              tx.to.toLowerCase() === contractAddress.toLowerCase() &&
              tx.functionName === targetFunctionName
          )
          .map((tx, index) => {
            const timestamp = parseInt(tx.timeStamp);
            const date = new Date(timestamp * 1000); // Multiplica por 1000 para convertir a milisegundos
            return {
              id: index + 1,
              type: "Buy Membership",
              date: date.toLocaleDateString(),
              time: date.toLocaleTimeString(),
              amount: ethers.utils.formatEther(tx.value), // Convertir de Wei a BNB
              amountFee: ethers.utils.formatEther(
                (tx.gasUsed * tx.gasPrice).toString()
              ), // Convertir de Wei a BNB
            };
          });

        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="header-notifications rounded-b-[40px] p-6 bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
        <Navbar text={t("Notifications")} />
      </div>
      <div className="mx-6 mt-6 mb-24">
        {loading ? (
          <div>{t("Loading")}...</div>
        ) : (
          <div>
            {transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <div
                  key={tx.id}
                  className="p-4 flex items-center border-b border-solid border-[#F2F3F8]"
                >
                  <div
                    className={`p-2 w-[34px] h-[31px] rounded-full mr-4 flex items-center ${
                      tx.isRead ? "bg-[#A9AEB4]" : "bg-[#20DABB]"
                    }`}
                  >
                    {tx.isRead === false ? (
                      <Image src={NotificationActive} alt="notification" />
                    ) : (
                      <>
                        <Image src={NotificationInActive} alt="notification" />
                      </>
                    )}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#554D77] mb-2">
                      {tx.type}
                    </p>
                    <p
                      style={{ display: "inline-block", marginRight: "10px" }}
                      className="text-[10px] text-[#A9AEB4]"
                    >
                      {tx.date}
                    </p>
                    <p
                      style={{ display: "inline-block" }}
                      className="text-[10px] text-[#A9AEB4]"
                    >
                      {tx.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-[18px] font-bold text-[#554D77] text-center">
                {t("No new transactions")}
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
