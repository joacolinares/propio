import React from "react";
import Member from "./Member";
import { dataCommissions, dataHistoryMember } from "./components/moskData";

const getDataCommissions = async () => {
  const dataListCommissions = dataCommissions;
  const dataListHistory = dataHistoryMember;
  return { dataListCommissions, dataListHistory };
};

const MemberPage = async () => {
  const { dataListCommissions, dataListHistory } = await getDataCommissions();

  return (
    <>
      <Member
        dataListCommissions={dataListCommissions}
        dataListHistory={dataListHistory}
      />
    </>
  );
};

export default MemberPage;
