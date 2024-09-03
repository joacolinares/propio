import React from "react";
import { dataHistoryMock } from "./moskData";
import History from "./History";

async function getDataHistory() {
  const data = dataHistoryMock;
  return data;
}

const HistoryPage = async () => {
  const dataHistory = await getDataHistory();

  return (
    <div className="page-transactions pb-[96px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
      <History data={dataHistory} />
    </div>
  );
};

export default HistoryPage;
