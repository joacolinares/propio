export interface DataOperationsClaim {
    id: number;
    amountClaim: string;
    date: string;
    time: string;
    amountProfit: string;
    amountFee: string;
}

export const dataOperationsClaim = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    amountClaim: "100.00",
    date: '10/10/2022',
    time: '12:00',
    amountProfit: "90.00",
    amountFee: "10.00"
}));

export interface DataOperationsUnStake {
    id: number;
    amountUnStake: string;
    date: string;
    time: string;
}

export const dataOperationsUnStake = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    amountUnStake: "50.00",
    date: '10/10/2023',
    time: '12:00',
}));