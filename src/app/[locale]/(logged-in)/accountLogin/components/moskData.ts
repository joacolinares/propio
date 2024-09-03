export interface InfoAccounts {
    id: number
    typeAccount: string
    plan: string
    numberDirects: number
    directsVol: string
    numberGlobal: number
    globalVol: string
    sponsor: string
    since: string
}

export const infoAccounts = [
    {
        id: 1,
        typeAccount: "MainAccount",
        plan: "ULTIMATE",
        numberDirects: 5,
        directsVol: "2,500.00",
        numberGlobal: 8,
        globalVol: "5,000.00",
        sponsor: "patricia",
        since: "24/07/24"
    },
    {
        id: 2,
        typeAccount: "SecondAccount",
        plan: "ULTIMATE",
        numberDirects: 5,
        directsVol: "2,500.00",
        numberGlobal: 8,
        globalVol: "5,000.00",
        sponsor: "jobs",
        since: "28/07/24"
    }
]