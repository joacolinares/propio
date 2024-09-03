import React from 'react'
import { dataTransactions } from './moskData'
import Transactions from './Transactions'

async function getDataTransactions() {
  const data = dataTransactions
  return data
}

const TransactionsPage = async () => {
  const dataTransaction = await getDataTransactions()

  return (
    <div className='page-transactions pb-[96px] bg-gradient-to-t from-[#0E0E33] to-[#39307B]'>
      <Transactions data={dataTransaction} />
    </div>
  )
}

export default TransactionsPage