import React from "react";
import Accounts from "./components/Accounts";
import { infoAccounts } from "./components/moskData";

async function getDataAccounts() {
  const data = infoAccounts;
  return data;
}

const AccountPage = async () => {
  const dataAccounts = await getDataAccounts();
  return (
    <div>

      <Accounts dataAccounts={dataAccounts} />
    </div>
  );
};

export default AccountPage;
