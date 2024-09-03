import React from "react";
import MyAccounts from "./components/MyAccounts";
import { infoAccounts } from "../accountLogin/components/moskData";

async function getDataAccounts() {
  const data = infoAccounts;
  return data;
}

const MyAccountsPage = async () => {
  const dataAccounts = await getDataAccounts();

  return (
    <div className="page-transactions pb-[96px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
      <MyAccounts dataAccounts={dataAccounts} />
    </div>
  );
};

export default MyAccountsPage;
