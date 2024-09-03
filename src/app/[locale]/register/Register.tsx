"use client";
import RegisterOne from "./components/RegisterOne";
import RegisterTwo from "./components/RegisterTwo";
import RegisterThree from "./components/RegisterThree";
import HeaderRegister from "@/app/components/register/HeaderRegister";
import { useEffect, useState } from "react";
import SponsorData from "./components/SponsorData";

type Props = {
  allCountries: string[];
};

export default function Register({ allCountries }: Props) {
  const [stepCompleted, setStepCompleted] = useState(1);

  const handleStep = (value: number) => {
    setStepCompleted(value);
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const step = urlParams.get("step");
    console.log(step);
    // Convertir step a número
    const stepNumber = step ? parseInt(step, 10) : 1;
    setStepCompleted(stepNumber);
  }, []);

  return (
    <>
      <HeaderRegister step={stepCompleted} />
      <SponsorData />
      {stepCompleted === 1 && <RegisterOne setStepCompleted={handleStep} />}
      {/* {stepCompleted === 2 && (
        <RegisterTwo
          allCountries={allCountries}
          setStepCompleted={handleStep}
        />
      )}
      {stepCompleted === 3 && <RegisterThree />} */}
    </>
  );
}
