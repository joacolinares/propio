export interface DataHistory {
    id: number;
    type: string;
    date: string;
    time: string;
    amount: string;
    amountFee: string;
    status: string;
    perfomanceFee: number;
    total: string;
    hash: string;
    confirmation: number;
    block: string;
}

export const dataHistoryMock = Array(0)
  .fill(null)
  .map((_, index) => {
    const types = ["Stake", "Claim", "Profit", "Un-Stake"];
    const randomType = types[Math.floor(Math.random() * types.length)]; // Random type selection

    const statusTypes = ["Successful", "Unsuccessful"];
    const randomStatusTypes = statusTypes[Math.floor(Math.random() * statusTypes.length)]; // Random type selection

    const totalTypes = ["100.00", "200.00", "50.00"];
    const randomTotalTypes = totalTypes[Math.floor(Math.random() * totalTypes.length)]; // Random type selection
    
    return {
      id: index + 1,
      type: randomType,
      date: "10/10/23",
      time: "10:00",
      amount: "100.00",
      amountFee: "0.00",
      status: randomStatusTypes,
      perfomanceFee: 0,
      total: randomTotalTypes,
      hash: "0xd9d...cb9b",
      confirmation: 5,
      block: "33853937"
    };
  });

