import React from 'react'
import { useTranslation } from 'react-i18next'
import ChartByDate from './ChartByDate'

const p = 'statistic'
function Statistic() {
  const { t } = useTranslation()
  return (
    <>
      <div className='container mx-auto'>
        <div className='mb-6'>
          <h2 className='font-bold'>{t(`${p}.title`)}</h2>
          <p className='text-sm text-gray-500'>{t(`${p}.subtitle`)}</p>
        </div>

        <ChartByDate />
      </div>
    </>
  )
}

export default Statistic