import React from "react";
import { dataHistoryMock } from "../history/moskData";
import Dashboard from "./Dashboard";

const getDataTransactions = async () => {
  const dataHistory = dataHistoryMock;
  return dataHistory;
};

const DashboardPage = async () => {
  const historyList = await getDataTransactions();
  let isDashboard = true;

  return (
    <div>
      <Dashboard isDashboard={isDashboard} dataHistory={historyList} />
    </div>
  );
};

export default DashboardPage;
