import React from "react";
import { Metadata } from "next";
import Register from "./Register";

export const metadata: Metadata = {
  title: "Registrarse - Defily",
};

const getAllCountries = async () => {
  const listCountries = await fetch("https://restcountries.com/v3.1/all").then(
    (res) => res.json()
  );
  return listCountries;
};

export default async function RegisterPage() {
  const allCountries = await getAllCountries();

  return (
    <div className="page-register">
      <Register allCountries={allCountries} />
    </div>
  );
}
