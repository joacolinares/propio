export interface DataSigner {
    dataWallet: string
    dateEnd: string
    votes: number
    invertion: number
}

export const dataSigner: DataSigner[] = [
    {
        dataWallet: "0x0000000000000000000000000000000000000012",
        dateEnd: "29/04/12",
        votes: 100,
        invertion: 50
    },
    {
        dataWallet: "0x0000000000000000000000000000000000000034",
        dateEnd: "29/04/12",
        votes: 100,
        invertion: 50
    },
    {
        dataWallet: "0x0000000000000000000000000000000000000056",
        dateEnd: "29/04/12",
        votes: 0,
        invertion: 50
    },
    {
        dataWallet: "0x0000000000000000000000000000000000000078",
        dateEnd: "29/04/12",
        votes: 100,
        invertion: 50
    },
]