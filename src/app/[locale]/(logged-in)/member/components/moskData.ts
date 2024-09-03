export interface DataCommissions {
    id: number;
    membership: string;
    date: string;
    amount: string;
    level: number;
    userName: string;
}

export const dataCommissions = Array(50)
  .fill(null)
  .map((_, index) => {
    const types = ["Basic", "Professional", "Premium", "Essential", "Ultimate", "Zero", "Zero Plus", "Unlimited"];
    const membership = types[Math.floor(Math.random() * types.length)]; // Random type selection

    const level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const levelRandom = level[Math.floor(Math.random() * level.length)];

    const userRef = ["Carlos10", "Leticia22", "Dofia23", "mara504", "Albert23", "Karla34"];
    const userRefRandom = userRef[Math.floor(Math.random() * userRef.length)];
    
    return {
      id: index + 1,
      membership: membership,
      date: "11/11/24",
      amount: "100.00",
      level: levelRandom,
      userName: userRefRandom
    };
});

export interface DataHistoryMember {
    id: number;
    type: string;
    date: string;
    time: string;
    amount: string;
}

export const dataHistoryMember = Array(50)
  .fill(null)
  .map((_, index) => {
    const types = ["Paid Commission", "Buy Premium Mem."];
    const typesRandom = types[Math.floor(Math.random() * types.length)]; // Random type selection

    const amount = ["150.00", "350.00", "400.00", "450.00", "500.00", "550.00", "600.00", "650.00", "1,000.00"];
    const amountRandom = amount[Math.floor(Math.random() * amount.length)];

    return {
      id: index + 1,
      type: typesRandom,
      date: "11/11/24",
      time: "11:40:00",
      amount: amountRandom,

    };
});

