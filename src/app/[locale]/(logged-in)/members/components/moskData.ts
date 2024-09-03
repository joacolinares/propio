export interface DataCurrentPlan {
    id: number
    typePlan: string
    amount: string
    maxStake: string
    currentStake: string
    remaining: string
    fechaInicio: Date
    fechaFinal: Date
    state: string
}

export const currentPlans = [
    {
        id: 1,
        typePlan: "Basic",
        amount: "100.00",
        maxStake: "1,000.00",
        currentStake: "1,000.00",
        remaining: "9,000.00",
        fechaInicio: new Date(),
        fechaFinal: new Date(((86400 * 1000) * 20) + new Date().getTime()),
        state: "Active"
    },
    {
        id: 2,
        typePlan: "Premium",
        amount: "1,000.00",
        maxStake: "10,000.00",
        currentStake: "1,000.00",
        remaining: "9,000.00",
        fechaInicio: new Date(),
        fechaFinal: new Date(((86400 * 1000) * 20) + new Date().getTime()),
        state: "Inactive"
    },
    {
        id: 3,
        typePlan: "Zero",
        amount: "100.00",
        maxStake: "1,000.00",
        currentStake: "1,000.00",
        remaining: "9,000.00",
        fechaInicio: new Date(),
        fechaFinal: new Date(((86400 * 1000) * 20) + new Date().getTime()),
        state: "Active"
    },
    {
        id: 4,
        typePlan: "Zero Plus",
        amount: "1,000.00",
        maxStake: "10,000.00",
        currentStake: "1,000.00",
        remaining: "9,000.00",
        fechaInicio: new Date(),
        fechaFinal: new Date(((86400 * 1000) * 20) + new Date().getTime()),
        state: "Inactive"
    }
]