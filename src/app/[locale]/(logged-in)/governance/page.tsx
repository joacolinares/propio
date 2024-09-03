import React from 'react'
import Governance from './Governance'
import {dataSigner} from "./components/moskData"

async function getDataGovernance() {
    const dataSigners = dataSigner
    return dataSigners
}

const GovernancePage = async () => {
    const governanceSigner = await getDataGovernance()

  return (
    <div>
        <Governance governanceSigner={governanceSigner}/>
    </div>
  )
}

export default GovernancePage