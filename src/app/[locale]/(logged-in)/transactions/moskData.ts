export interface DataTransactions {
    id: number;
    type: string;
    date: string;
    time: string;
    amount: string;
    amountFee: string;
}

export const dataTransactions = Array(0)
  .fill(null)
  .map((_, index) => {
    const types = ["Stake", "Claims", "Un-Stake", "Rewards"];
    const randomType = types[Math.floor(Math.random() * types.length)]; // Random type selection
    
    return {
      id: index + 1,
      type: randomType,
      date: "10/10/23",
      time: "10:00",
      amount: "100.00",
      amountFee: "0.00",
    };
  });

