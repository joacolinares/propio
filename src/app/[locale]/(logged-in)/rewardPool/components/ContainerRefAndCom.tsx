import React from 'react'
import ReferralUser from './ReferralUser'
import CommissionsUser from './CommissionsUser'
import {CommissionsUserData, ReferralUserData} from "./moskData"

type Props = {
    referralInfo: ReferralUserData[],
    commissionInfo: CommissionsUserData[]
}

const ContainerRefAndCom = ({referralInfo, commissionInfo}: Props) => {
  return (
    <div className='containerRefAndCom px-[24px] pt-[32px] pb-[96px] rounded-t-[40px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]'>
      <ReferralUser referralInfo={referralInfo}/>
      <CommissionsUser commissionInfo={commissionInfo}/>
    </div>
  )
}

export default ContainerRefAndCom