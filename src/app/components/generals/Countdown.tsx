"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Props = {
  dateEnd: Date;
  bgColor?: string;
};

const Countdown = ({ dateEnd, bgColor }: Props) => {
  const t = useTranslations();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = dateEnd.getTime() - new Date().getTime();
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval);
      }
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
      // console.log({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [dateEnd]);

  return (
    <div
      className={`${
        bgColor ? bgColor : "bg-[#12C2E9]"
      } container-countdown mt-1 flex justify-between items-center rounded-[6px] text-white item-body duration-1000 transition py-1 px-4`}
    >
      <div className="text-center">
        <p className="fecha text-[12px]">{days}</p>
        <p className="hora text-[6px]">{t("DAYS")}</p>
      </div>
      <div className="text-center">
        <p className="fecha text-[12px]">{hours}</p>
        <p className="hora text-[6px]">HS</p>
      </div>
      <div className="text-center">
        <p className="fecha text-[12px]">{minutes}</p>
        <p className="hora text-[6px]">MN</p>
      </div>
      <div className="text-center">
        <p className="fecha text-[12px]">{seconds}</p>
        <p className="hora text-[6px]">SEC</p>
      </div>
    </div>
  );
};

export default Countdown;
