export interface ProfitHistoryMyLiquidity {
    id: number;
    month: string;
    year: number;
    amountProfit: string;
    myShare: string;
}

const monthMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};

// Función para ordenar por año y mes
const sortByDateDesc = (a, b) => {
  if (a.year === b.year) {
    return monthMap[b.month] - monthMap[a.month];
  }
  return b.year - a.year;
};


export const profitHistoryMyLiquidity: ProfitHistoryMyLiquidity[] = [
  { id: 1, month: "November", year: 2022, amountProfit: "13.56", myShare: "" },
  { id: 2, month: "December", year: 2022, amountProfit: "9.22", myShare: "" },
  { id: 3, month: "January", year: 2023, amountProfit: "12.23", myShare: "" },
  { id: 4, month: "February", year: 2023, amountProfit: "18.23", myShare: "" },
  { id: 5, month: "March", year: 2023, amountProfit: "15.43", myShare: "" },
  { id: 6, month: "April", year: 2023, amountProfit: "12.54", myShare: "" },
  { id: 7, month: "May", year: 2023, amountProfit: "5.34", myShare: "" },
  { id: 8, month: "June", year: 2023, amountProfit: "-3.65", myShare: "" },
  { id: 9, month: "July", year: 2023, amountProfit: "9.12", myShare: "" },
  { id: 10, month: "August", year: 2023, amountProfit: "12.67", myShare: "" },
  { id: 11, month: "September", year: 2023, amountProfit: "8.54", myShare: "" },
  { id: 12, month: "October", year: 2023, amountProfit: "11.40", myShare: "" },
  { id: 13, month: "November", year: 2023, amountProfit: "16.40", myShare: "" },
  { id: 14, month: "December", year: 2023, amountProfit: "13.45", myShare: "" },
  { id: 15, month: "January", year: 2024, amountProfit: "15.43", myShare: "" },
  { id: 16, month: "February", year: 2024, amountProfit: "23.54", myShare: "" },
  { id: 17, month: "March", year: 2024, amountProfit: "0.00", myShare: "Development" },
  { id: 18, month: "April", year: 2024, amountProfit: "0.00", myShare: "Development" },
  { id: 19, month: "May", year: 2024, amountProfit: "0.00", myShare: "Development" },
  { id: 20, month: "June", year: 2024, amountProfit: "0.00", myShare: "Development" },
];

export const sortedProfitHistoryMyLiquidity = profitHistoryMyLiquidity.sort(sortByDateDesc);

 

  export interface InfoMembership {
    id: number;
    plan: string;
    type: string;
    amount: string;
    share: number;
    myProfit: string;
  }

  export const infoMembership = [

  ]
