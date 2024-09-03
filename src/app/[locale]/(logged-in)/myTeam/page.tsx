import React from "react";
import MyTeam from "./MyTeam";
import { DataMembers, dataLevelsMock } from "./components/moskData";

async function fetchServerDataMember(): Promise<DataMembers[]> {
  const data = dataLevelsMock;
  return data;
}

const MyTeamPage = async () => {
  const dataFech = await fetchServerDataMember();
  return (
    <>
      <MyTeam infoUserLevel={dataFech} />
    </>
  );
};

export default MyTeamPage;
