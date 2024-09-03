"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { DataMembers, MembersInfo } from "./components/moskData";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserLevelStore } from "@/store/user-level";
import HeaderPages from "@/app/components/generals/HeaderPages";
import Image from "next/image";
import SearchIcon from "@/assets/icons/search.svg";
import ListIcon from "@/assets/icons/ListMyTeam.svg";
import TreeIcon from "@/assets/icons/TreeMyTeam.svg";
import Link from "next/link";
import SearchIn from "./components/SearchIn";
import ListView from "./components/ListView";
import TreeView from "./components/TreeView";
import { ThirdwebSDK } from "@thirdweb-dev/react";
import abiMembers from "./abis/abiMembers.json";
import { ethers } from "ethers";
import abiAccount from "@/abis/abiAccount.json";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";

interface Props {
  infoUserLevel: DataMembers[];
  type?: any;
}

const MyTeam = ({ type, infoUserLevel }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const { selectPlan, ...lvlStore } = useUserLevelStore();
  const [searchInput, setSearchInput] = useState<string>("");
  const search = useSearchParams().get("type");
  const [dataFiltered, setDataFiltered] = useState<DataMembers[]>(infoUserLevel);

  const buttomHandleSearch = () => {
    const searchParams = new URLSearchParams({ type });
    router.push(`/myTeam?${searchParams.toString()}`);
  };

  const [myTeam, setMyTeam] = useState({ status: false, data: [] });
  const idAccount = localStorage.getItem("idAccount");

  const buscarTeam = async () => {
    const sdk = new ThirdwebSDK(137);
    const contractAccount = await sdk.getContract(
      process.env.ACCOUNT_CONTRACT,
      abiAccount
    );
    let arrayTemporanl = [];
    for (let i = 1; i <= 20; i++) {
      let directVol = 0;
      let profit = 0;
      let missedProfit = 0;
      let payedProfit = 0;
      let gobalVol = 0;
      let profitGlobal = 0;
      let profitMissedGlobal = 0;
      let profitPayedGlobal = 0;
      if (i == 1) {
        const getDirectVolCount = await contractAccount.call(
          "getDirectVolCount",
          [idAccount]
        );
        for (let index = 0; index < parseInt(getDirectVolCount._hex, 16); index++) {
          const getDirectVolInfo = await contractAccount.call("getDirectVolInfo", [
            idAccount,
            index,
          ]);
          let getMissedProfit, getPayedProfit, getProfit;
          try {
            getProfit = await contractAccount.call("getProfit", [idAccount, 0]);
          } catch (error) {
            getProfit = { _hex: "0x0" }; // Default value
          }
          try {
            getMissedProfit = await contractAccount.call("getMissedProfit", [
              idAccount,
              0,
            ]);
          } catch (error) {
            getMissedProfit = { _hex: "0x0" }; // Default value
          }
          try {
            getPayedProfit = await contractAccount.call("getPayedProfit", [
              idAccount,
              0,
            ]);
          } catch (error) {
            getPayedProfit = { _hex: "0x0" }; // Default value
          }

          directVol =
            directVol +
            parseFloat(ethers.utils.formatUnits(getDirectVolInfo[1], 6)); //CAMBIO
          profit = parseFloat(ethers.utils.formatUnits(getProfit, 6)); //CAMBIO
          missedProfit = parseFloat(ethers.utils.formatUnits(getMissedProfit, 6)); //CAMBIO
          payedProfit = parseFloat(ethers.utils.formatUnits(getPayedProfit, 6)); //CAMBIO
        }
        console.log(directVol);
        console.log(profit);
        arrayTemporanl.push({
          total: directVol,
          recibido: profit,
          perdido: missedProfit,
          rebotado: payedProfit,
          cantidad: parseInt(getDirectVolCount._hex, 16),
        });
      } else {
        const getCantLevles = await contractAccount.call("getCantLevles", [
          idAccount,
        ]);
        for (let i = 1; i < parseInt(getCantLevles._hex, 16); i++) {
          const getCantPeronInLevel = await contractAccount.call(
            "getCantPeronInLevel",
            [idAccount, i]
          );
          console.log(
            "Para el nivel ",
            i + 1,
            " hay esta cantidad de personas: ",
            parseInt(getCantPeronInLevel._hex, 16)
          );
          gobalVol = 0;
          profitGlobal = 0;
          profitMissedGlobal = 0;
          profitPayedGlobal = 0;
          for (let x = 0; x < parseInt(getCantPeronInLevel._hex, 16); x++) {
            const getGlobalVolInfo = await contractAccount.call(
              "getGlobalVolInfo",
              [idAccount, i, x]
            );

            let getMissedProfit, getPayedProfit, getProfit;
            try {
              getProfit = await contractAccount.call("getProfit", [idAccount, i]);
            } catch (error) {
              getProfit = { _hex: "0x0" }; // Default value
            }
            try {
              getMissedProfit = await contractAccount.call("getMissedProfit", [
                idAccount,
                i,
              ]);
            } catch (error) {
              getMissedProfit = { _hex: "0x0" }; // Default value
            }
            try {
              getPayedProfit = await contractAccount.call("getPayedProfit", [
                idAccount,
                i,
              ]);
            } catch (error) {
              getPayedProfit = { _hex: "0x0" }; // Default value
            }

            gobalVol =
              gobalVol +
              parseFloat(ethers.utils.formatUnits(getGlobalVolInfo[1], 6)); //CAMBIO
            profitGlobal = parseFloat(ethers.utils.formatUnits(getProfit, 6)); //CAMBIO
            profitMissedGlobal = parseFloat(ethers.utils.formatUnits(getMissedProfit, 6)); //CAMBIO
            profitPayedGlobal = parseFloat(ethers.utils.formatUnits(getPayedProfit, 6)); //CAMBIO
          }
          arrayTemporanl.push({
            total: gobalVol,
            recibido: profitGlobal,
            perdido: missedProfit,
            rebotado: payedProfit,
            cantidad: parseInt(getCantPeronInLevel._hex, 16),
          });
        }
        break;
      }
    }

    setMyTeam({
      status: true,
      data: arrayTemporanl,
    });
  };

  const getRewardPercentage = (level) => {
    if (level === 1) return 20;
    if (level === 2) return 5;
    if (level === 3) return 3;
    if (level === 4 || level === 5) return 2;
    if (level >= 6 && level <= 16) return 1;
    if (level >= 17 && level <= 20) return 0.5;
    return 0; // default case
  };

  useEffect(() => {
    async function getDataServer() {}
    buscarTeam();
    getDataServer();
  }, []);

  const numberByPage = 5;
  const {
    currentPage,
    elemetsVisibleByPage,
    goToNextPage,
    goToPage,
    goToPreviousPage,
    totalPages,
  } = usePaginate({
    listElement: myTeam.data,
    numberByPage: numberByPage,
  });

  const filterByInput = useCallback(
    (value: string) => {
      setSearchInput(value);
      const findUserFilter: DataMembers[] = infoUserLevel.map(
        (item: DataMembers) => {
          const membersInfoAux: MembersInfo[] = item.membersInfo;
          const result: MembersInfo[] = membersInfoAux.filter(
            (nameInfo: MembersInfo) =>
              nameInfo.nameUser.toLowerCase().includes(value.toLowerCase())
          );

          return { ...item, membersInfo: result };
        }
      );
      setDataFiltered(findUserFilter);
    },
    [infoUserLevel]
  );

  useEffect(() => {
    filterByInput("");
  }, [filterByInput]);

  const getLevel = (level) => {
    if (level) {
      selectPlan(level);
      router.push(`/myTeam/levelMember/level?ActualLevel=${level}`);
    }
  };

  return (
    <div className="component-MyMembersTeam pb-[96px] min-h-screen bg-gradient-to-r from-[#0E0E33] to-[#39307B] text-white">
      <HeaderPages text={t("My Team")} />

      <div className={`mx-[24px] ${search === "search" ? "" : "flex items-center justify-between"}`}>
        <Link href={"/myTeam?type=search"} className="relative" onClick={buttomHandleSearch}>
          <input
            className={`pr-2 pl-8 py-3 rounded-[10px] bg-[#ffffff14] text-white text-[10px] font-bold focus:outline-none ${
              search === "search" ? "w-full" : "w-[105px]"
            } `}
            type="text"
            placeholder={`${t("Search")}...`}
            onChange={(e) => filterByInput(e.target.value)}
            value={searchInput}
          />
          <Image src={SearchIcon} alt="search" width={18} height={18} className="absolute top-1/2 left-2 -translate-y-1/2" />
        </Link>

        {search === "search" ? null : (
          <>
         {/*   <Link
              href={"/myTeam?type=listView"}
              onClick={buttomHandleSearch}
              className={`flex items-center p-2 cursor-pointer rounded-[10px]  ${
                search === "listView" ? "bg-[#7A2FF4] text-white" : "bg-[#F2F3F8] text-[#A9AEB4]"
              } w-[105px]`}
            >
              <Image src={ListIcon} alt="Icon" width={18} height={18} />
              <span className="text-[10px]  font-bold ml-2">{t("List view")}</span>
            </Link>

            <Link
              href={"/myTeam?type=treeView"}
              onClick={buttomHandleSearch}
              className={`flex items-center p-2 cursor-pointer rounded-[10px] ${
                search === "treeView" ? "bg-[#7A2FF4] text-white" : "bg-[#F2F3F8] text-[#A9AEB4]"
              } w-[105px]`}
            >
              <Image src={TreeIcon} alt="Icon" width={18} height={18} />
              <span className="text-[10px] font-bold ml-2">{t("Tree view")}</span>
            </Link>
            */}
          </>
        )}
      </div>

      {search === "search" ? (
        <SearchIn dataFiltered={dataFiltered} searchInput={searchInput} />
      ) : search === "listView" ? (
        <ListView />
      ) : search === "treeView" ? (
        <TreeView infoUserLevel={infoUserLevel} />
      ) : myTeam.status ? (
        <>
          <div className="mx-[24px] mt-10 rounded-2xl">
            {elemetsVisibleByPage.map((team, index) =>
           {
            const level = index + 1;
            const rewardPercentage = getRewardPercentage(level);
            const rewards = (team.total * rewardPercentage) / 100;
            return (
              <div className="container-levels border-solid border-b-[1px] border-[#612DFE] bg-[#ffffff1a] rounded-[16px] mb-4 " key={index}>
                <div className="bg-[#7A2FF4] rounded-t-[16px] px-4 py-3 flex justify-between items-center">
                  <div className="flex justify-start items-center">
                    <span className="text-[14px] font-bold text-white">{t("Level")}</span>
                    <p className="text-[#7A2FF4] text-[12px] font-bold w-6 h-6 py-1 px-2 bg-white rounded-[20px] ml-2 flex justify-center items-center">
                      {level}
                    </p>
                  </div>

                  <p className="text-[#AD98FF] text-[12px] font-bold cursor-pointer underline" onClick={() => getLevel(level)}>
                    {t("See more")}
                  </p>
                </div>
                <div className="p-4 ">
                  <div className="container-team text-[14px] flex items-center justify-between">
                    <p className="text-[#A9AEB4]">{t("Team")}</p>
                    <p className="text-white">{team.cantidad}</p>
                  </div>

                  <div className="container-total text-[14px] flex items-center justify-between my-[6px]">
                    <p className="text-[#A9AEB4]">{t("Total Sales")}</p>
                    <p className="text-white">${team.total}</p>
                  </div>
                  <div className="container-residual text-[14px] flex items-center justify-between">
                    <p className="text-[#A9AEB4]">{t("Rewards")} </p>
                    <p className="text-white">
                      <span className="text-[10px] font-bold mr-2 rounded-[20px] bg-[#ffffff1a] px-2 py-1">{rewardPercentage}%</span> ${team.recibido}
                    </p>
                  </div>
                  <div className="container-total text-[14px] flex items-center justify-between my-[6px]">
                    <p className="text-[#A9AEB4]">{t("Missed Reward")}</p>
                    <p className="text-white">${team.perdido}</p>
                  </div>
                  <div className="container-total text-[14px] flex items-center justify-between my-[6px]">
                    <p className="text-[#A9AEB4]">{t("Paid Rewards")}</p>
                    <p className="text-white">${team.rebotado}</p>
                  </div>
                </div>
              </div>
            )})}
          </div>
          <div className="flex justify-center mt-5 ">
            <Pagination
              currentPage={currentPage}
              goToNextPage={goToNextPage}
              goToPage={goToPage}
              goToPreviousPage={goToPreviousPage}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : (
        <center className="mt-4">{t("Loading")}...</center>
      )}
    </div>
  );
};

export default MyTeam;
