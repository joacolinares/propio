export interface MembersInfo { 
    wallet: string, 
    nameUser: string, 
    plan: string, 
    numberDirects: number, 
    directsVol: string, 
    numberGlobal: number, 
    globalVol: string, 
    sponsor: string, 
    level: number, 
    image: string 
    walletInfo?: InfoWalletMembers[]
    totalStaking?: string
}

export type TypeAccount = "Cuenta Propia" | "Cuenta de Referido" | "Cuenta de Traspaso"
export type RankingAccount = "Jade" | "Sapphire" | "Ruby" | "Emerald" | "Diamond" | "Blue Diamond" | "Black Diamond" | "Crown Diamond"

export interface DataMembers {
    level: number
    numberOfMembers: number
    totalStaking: string
    residual: string,
    membersInfo: MembersInfo[]
}

export interface InfoWalletMembers {
    status: string
    period: string
    investment: number
    startDate: string
}

export const dataLevelsMock: DataMembers[] = [
    {
        level: 1,
        numberOfMembers: 11,
        totalStaking: "20,000.00",
        residual: "2,000.00",
        membersInfo: [
            {
                wallet: "1",
                nameUser: "Lety01",
                plan: "BASIC",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]
            },
            {
                wallet: "2",
                nameUser: "Lety01",
                plan: "BASIC",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]
            },
            {
                wallet: "3",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]
            },
            {
                wallet: "4",
                nameUser: "Fabian",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]
            },
            {
                wallet: "5",
                nameUser: "Lesly",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]
            },
            {
                wallet: "6",
                nameUser: "Mariano",
                plan: "BASIC",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            },
            {
                wallet: "7",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]
            },
            {
                wallet: "8",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]
            },
            {
                wallet: "9",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            }
        ]
    },
    {
        level: 2,
        numberOfMembers: 8,
        totalStaking: "5,000.00",
        residual: "500.00",
        membersInfo: [
            {
                wallet: "1",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            },
            {
                wallet: "2",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    }
                ]
            },
            {
                wallet: "3",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            }
        ]
    },
    {
        level: 3,
        numberOfMembers: 13,
        totalStaking: "10,000.00",
        residual: "1,000.00",
        membersInfo: [
            {
                wallet: "1",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            },
            {
                wallet: "2",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            },
            {
                wallet: "3",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    }
                ]

            }
        ]
    },
    {
        level: 4,
        numberOfMembers: 14,
        totalStaking: "200,000.00",
        residual: "20,000.00",
        membersInfo: [
            {
                wallet: "1",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            },
            {
                wallet: "2",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            },
            {
                wallet: "3",
                nameUser: "Carlo10",
                plan: "ULTIMATE",
                numberDirects: 0,
                directsVol: "0.00",
                numberGlobal: 8,
                globalVol: "5,600.00",
                sponsor: "Fabian",
                totalStaking: "2,000.00",
                level: 2,
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
                walletInfo: [
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                    {
                        status: 'Active',
                        period: '6 months',
                        investment: 10.000,
                        startDate: '01/01/24',
                    },
                ]

            }
        ]
    },
]

interface directReferent extends MembersInfo{
    hasReferred: boolean
}
export const dataListCardMock: {
   referrer:MembersInfo,
   userData:MembersInfo
   directReferent:directReferent[]
} = {
   referrer:{
    wallet: "1",
    nameUser: "Jobs",
    plan: "BASIC",
    numberDirects: 1,
    directsVol: "0.00",
    numberGlobal: 8,
    globalVol: "5,600.00",
    sponsor: "patricia",
    totalStaking: "2,000.00",
    level: 2,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
      walletInfo: [
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
    ]
  },
  userData: {
    wallet: "2",
    nameUser: "Leidys",
    plan: "BASIC",
    numberDirects: 1,
    directsVol: "0.00",
    numberGlobal: 8,
    globalVol: "5,600.00",
    sponsor: "patricia",
    totalStaking: "2,000.00",
    level: 2,
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
      walletInfo: [
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
    ]
  },
  directReferent: [
    {
        wallet: "1",
        nameUser: "Luis",
        plan: "ULTIMATE",
        numberDirects: 0,
        directsVol: "0.00",
        numberGlobal: 8,
        globalVol: "5,600.00",
        sponsor: "Fabian",
        totalStaking: "2,000.00",
        level: 2,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
        hasReferred: true,
        walletInfo: [
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
        ]
    },
    {
        wallet: "2",
        nameUser: "Carlo10",
        plan: "ULTIMATE",
        numberDirects: 0,
        directsVol: "0.00",
        numberGlobal: 8,
        globalVol: "5,600.00",
        sponsor: "Fabian",
        totalStaking: "2,000.00",
        level: 2,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
        hasReferred: false,
        walletInfo: [
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
        ]
    },
    {
        wallet: "3",
        nameUser: "Maria",
        plan: "ULTIMATE",
        numberDirects: 0,
        directsVol: "0.00",
        numberGlobal: 8,
        globalVol: "5,600.00",
        sponsor: "Fabian",
        totalStaking: "2,000.00",
        level: 2,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
        hasReferred: false,
        walletInfo: [
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
        ]
    }
    ]
}


export const dataListCardMock2: {
    referrer:MembersInfo,
    userData:MembersInfo
    directReferent:directReferent[]
 } = {
    referrer: {
        wallet: "2",
        nameUser: "Leidys",
        plan: "BASIC",
        numberDirects: 1,
        directsVol: "0.00",
        numberGlobal: 8,
        globalVol: "5,600.00",
        sponsor: "patricia",
        totalStaking: "2,000.00",
        level: 2,
        image:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
          walletInfo: [
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
        ]
      },
   userData:{
    wallet: "1",
    nameUser: "Luis",
    plan: "ULTIMATE",
    numberDirects: 0,
    directsVol: "0.00",
    numberGlobal: 8,
    globalVol: "5,600.00",
    sponsor: "Fabian",
    totalStaking: "2,000.00",
    level: 2,
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
    walletInfo: [
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
        {
            status: 'Active',
            period: '6 months',
            investment: 10.000,
            startDate: '01/01/24',
        },
    ]
} ,
   directReferent: [
     {
         wallet: "2",
         nameUser: "roberto",
         plan: "ULTIMATE",
         numberDirects: 0,
         directsVol: "0.00",
         numberGlobal: 8,
         globalVol: "5,600.00",
         sponsor: "Fabian",
         totalStaking: "2,000.00",
         level: 2,
         image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
         hasReferred: false,
         walletInfo: [
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
        ]
     },
     {
         wallet: "3",
         nameUser: "Ramon",
         plan: "ULTIMATE",
         numberDirects: 0,
         directsVol: "0.00",
         numberGlobal: 8,
         globalVol: "5,600.00",
         sponsor: "Fabian",
         totalStaking: "2,000.00",
         level: 2,
         image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
         hasReferred: false,
         walletInfo: [
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
        ]
     },
     {
        wallet: "3",
        nameUser: "juan",
        plan: "ULTIMATE",
        numberDirects: 0,
        directsVol: "0.00",
        numberGlobal: 8,
        globalVol: "5,600.00",
        sponsor: "Fabian",
        totalStaking: "2,000.00",
        level: 2,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&psig=AOvVaw2x6iDGa4hkLmrREP1eBnAp&ust=1717342790644000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDjqsveuoYDFQAAAAAdAAAAABAE",
        hasReferred: false,
        walletInfo: [
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
            {
                status: 'Active',
                period: '6 months',
                investment: 10.000,
                startDate: '01/01/24',
            },
        ]
    }
     ]
 }