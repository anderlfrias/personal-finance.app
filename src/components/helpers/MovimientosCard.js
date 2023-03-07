import React from 'react'
import { useTranslation } from 'react-i18next'
import SummaryCard from 'components/helpers/SummaryCard'

const MovimientosCard = () => {
    const { t } = useTranslation()
  return (
    
    <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>
            {t(`transaction.summary.title`)}
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <SummaryCard title={t(`transaction.summary.income`)} type='income' amount='$5000.00' />
            <SummaryCard title={t(`transaction.summary.expense`)} type='expense' amount='$1500.00' />
            <SummaryCard title={t(`transaction.summary.balance`)} type='balance' amount='$3500.00' />
        </div>
    </div>
  )
}

export default MovimientosCard