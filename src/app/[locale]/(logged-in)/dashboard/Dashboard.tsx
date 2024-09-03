"use client";
import React from "react";
import ButtonsAndGraph from "./components/ButtonsAndGraph";
import History from "../history/History";
import { DataHistory } from "../history/moskData";
import Header from "@/app/components/generals/Header";
import LinealChart from "@/app/components/generals/charts/ChartLines";
import { useTranslations } from "next-intl";
import { ThirdwebProvider } from "@thirdweb-dev/react";

interface Props {
  isDashboard?: boolean;
  dataHistory: DataHistory[];
}

const Dashboard = ({ isDashboard, dataHistory }: Props) => {
  const t = useTranslations();

  return (
    <div>

        <Header text={t("Dashboard")} />

        <ButtonsAndGraph />
        <LinealChart />
        <History isDashboard={isDashboard} data={dataHistory} />
        
    </div>
  );
};

export default Dashboard;
