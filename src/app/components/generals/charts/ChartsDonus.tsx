"use client";
import React from "react";
import * as echarts from "echarts";
import { useEffect, useState } from "react";
import {
  DataChart,
  DataChartMock,
  dataServidorGraphMock,
} from "./dataChartMock";
import { useTranslations } from "next-intl";
const data: DataGraphic = {
  profit: {
    porcentaje: 20,
    valor: 2000000,
  },
  myLiquidity: {
    porcentaje: null,
    valor: 100000,
  },
  myShare: {
    porcentaje: 1,
    valor: null,
  },
  performanceFee: {
    porcentaje: 50,
    valor: null,
  },
};
interface DataGraphic {
  profit: {
    porcentaje: number;
    valor: number;
  };
  myLiquidity: {
    porcentaje: number | null;
    valor: number;
  };
  myShare: {
    porcentaje: number;
    valor: number | null;
  };
  performanceFee: {
    porcentaje: number;
    valor: number | null;
  };
}
const ChartsDonus = () => {
  const t = useTranslations();
  const [allGraphic, setAllGraphic] = useState<DataGraphic | null>(null);
  // const [currentGraphic, setCurrentGraphic] = useState<DataChart[] | null>(null);
  const [selectCurrentGraphic, setSelectCurrentGraphic] = useState("data1");
  const [selectCurrentPeriod, setSelectCurrentPeriod] = useState("1D");

  useEffect(() => {
    setAllGraphic(data);
  }, []);

  useEffect(() => {
    let myChart = echarts.init(document.getElementById("main"));

    if (allGraphic) {
      const option = {
        series: [
          {
            name: "",
            type: "pie",
            color: ["#20DABB", "#FF4C5A", "#A9AEB4"],
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: allGraphic.profit.valor },
              { value: allGraphic.myLiquidity.valor },
              { value: allGraphic.profit.valor * 3 },
            ],
          },
        ],
      };

      myChart.setOption(option);
    }
  }, [allGraphic, selectCurrentGraphic, selectCurrentPeriod]);

  return (
    <div className="shadow-lg rounded-[24px] border border-solid border-[#AD98FF] p-4 text-white mt-6">
      <h1 className="text-[18px] text-[#554D77] text-center font-bold ">
        {t("My Total Liquidity")}
      </h1>
      <div id="main" style={{ height: "300px" }}></div>
      <div>
        <div className="bg-[#7a2ff4] rounded-[10px] flex justify-between items-center p-4 mb-2">
          <div className="flex space-x-1">
            <p className="text-[12px] font-bold">{t("Profit")}</p>
            <p className="text-[12px]">{allGraphic?.profit.porcentaje}%</p>
          </div>
          <p className="text-[14px] font-bold">${allGraphic?.profit.valor}</p>
        </div>
      </div>
    </div>
  );
};

export default ChartsDonus;
