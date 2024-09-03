"use client";
import UserDataCard from "@/app/components/generals/UserDataCard";
import React, { useState } from "react";
import { MembersInfo, dataListCardMock, dataListCardMock2 } from "./moskData";
import { useTranslations } from "next-intl";

const stylosList =
  "before:content-[''] before:w-[10px] before:h-[1px] before:border-b before:border-blue-100 before:border before:inline-block";

const ListView = () => {
  const [dataUserListState, setDataUserListState] = useState(dataListCardMock);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();

  function selectedUserAndSeeMore(info: MembersInfo) {
    console.log({ info });
    setIsLoading(true);

    // aqui obtienes el id o wallet del usuario y traes sus datos
    setDataUserListState(dataListCardMock2);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h1>{t("Loading")}...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="me-5 ms-2 mt-5">
        <div className="relative">
          <UserDataCard
            rankingAccount="Diamond"
            typeAccount="Cuenta Propia"
            width="w-[100%]"
            membersInfo={dataUserListState.referrer}
          />
          <div className="border-0 border-l border-solid border-white absolute top-[60px] h-[81px]"></div>
        </div>

        <div className="relative">
          <div
            className={`${stylosList} flex justify-end items-center w-full relative`}
          >
            <UserDataCard
              rankingAccount="Ruby"
              typeAccount="Cuenta Propia"
              width="w-[100%]"
              membersInfo={dataUserListState.userData}
            />
          </div>

          <div className="border-0 border-l border-solid border-white absolute top-[47px] left-[10px] h-[94px]"></div>
        </div>

        <div className="flex flex-col justify-center items-end ms-[10px]">
          {dataUserListState.directReferent.map((element, index) => (
            <div className="relative w-full" key={index}>
              <div
                className={`${stylosList} flex justify-end items-center before:w-[10px] relative`}
              >
                <UserDataCard
                  key={index}
                  rankingAccount="Jade"
                  typeAccount="Cuenta Propia"
                  width={`w-[100%]`}
                  membersInfo={element}
                  hasReferals={element.hasReferred}
                  setDataUserListState={selectedUserAndSeeMore}
                />
              </div>
              <div
                className={`${
                  index + 1 === dataUserListState.directReferent.length
                    ? ""
                    : "border-0 border-l border-solid border-white absolute top-[47px] left-[0px] h-[94px]"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListView;
