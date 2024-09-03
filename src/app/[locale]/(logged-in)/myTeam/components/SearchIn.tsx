"use client";
import React from "react";
import { DataMembers, MembersInfo } from "./moskData";
import { useTranslations } from "next-intl";

import UserDataCard from "@/app/components/generals/UserDataCard";

type Props = {
  dataFiltered: DataMembers[];
  searchInput: string;
};

const SearchIn = ({ dataFiltered = [], searchInput }: Props) => {
  const t = useTranslations();

  return (
    <div className="mt-4 px-6">
      {searchInput.length === 0 ? (
        <UserDataCard
          typeAccount="Cuenta Propia"
          rankingAccount="Ruby"
          isMe={true}
          membersInfo={{
            wallet: "1",
            nameUser: "Jobs",
            plan: "ULTIMATE",
            numberDirects: 0,
            directsVol: "0.00",
            numberGlobal: 8,
            globalVol: "5,600.00",
            sponsor: "patricia",
            level: 2,
            image:
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
          }}
        />
      ) : null}

      {dataFiltered.map((infoMembership) =>
        infoMembership.membersInfo.map((info: MembersInfo, index: number) => (
          <UserDataCard
            key={index}
            typeAccount="Cuenta de Traspaso"
            rankingAccount="Jade"
            membersInfo={info}
          />
        ))
      )}
    </div>
  );
};

export default SearchIn;
