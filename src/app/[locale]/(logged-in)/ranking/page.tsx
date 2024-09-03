import React from "react";
import Ranking from "./components/Ranking";
import { infoAccountsLevels } from "./components/moskData";

const getDataInfo = async () => {
  const data = infoAccountsLevels;
  return data;
};

const RankingPage = async () => {
  const dataAccountsLevels = await getDataInfo();
  return (
    <>
      <Ranking dataAccountsLevels={dataAccountsLevels} />
    </>
  );
};

export default RankingPage;
