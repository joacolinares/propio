"use client";
import * as echarts from "echarts";
import { useEffect, useState } from "react";
import {
  DataChart,
  DataChartMock,
  dataServidorGraphMock,
} from "./dataChartMock";
import { formatDistanceToNow, format } from "date-fns";
import { useTranslations } from "next-intl";

const periodTheGraphic = ["1D", "1W", "1M", "3M", "1Y"];
const result = formatDistanceToNow(new Date(2024, 3, 12));
const miliseconds = format(new Date(2017, 10, 6), "T");

export default function LinealChart() {
  const t = useTranslations();
  const [allGraphic, setAllGraphic] = useState<DataChartMock | null>(null);
  // const [currentGraphic, setCurrentGraphic] = useState<DataChart[] | null>(null);
  const [selectCurrentGraphic, setSelectCurrentGraphic] = useState("data1");
  const [selectCurrentPeriod, setSelectCurrentPeriod] = useState("1D");
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState("Stakes");

  //aqui se supone que tenemos que traer los datos del sevidor por primera vez y agregarlo al setAllGraphic
  useEffect(() => {
    setAllGraphic(dataServidorGraphMock);
  }, []);

  useEffect(() => {
    if (allGraphic) {
      let myChart = echarts.init(document.getElementById("main"));
      const symbolSize = 5;

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      const option = {
        tooltip: {
          formatter: "{b}-{c}",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLabel: {
            interval: 293,
          },
        },
        yAxis: {
          type: "value",
          show: false,
        },
        grid: {
          left: "0%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        series: [
          {
            data: allGraphic.data1.map((item) => item.price),
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#7A2FF4",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(122, 47, 244)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 255, 255)",
                },
              ]),
            },
            symbolSize: symbolSize,
          },
        ],
      };

      const getLastDays = (numberOfDays: number) => {
        let date = new Date();
        let days = [];

        for (let i = 0; i < numberOfDays; i++) {
          let day = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - i
          );
          days.unshift(
            `${day.getFullYear()}-${("0" + (day.getMonth() + 1)).slice(-2)}-${(
              "0" + day.getDate()
            ).slice(-2)}`
          );
        }

        return days;
      };

      const giveOneDay = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i);

        //@ts-ignore
        const lastTwoDays = allGraphic[selectCurrentGraphic].filter(
          (item: any) => {
            const date = new Date(item.date);
            const today = new Date();
            const yesterday = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() - 1
            );

            return (
              (date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()) ||
              (date.getDate() === yesterday.getDate() &&
                date.getMonth() === yesterday.getMonth() &&
                date.getFullYear() === yesterday.getFullYear())
            );
          }
        );

        function getLastTwentyFourHours() {
          let date = new Date();
          let hours = [];

          for (let i = 0; i < 24; i++) {
            let hour = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              date.getHours() - i
            );
            const day = ("0" + hour.getDate()).slice(-2);
            hours.unshift(`${day}-${("0" + hour.getHours()).slice(-2)}`);
          }

          return hours;
        }

        //@ts-ignore
        option.xAxis.data = getLastTwentyFourHours().map(
          (hour) => hour + ":00"
        );

        option.series[0].data = getLastTwentyFourHours().map((hour) => {
          return lastTwoDays
            .filter((item: any) => item.date.includes(hour.replace("-", " ")))
            .reduce((acc: any, item: any) => {
              return acc + item.price;
            }, 0);
        });

        option.xAxis.axisLabel.interval = 2;
        myChart.setOption(option);
      };
      const giveMeOneWeek = () => {
        //@ts-ignore
        option.xAxis.data = getLastDays(7).map(
          (day) => dayNames[new Date(day).getDay()] + "-" + day.split("-")[2]
        );
        option.series[0].data = getLastDays(7).map((day) => {
          //@ts-ignore
          return allGraphic[selectCurrentGraphic]
            .filter((item: any) => item.date.includes(day))
            .reduce((acc: any, item: any) => {
              return acc + item.price;
            }, 0);
        });

        option.xAxis.axisLabel.interval = 0;

        myChart.setOption(option);
      };
      const giveMeOneMonth = () => {
        //@ts-ignore
        option.xAxis.data = getLastDays(30).map(
          (day) =>
            monthNames[Number(day.split("-")[1]) - 1] + "-" + day.split("-")[2]
        );
        option.series[0].data = getLastDays(30).map((day) => {
          //@ts-ignore
          return allGraphic[selectCurrentGraphic]
            .filter((item: any) => item.date.includes(day))
            .reduce((acc: any, item: any) => {
              return acc + item.price;
            }, 0);
        });
        option.xAxis.axisLabel.interval = 3;

        myChart.setOption(option);
      };
      const giveMeTheMonths = (numberOfMonths: number) => {
        function getLastTwelveMonths() {
          let date = new Date();
          let months = [];

          for (let i = 0; i < numberOfMonths; i++) {
            months.unshift(
              new Date(date.getFullYear(), date.getMonth() - i, 1)
            );
          }

          return months.map((month) => {
            return monthNames[month.getMonth()];
          });
        }

        option.xAxis.data = getLastTwelveMonths() as never; //meses
        option.series[0].data = getLastTwelveMonths().map((month) => {
          //@ts-ignore
          return allGraphic[selectCurrentGraphic]
            .filter((item: any) => {
              const monthIndex = monthNames.findIndex((m) => month === m);

              // for now: Verificar que sea del año correcto
              const monthText =
                monthIndex + 1 < 10
                  ? `0${monthIndex + 1}`
                  : `${monthIndex + 1}`;
              const result = item.date.includes(`-${monthText}-`);
              return result;
            })
            .reduce((acc: any, item: any) => {
              return acc + item.price;
            }, 0);
        });

        option.xAxis.axisLabel.interval = 0;

        myChart.setOption(option);
      };

      if (selectCurrentPeriod === "1D") {
        giveOneDay();
      } else if (selectCurrentPeriod === "1W") {
        giveMeOneWeek();
      } else if (selectCurrentPeriod === "1M") {
        giveMeOneMonth();
      } else if (selectCurrentPeriod === "3M") {
        giveMeTheMonths(3);
      } else if (selectCurrentPeriod === "1Y") {
        giveMeTheMonths(12);
      }
    }
  }, [allGraphic, selectCurrentPeriod, selectCurrentGraphic]);

  const classButton =
    "btn-primary text-white bg-[#AD98FF] focus:ring-4 focus:ring-blue-300 font-medium rounded-[10px] text-[14px] px-3 py-2 focus:outline-none";

  return (
    <div className="px-6 w-full mb-6">
      <div className="flex justify-between items-center p-4">
        <p className="text-[20px] text-[#1E0E39] font-bold ">$ 0</p>
        <div className={`text-[#A9AEB4] text-[14px] font-medium  relative`}>
          <button
            className={`${
              isOpen ? "rounded-b-0" : "rounded-b-[10px]"
            } rounded-t-[10px] border border-solid border-[#A9AEB4]  p-2 bg-white text-[14px] font-bold text-[#A9AEB4] w-[120px]`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex justify-between items-center w-full">
              <p>{isSelected}</p>
              <svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className='stroke="text-black hover:text-indigo-100"'
              >
                <path
                  d="M1 1L4 4L7 1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
          {isOpen ? (
            <ul
              className={`absolute top-[30px] z-10 w-full max-h-56 overflow-auto rounded-b-[10px] bg-white py-1 px-0 text-center shadow-lg text-[14px] list-none
                          font-normal divide-y divide-gray-100 border border-solid border-[#A9AEB4] border-t-[1px]`}
            >
              <li
                onClick={() => {
                  setSelectCurrentGraphic("data1");
                  setIsSelected(t("Stakes"));
                  setIsOpen(!isOpen);
                }}
                className="pb-2"
              >
                {t("Stakes")}
              </li>
              <li
                onClick={() => {
                  setSelectCurrentGraphic("data2");
                  setIsSelected(t("Claims"));
                  setIsOpen(!isOpen);
                }}
                className="pb-2"
              >
                {t("Claims")}
              </li>
              <li
                onClick={() => {
                  setSelectCurrentGraphic("data3");
                  setIsSelected(t("Rewards"));
                  setIsOpen(!isOpen);
                }}
                className="pb-2"
              >
                {t("Rewards")}
              </li>
              <li
                onClick={() => {
                  setSelectCurrentGraphic("data4");
                  setIsSelected(t("Un-Stakes"));
                  setIsOpen(!isOpen);
                }}
              >
                {t("Un-Stakes")}
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mx-auto">
        <div className="overflow-auto">
          <div id="main" style={{ width: "600px", height: "270px" }}></div>
        </div>
        {/* <div id="main" style={{ position: "relative", height:"300px", overflow:"hidden", width: "100vw"}}></div> */}

        <div className="p-4 flex align-center justify-center">
          <div className="px-4 py-1 rounded-[8px] bg-[#F2F3F8] shadow-md">
            {periodTheGraphic.map((period, index) => (
              <button
                className="
                    btn 
                    hover:bg-[#612DFE] 
                    hover:text-white
                    text-[14px] 
                    font-bold
                    text-[#A9AEB4]
                    rounded-[6px]
                    px-2 
                    py-1 
                    me-1 
                    my-1 
                  "
                key={index}
                onClick={() => setSelectCurrentPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
