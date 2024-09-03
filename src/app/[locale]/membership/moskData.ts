export interface PlansMembership {
    plan: string
    price: string
    minStake: string
    maxStake: string
    fee: string
    expiration: number
    performanceFee: number
}

const plansMembership = [
    {
        plan: "Zero",
        price: "0.00",
        minStake: "500.00",
        maxStake: "9,999.00",
        fee: "10",
        expiration: null,
        performanceFee: 50
    },
    {
        plan: "Zero Plus",
        price: "0.00",
        minStake: "10,000.00",
        maxStake: "No Limit",
        fee: "5",
        expiration: null,
        performanceFee: 40
    },
    {
        plan: "Basic",
        price: "100.00",
        minStake: "200.00",
        maxStake: "1,000.00",
        fee: "0",
        expiration: 365,
        performanceFee: 50
    },
    {
        plan: "Essential",
        price: "250.00",
        minStake: "200.00",
        maxStake: "2,500.00",
        fee: "0",
        expiration: 365,
        performanceFee: 45
    },
    {
        plan: "Premium",
        price: "500.00",
        minStake: "200.00",
        maxStake: "5,000.00",
        fee: "0",
        expiration: 365,
        performanceFee: 40
    },
    {
        plan: "Pro",
        price: "1,000.00",
        minStake: "200.00",
        maxStake: "15,000.00",
        fee: "0",
        expiration: 365,
        performanceFee: 35
    },
    {
        plan: "Ultimate",
        price: "5,000.00",
        minStake: "200.00",
        maxStake: "100,000.00",
        fee: "0",
        expiration: 365,
        performanceFee: 30
    },
    {
        plan: "Unlimited",
        price: "10,000.00",
        minStake: "200.00",
        maxStake: "1M",
        fee: "0",
        expiration: 365,
        performanceFee: 25
    },
]

export default plansMembership