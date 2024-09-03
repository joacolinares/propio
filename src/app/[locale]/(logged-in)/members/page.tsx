import React from "react";
import Members from "./Members";
import { currentPlans } from "./components/moskData";

const getDataCurrents = async () => {
  const dataCurrents = currentPlans;
  return dataCurrents;
};

const MembersPage = async () => {
  const dataListCurrents = await getDataCurrents();

  return (
    <div>
      <Members dataListCurrents={dataListCurrents} />
    </div>
  );
};

export default MembersPage;
