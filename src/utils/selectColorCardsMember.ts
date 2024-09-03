import { RankingAccount, TypeAccount } from "@/app/[locale]/(logged-in)/myTeam/components/moskData";

export const getTypeAccount = (type: TypeAccount) => {
    const objectBaseType: Record<TypeAccount, string> = {
        "Cuenta Propia": "#00a338" , 
        "Cuenta de Referido" :"#fb6a01", 
        "Cuenta de Traspaso": "#014bc6"
    }

    return objectBaseType[type];
}

export const getRankingAccount = (ranking: RankingAccount) => {
    const objectBaseRanking: Record<RankingAccount, string> = {
        "Jade": "#9b9b9b",
        "Sapphire": "#7572a5",
        "Ruby": "#9b111e",
        "Emerald": "#00febe",
        "Diamond": "#c8e5eb",
        "Blue Diamond": "#70d1f4",
        "Black Diamond": "#000000",
        "Crown Diamond":"#ffd700",
    }

    return objectBaseRanking[ranking];
}