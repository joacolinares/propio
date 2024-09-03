import React from "react";
import ShowSelectMembership from "@/app/[locale]/membership/ShowSelectMembership";
import plansMembership from "@/app/[locale]/membership/moskData";

async function getDataPlans() {
  const dataPlans = plansMembership;
  return dataPlans;
}

const SelectMember = async () => {

  return <ShowSelectMembership />;
};

export default SelectMember;
