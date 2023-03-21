import { Badge } from 'components/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'

const p = 'budget.state'
function State({ state }) {
    const { t } = useTranslation()

    const color = {
        overdrafted: 'red-500',
        great: 'green-500',
        caution: 'amber-500',
        warning: 'amber-500',
    }

    return (
        <div className='flex items-center'>
            <Badge className="mr-2" innerClass={`bg-${color[state]}`} />
            <span className={`capitalize font-semibold text-${color[state]}`}>{t(`${p}.${state}`)}</span>
        </div>
    )
}

export default State