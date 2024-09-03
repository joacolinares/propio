import React from 'react'
import RewardPool from './RewardPool'
import CardsInfo from './components/CardsInfo'
import {cardInfoRewardData, referralUsersData, commissionsUsersData} from "./components/moskData"
import ContainerRefAndCom from './components/ContainerRefAndCom'

async function getDataRewards() {
  const dataCards = cardInfoRewardData
  const dataReferral = referralUsersData
  const dataCommissions = commissionsUsersData

  return {dataCards, dataReferral, dataCommissions}
}



const RewardPoolPage = async () => {
  const rewardsData = await getDataRewards()

  return (
    <div>
      <RewardPool />
      <CardsInfo cardsInfo={rewardsData.dataCards}/>
      <ContainerRefAndCom referralInfo={rewardsData.dataReferral} commissionInfo={rewardsData.dataCommissions}/>
    </div>
  )
}

export default RewardPoolPage