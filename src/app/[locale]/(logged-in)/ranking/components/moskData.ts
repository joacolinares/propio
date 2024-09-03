export interface InfoAccountsLevels {
    id: number
    nameUser: string
    plan: string
    numberDirects: number
    directsVol: string
    numberGlobal: number
    globalVol: string
    sponsor: string
    level: number
}

export const infoAccountsLevels = Array(50)
    .fill(null)
  .map((_, index) => {

    return   {
        id: index + 1,
        nameUser: "Lety01",
        plan: "BASIC",
        numberDirects: 0,
        directsVol: "0.00",
        numberGlobal: 8,
        globalVol: "5,600.00",
        sponsor: "Fabian",
        level: 2
    };
  });
