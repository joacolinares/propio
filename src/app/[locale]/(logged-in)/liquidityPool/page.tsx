import React from "react";
import Liquidity from "./Liquidity";
import {
  profitHistoryMyLiquidity,
  infoMembership,
} from "./components/moskData";

const getDataMyLiquidity = async () => {
  const profitHistory = profitHistoryMyLiquidity;
  return {
    infoMembership,
    profitHistory,
  };
};

const LiquidityPoolPage = async () => {
  const { infoMembership, profitHistory } = await getDataMyLiquidity();

  return (
    <div>
      <Liquidity
        dataMyLiquidity={profitHistory}
        infoMembership={infoMembership}
      />
    </div>
  );
};

export default LiquidityPoolPage;
