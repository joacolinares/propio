"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import axios from "axios";
import { ethers } from "ethers";
import abiMembers from '@/abis/abiMembers.json';

import { ThirdwebSDK } from "@thirdweb-dev/react";
import abiClaim from "@/abis/abiClaim.json";
import { dataHistoryMock } from "./moskData";
import ModalComponent from "@/app/components/generals/ModalComponent";
import DolarModal from "@/assets/imgs/dolarModalHistory.png";
import Image from "next/image";
import IconCloseSVG from "@/assets/icons/closeHistory.svg";
import ArrowCircle from "@/assets/icons/arrowCircleHistoryModal.svg";
import Link from "next/link";
import IconArrow from "@/assets/icons/historyDropdown.svg";

interface DataHistory {
  id: number;
  type: string;
  date: string;
  time: string;
  amount: string;
  amountFee: string;
  status: string;
  perfomanceFee: number;
  total: string;
  hash: string;
  confirmation: number;
  block: string;
}

const History = ({ isDashboard }: any) => {
  const t = useTranslations();
  const router = useRouter();

  const [data, setData] = useState<DataHistory[]>([]);

  const [dataHistoryInicial, setDataHistoryInicial] = useState<DataHistory[]>([]);
  const [dataHistoryFiltered, setDataHistoryFiltered] = useState<DataHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historySelected, setHistorySelected] = useState<DataHistory | null>(null);

  const listToDisplay = [
    {
      keyStatic: "All Transactions",
      keyTranslate: t("All Transactions"),
    },
    {
      keyStatic: "Claim",
      keyTranslate: t("Claim"),
    },
    {
      keyStatic: "Stake",
      keyTranslate: t("Stake"),
    },
    {
      keyStatic: "Un-Stake",
      keyTranslate: t("Un-Stake"),
    },
    {
      keyStatic: "Profit",
      keyTranslate: t("Profit"),
    },
  ];

  const listToDisplayWithOutAllTransactions = [
    {
      keyStatic: "Claim",
      keyTranslate: t("Claim"),
    },
    {
      keyStatic: "Stake",
      keyTranslate: t("Stake"),
    },
    {
      keyStatic: "Un-Stake",
      keyTranslate: t("Un-Stake"),
    },
    {
      keyStatic: "Profit",
      keyTranslate: t("Profit"),
    },
  ];

  const [typeTransaction, setTypeTransaction] = useState(listToDisplayWithOutAllTransactions);
  const [isOpenTypeTransaction, setIsOpenTypeTransaction] = useState(false);

  const contractAddress = "0x39F3D9F347db5f43d096826728e6B147f153C4Bb"; // Dirección del contrato
  const targetFunctionName = "buyMembership(uint256 _tokenIndex,uint256 _planId,uint256 _cycles)"; // Nombre de la función objetivo

  const submenuRef = useRef(null);

  const NUMBER_BY_PAGE = 10;
  const { currentPage, elemetsVisibleByPage, goToNextPage, goToPage, goToPreviousPage, totalPages } = usePaginate({
    listElement: data,
    numberByPage: NUMBER_BY_PAGE,
  });

  const getElementsToShow = () => {
    if (!isDashboard) {
      return elemetsVisibleByPage;
    } else {
      return elemetsVisibleByPage.filter((_, index) => index < 8);
    }
  };

  const convertTimestamp = (utcSeconds: number): Date => {
    const d = new Date(0); // The 0 there sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d;
  };



  const idAccount = localStorage.getItem("idAccount");
  const wallet = localStorage.getItem("wallet");
  const walletAddress = wallet; // Dirección de la wallet
  const poiContract = process.env.POI_CONTRACT; // Dirección de la wallet
  const accountContract = process.env.ACCOUNT_CONTRACT; // Dirección de la wallet
  const claimContract = process.env.CLAIM_CONTRACT; // Dirección de la wallet
  const memberContract = process.env.MEMBERS_CONTRACT; // Dirección de la wallet
  const apiKey = process.env.API_BSC; // Tu clave API de BscScan

  const iface = new ethers.utils.Interface(abiMembers);
  const ifaceClaim = new ethers.utils.Interface(abiClaim);

  const infoMember = async(id) => {
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
    const memberships = await contract.call("memberships", [id]);
    return ethers.utils.formatUnits(memberships.membershipAmount._hex, 6); //CAMBIO
  };

  const infoStaking = async(nftUse,index) => {
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);
    console.log(nftUse);
    console.log(index);
    const memberships = await contract.call("getInfoOfMembership", [nftUse, index]);
    console.log(memberships);
    return parseInt(memberships.memberId._hex, 16);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.polygonscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
        );
        console.log(response)
        const transactions = await Promise.all(
          response.data.result
            .filter(
              (tx) =>
                tx.from.toLowerCase() === walletAddress.toLowerCase() &&
                tx.to.toLowerCase() === claimContract.toLowerCase() &&
                ifaceClaim.parseTransaction({ data: tx.input }).name === "stake" &&
                parseInt(ifaceClaim.parseTransaction({ data: tx.input }).args._nftUse._hex, 16) == parseInt(idAccount)
            )
            .map(async (tx, index) => {
              //const decodedInput = iface.parseTransaction({ data: tx.input });
              console.log(tx);
              const timestamp = parseInt(tx.timeStamp);
              const date = convertTimestamp(timestamp);
              const decodedInput = ifaceClaim.parseTransaction({ data: tx.input });
              console.log(decodedInput);
              const _nftUse = parseInt(decodedInput.args._nftUse._hex, 16);
              const _index = parseInt(decodedInput.args._index._hex, 16);
              const idMembresia = await infoStaking(_nftUse, _index);
              let fee = false;
              if (idMembresia == 2 || idMembresia == 3) {
                fee = true;
              }
              const amount = ethers.utils.formatUnits(ethers.BigNumber.from(decodedInput.args._amount._hex), 6); //CAMBIO
              console.log(amount);
              return {
                id: index + 1,
                type: "Stake",
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
                amount: parseInt(amount), //CAMBIO
                timestamp: timestamp,
                performanceFee: fee,
                hash: tx.hash
              };
            })
        );

        const responseMember = await axios.get(
          `https://api.polygonscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
        );

        const transactionsMember = await Promise.all(
          responseMember.data.result
            .filter(
              (tx) =>
                tx.from.toLowerCase() === walletAddress.toLowerCase() &&
                tx.to.toLowerCase() === memberContract.toLowerCase() &&
                iface.parseTransaction({ data: tx.input }).name === "buyMembership" &&
                parseInt(iface.parseTransaction({ data: tx.input }).args._nftUse._hex, 16) == parseInt(idAccount)
            )
            .map(async (tx, index) => {
              console.log(tx)
              const decodedInput = iface.parseTransaction({ data: tx.input });
              const timestamp = parseInt(tx.timeStamp);
              const date = convertTimestamp(timestamp);
              const amount = await infoMember(parseInt(decodedInput.args._membershipId._hex, 16));
              return {
                id: transactions.length + index + 1,
                type: "Buy Membership",
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString(),
                amount, //CAMBIO
                timestamp: timestamp,
                hash: tx.hash
              };
            })
        );


      /*  const getEvents = async() => {
          const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
          const contractAddress = poiContract;
          const abi = [ // ABI del contrato
            "event PersonalInfoStored(address indexed user)"
          ];
          
          const contract = new ethers.Contract(contractAddress, abi, provider);
        
          // Obtener eventos desde un bloque específico
          const fromBlock = 1000; // Especificar un bloque de inicio
          const toBlock = "latest"; // O puedes usar un bloque específico
        
          const events = await contract.queryFilter("PersonalInfoStored", fromBlock, toBlock);
          console.log(events)
          events.forEach(event => {
            console.log("Evento encontrado:", event.args.user);
          });
        }

        getEvents()
*/



  //Creacion de usuario POI
  const getEvents = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
    const contractAddress = poiContract;
    const abi = [ // ABI del contrato
      "event PersonalInfoStored(address indexed user)"
    ];

    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Obtener eventos desde un bloque específico
    const fromBlock = 0; // Especificar un bloque de inicio
    const toBlock = "latest"; // O puedes usar un bloque específico

    const events = await contract.queryFilter("PersonalInfoStored", fromBlock, toBlock);

    // Filtrar eventos donde el usuario sea igual a la wallet
    const filteredEvents = events.filter(event => event.args.user.toLowerCase() === wallet.toLowerCase());

    // Procesar los eventos y mapearlos a la estructura de DataHistory
    const eventTransactions = await Promise.all(
      filteredEvents.map(async (event, index) => {
        const block = await provider.getBlock(event.blockNumber); // Obtener el bloque para obtener la fecha
        const timestamp = new Date(block.timestamp * 1000); // Convertir el timestamp a milisegundos
        const date = timestamp.toLocaleDateString();
        const time = timestamp.toLocaleTimeString();

        return {
          id: transactions.length + transactionsMember.length + index + 1,
          type: "Personal Info Stored",
          date: date,
          time: time,
          amount: false, // O algún otro valor relevante si aplica
          amountFee: false, // O algún otro valor relevante si aplica
          status: "Successful",
          perfomanceFee: 0,
          total: false, // O algún otro valor relevante si aplica
          hash: event.transactionHash,
          confirmation: 0, // Depende de si quieres manejar confirmaciones aquí
          block: event.blockNumber.toString(),
        };
      })
    );

  return eventTransactions;
  };


    const creationAccountPoi = await getEvents();



    const getEvents2 = async () => {
      const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
      const contractAddress = poiContract;
      const abi = [ // ABI del contrato
        "event PersonalInfoUpdated(address indexed user)"
      ];
  
      const contract = new ethers.Contract(contractAddress, abi, provider);
  
      // Obtener eventos desde un bloque específico
      const fromBlock = 0; // Especificar un bloque de inicio
      const toBlock = "latest"; // O puedes usar un bloque específico
  
      const events = await contract.queryFilter("PersonalInfoUpdated", fromBlock, toBlock);
  
      // Filtrar eventos donde el usuario sea igual a la wallet
      const filteredEvents = events.filter(event => event.args.user.toLowerCase() === wallet.toLowerCase());
  
      // Procesar los eventos y mapearlos a la estructura de DataHistory
      const eventTransactions = await Promise.all(
        filteredEvents.map(async (event, index) => {
          const block = await provider.getBlock(event.blockNumber); // Obtener el bloque para obtener la fecha
          const timestamp = new Date(block.timestamp * 1000); // Convertir el timestamp a milisegundos
          const date = timestamp.toLocaleDateString();
          const time = timestamp.toLocaleTimeString();
  
          return {
            id: transactions.length + transactionsMember.length + index + 1,
            type: "Personal Info Update",
            date: date,
            time: time,
            amount: false, // O algún otro valor relevante si aplica
            amountFee: false, // O algún otro valor relevante si aplica
            status: "Successful",
            perfomanceFee: 0,
            total: false, // O algún otro valor relevante si aplica
            hash: event.transactionHash,
            confirmation: 0, // Depende de si quieres manejar confirmaciones aquí
            block: event.blockNumber.toString(),
          };
        })
      );
  
    return eventTransactions;
    };

    const editAccountPoi = await getEvents2();


    const getEvents3 = async () => {
      const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
      const contractAddress = poiContract;
      const abi = [ // ABI del contrato
        "event ImageLinkUpdated(address indexed user, string imageLink)"
      ];
  
      const contract = new ethers.Contract(contractAddress, abi, provider);
  
      // Obtener eventos desde un bloque específico
      const fromBlock = 0; // Especificar un bloque de inicio
      const toBlock = "latest"; // O puedes usar un bloque específico
  
      const events = await contract.queryFilter("ImageLinkUpdated", fromBlock, toBlock);
  
      // Filtrar eventos donde el usuario sea igual a la wallet
      const filteredEvents = events.filter(event => event.args.user.toLowerCase() === wallet.toLowerCase());
  
      // Procesar los eventos y mapearlos a la estructura de DataHistory
      const eventTransactions = await Promise.all(
        filteredEvents.map(async (event, index) => {
          const block = await provider.getBlock(event.blockNumber); // Obtener el bloque para obtener la fecha
          const timestamp = new Date(block.timestamp * 1000); // Convertir el timestamp a milisegundos
          const date = timestamp.toLocaleDateString();
          const time = timestamp.toLocaleTimeString();
  
          return {
            id: transactions.length + transactionsMember.length + index + 1,
            type: "Profil Image Update",
            date: date,
            time: time,
            amount: false, // O algún otro valor relevante si aplica
            amountFee: false, // O algún otro valor relevante si aplica
            status: "Successful",
            perfomanceFee: 0,
            total: false, // O algún otro valor relevante si aplica
            hash: event.transactionHash,
            confirmation: 0, // Depende de si quieres manejar confirmaciones aquí
            block: event.blockNumber.toString(),
          };
        })
      );
  
    return eventTransactions;
    };
  
    const imgUpdatePoi = await getEvents3();


    const getEvents4 = async () => {
      const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
      const contractAddress = accountContract;
      const abi = [ // ABI del contrato
        "event AccountCreated(uint256 indexed tokenId, string accountName, address user, uint256 sponsor, uint256 nftNumber)"
      ];
  
      const contract = new ethers.Contract(contractAddress, abi, provider);
  
      // Obtener eventos desde un bloque específico
      const fromBlock = 0; // Especificar un bloque de inicio
      const toBlock = "latest"; // O puedes usar un bloque específico
  
      const events = await contract.queryFilter("AccountCreated", fromBlock, toBlock);
  
      // Filtrar eventos donde el usuario sea igual a la wallet
      const filteredEvents = events.filter(event => event.args.user.toLowerCase() === wallet.toLowerCase());
  
      // Procesar los eventos y mapearlos a la estructura de DataHistory
      const eventTransactions = await Promise.all(
        filteredEvents.map(async (event, index) => {
          const block = await provider.getBlock(event.blockNumber); // Obtener el bloque para obtener la fecha
          const timestamp = new Date(block.timestamp * 1000); // Convertir el timestamp a milisegundos
          const date = timestamp.toLocaleDateString();
          const time = timestamp.toLocaleTimeString();
  
          return {
            id: transactions.length + transactionsMember.length + index + 1,
            type: "Create NFT",
            date: date,
            time: time,
            amount: false, // O algún otro valor relevante si aplica
            amountFee: false, // O algún otro valor relevante si aplica
            status: "Successful",
            perfomanceFee: 0,
            total: false, // O algún otro valor relevante si aplica
            hash: event.transactionHash,
            confirmation: 0, // Depende de si quieres manejar confirmaciones aquí
            block: event.blockNumber.toString(),
          };
        })
      );
  
    return eventTransactions;
    };
  
    const creatNftAccount = await getEvents4();



        const allTransactions = [...creationAccountPoi, ...transactions, ...transactionsMember, ...editAccountPoi, ...imgUpdatePoi, ...creatNftAccount];
        allTransactions.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`).getTime();
          const dateB = new Date(`${b.date} ${b.time}`).getTime();
          return dateB - dateA;
        });
        console.log(allTransactions);
        setData(allTransactions);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        setLoading(false);
      }
    };
    setDataHistoryInicial(dataHistoryMock);
    fetchData();
  }, []);

  useEffect(() => {
    let filterAccumulator = [];

    if (typeTransaction.length === 4) {
      filterAccumulator = dataHistoryInicial;
    }
    const auxTypeTransactions = typeTransaction.map((transaction) => transaction.keyStatic);
    filterAccumulator = dataHistoryInicial?.filter((item) => auxTypeTransactions.includes(item.type));

    setDataHistoryFiltered(filterAccumulator);
  }, [typeTransaction, dataHistoryInicial]);

  if (loading) {
    return <div className="text-center text-white text-[18px]">{t("Loading")}...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  const handleButtonMoreDetails = (historySelect: DataHistory) => {
    console.log(historySelect)
    setHistorySelected(historySelect);
    setIsModalOpen(true);
  };

  function selectTypeOptionsTrans(_typeTransaction) {
    if (_typeTransaction === "All Transactions") {
      if (typeTransaction.length === 4) setTypeTransaction([]);
      else setTypeTransaction(listToDisplayWithOutAllTransactions);
      return;
    }

    if (typeTransaction.some((item) => item.keyStatic === _typeTransaction) && _typeTransaction !== "All Transactions") {
      setTypeTransaction(typeTransaction.filter((item) => item.keyStatic !== _typeTransaction));
    } else {
      const selectedTypeTrans = listToDisplayWithOutAllTransactions.find((item) => item.keyStatic === _typeTransaction);
      if (selectedTypeTrans) {
        setTypeTransaction([...typeTransaction, selectedTypeTrans]);
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <>
      {!isDashboard ? <HeaderPages text={t("History")} /> : null}

      <div
        className={`${
          isDashboard
            ? "px-[24px] pt-[32px] pb-[96px] rounded-t-[40px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]"
            : "px-[24px] min-h-[calc(100vh-200px)]"
        }`}
      >
        {isDashboard ? (
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-[20px] text-white  font-bold">{t("History")}</h1>
              <div>
                <ButtonPrimary text={t("See More")} onClickFn={() => router.push("/history")} />
              </div>
            </div>
            <p className="text-white mt-2 text-[14px] font-normal">{`Showing the last ${elemetsVisibleByPage.length} transactions`}</p>
          </div>
        ) : (
          <div
            className={`container-selectOpt mb-4 w-3/5 mx-auto bg-white rounded-t-[5px] text-[14px] text-[#1E0E39] p-2 relative border border-solid border-[#F2F3F8] cursor-pointer 
            ${isOpenTypeTransaction ? "rounded-b-0" : "rounded-b-[5px]"}`}
            ref={submenuRef}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                setIsOpenTypeTransaction(!isOpenTypeTransaction);
              }}
            >
              {t("All Transactions")}{" "}
              <div className={`ml-6 ${isOpenTypeTransaction ? "rotate-180" : ""}`}>
                <Image src={IconArrow} alt="flecha" width={10} height={10} />
              </div>
            </div>
            <div className={isOpenTypeTransaction ? "absolute z-30 bg-white w-full -left-0 top-7" : "hidden"}>
              {listToDisplay.map((graphs, index) => {
                return (
                  <label key={graphs.keyStatic} className="block ml-1 cursor-pointer border-b border-solid border-[#F2F3F8] py-2">
                    <input
                      className="w-[12px] h-[12px] mx-1 cursor-pointer"
                      type="checkbox"
                      checked={typeTransaction.length === 4 ? true : typeTransaction.map((item) => item.keyStatic).includes(graphs.keyStatic)}
                      onChange={() => {
                        selectTypeOptionsTrans(graphs.keyStatic);
                      }}
                    />
                    {graphs.keyTranslate}
                  </label>
                );
              })}
            </div>
          </div>
        )}
        {elemetsVisibleByPage.length > 0 ? (
          <>
            {elemetsVisibleByPage.length > 0 ? (
              <div className="component-transactions">
                {getElementsToShow().map((history) =>
                  isDashboard ? (
                    <div key={history.id} className="container-map">
                      <div className="container-type">
                        <p>{history.type}</p>
                        <span>{history.date} </span>
                        <span>{history.time}</span>
                      </div>
                      <div className="container-amount">
                      {typeof history.amount !== 'boolean' && <p>$ {history.amount}</p>}
                       {/* <span>
                          +${history.amountFee} {t("Fee")}
                        </span>*/}
                      </div>
                    </div>
                  ) : (
                    <div key={history.id} className="container-map flex flex-col items-center">
                      <div className="p-1 rounded-[100px] border border-solid border-[#ffffff1a] w-4/5 flex justify-between items-center mx-auto mb-1">
                        <div className="py-[2px] px-2 rounded-[20px] border border-solid border-[#ffffff1a]">
                          <p className="text-white font-bold text-[10px] text-center">
                            {t("ID")} {history.id}
                          </p>
                        </div>
                        <p className="text-white font-bold text-[14px]">{history.type}</p>
                        <div className="text-[#A9AEB4] text-[12px]">
                          <span>{history.date} </span>
                          <span>{history.time}</span>
                        </div>
                      </div>
                      <div className="my-2 w-full">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[#A9AEB4] text-[14px] ">{t("Status")}</p>
                          <p className="text-white text-[14px] ">Successful</p>
                        </div>
                        {typeof history.amount !== 'boolean' && (
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-[#A9AEB4] text-[14px] ">{t("Amount")}</p>
                            <p className="text-white text-[14px] ">${history.amount}</p>
                          </div>
                        )}
                        {history.type === "Stake" && history.perfomanceFee && (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-[#A9AEB4] text-[14px] ">{t("Performance Fee")}</p>
                              <p className="text-white text-[14px] ">${history.perfomanceFee}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-[#A9AEB4] text-[14px] ">{t("Total")}</p>
                              <p className="text-white text-[14px] ">${history.total}</p>
                            </div>
                          </>
                        )}
                      </div>
                      <button
                        className="text-[#20DABB] text-[12px] font-bold underline cursor-pointer"
                        onClick={() => handleButtonMoreDetails(history)}
                      >
                        {t("MORE DETAILS")}
                      </button>
                    </div>
                  )
                )}
                <ModalComponent isOpen={isModalOpen} setIsOpen={setIsModalOpen} classBody="bg-white w-[320px] h-auto rounded-xl">
                  <div className="container-modal">
                    <div className="container-icon-close cursor-pointer w-6 float-right pt-2" onClick={() => setIsModalOpen(false)}>
                      <Image src={IconCloseSVG} alt="Close Icon" width={20} height={20} />
                    </div>

                    <div className="p-6">
                      <div className="flex flex-col items-center mb-4">
                        <Image src={DolarModal} alt="Dolar Image" width={50} height={50} />
                        {typeof historySelected?.amount !== 'boolean' && (
                          <p className="my-2 text-[#1E0E39] text-[24px] font-bold">${historySelected?.amount}</p>
                        )}
                        <p className="text-[#7A2FF4] text-[14px] font-bold">{historySelected?.type}</p>
                      </div>
                      <div className="my-2 w-full border-y border-solid border-[#EBECEF] py-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[#A9AEB4] text-[14px] ">{t("Status")}</p>
                          <p className="text-[#1E0E39] text-[14px] ">{t("Successful")}</p>
                        </div>
                        {typeof historySelected?.amount !== 'boolean' && (
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-[#A9AEB4] text-[14px] ">{t("Amount")}</p>
                            <p className="text-[#1E0E39] text-[14px] ">${historySelected?.amount}</p>
                          </div>
                        )}
                        {historySelected?.type === "Stake" && historySelected?.perfomanceFee && (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-[#A9AEB4] text-[14px] ">{t("Performance Fee")}</p>
                              <p className="text-[#1E0E39] text-[14px] ">${historySelected?.perfomanceFee}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="text-[#A9AEB4] text-[14px] ">{t("Total")}</p>
                              <p className="text-[#1E0E39] text-[14px] ">${historySelected?.total}</p>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="mb-2 w-full border-b border-solid border-[#EBECEF] py-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[#A9AEB4] text-[14px] ">{t("Date and time")}</p>
                          <div className="text-[#1E0E39] text-[14px]">
                            <span>{historySelected?.date} </span>
                            <span>{historySelected?.time}</span>
                          </div>
                        </div>
                        {/*   <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Hash")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.hash}</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Confirmation")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.confirmation}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#A9AEB4] text-[14px] ">{t("Block")}</p>
                      <p className="text-[#1E0E39] text-[14px] ">${historySelected?.block}</p>
                    </div>*/}
                      </div>
                      <Link href={`https://polygonscan.com/tx/${historySelected?.hash}`}>
                        <button className="text-[12px] font-bold text-[#7A2FF4] underline mx-auto flex items-center">
                          Polygon Scan <Image src={ArrowCircle} alt="Arrow Circle" width={18} height={18} className="ml-1" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </ModalComponent>
              </div>
            ) : (
              <h1 className="text-white font-bold text-[18px] text-center">{t("No history data")}</h1>
            )}

            {!isDashboard ? (
              <div className="flex justify-center mt-5 ">
                <Pagination
                  currentPage={currentPage}
                  goToNextPage={goToNextPage}
                  goToPage={goToPage}
                  goToPreviousPage={goToPreviousPage}
                  totalPages={totalPages}
                />
              </div>
            ) : null}
          </>
        ) : (
          <h1 className="text-white font-bold text-[18px] text-center">{t("No history data")}</h1>
        )}
      </div>
    </>
  );
};

export default History;
