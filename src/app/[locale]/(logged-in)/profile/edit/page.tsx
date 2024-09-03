import React from "react";
import EditProfile from "./Edit";

const getAllCountries = async () => {
  const listCountries = await fetch("https://restcountries.com/v3.1/all").then(
    (res) => res.json()
  );
  return listCountries;
};

const EditProfilePage = async () => {
  const allCountries = await getAllCountries();

  return (
    <div>
      <EditProfile allCountries={allCountries} />
    </div>
  );
};

export default EditProfilePage;
