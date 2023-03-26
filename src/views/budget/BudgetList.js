import TowToneIcon from 'components/helpers/TwoToneIcon'
import { Table } from 'components/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi'
import formatCurrency from 'utils/formatCurrency'
import State from './State'

const { Tr, Th, Td, THead, TBody } = Table

const p = 'budget' // prefix for translation key
function BudgetList({ budgets, onClickItem }) {
    const { t } = useTranslation();

    const getSpent = (budget) => {
        const spent = budget.transactions.reduce((acc, cur) => acc + cur.amount, 0)
        return spent
    }

    const getRemain = (budget) => {
        const spent = getSpent(budget)
        return budget.amount - spent
    }

    const getState = (budget) => {
        const spent = getSpent(budget)
        const remain = budget.amount - spent
        if (remain < 0) return 'overdrafted'
        if (remain > 0) return 'great'
        if (remain === 0) return 'caution'
    }

    // validar si un presupuesto esta activo
    const isActive = (budget) => {
        const today = new Date().toISOString()
        const startDate = new Date(budget.startDate).toISOString()
        const endDate = new Date(budget.endDate).toISOString()
        return today >= startDate && today <= endDate
    }

    return (
        <>
            <Table>
                <THead>
                    <Tr>
                        <Th />
                        <Th>{t(`${p}.table.name`)}</Th>
                        <Th>{t(`${p}.table.daterange`)}</Th>
                        <Th>{t(`${p}.table.amount`)}</Th>
                        <Th>{t(`${p}.table.remain`)}</Th>
                        <Th>{t(`${p}.table.state`)}</Th>
                        <Th />
                    </Tr>
                </THead>
                <TBody>
                    {
                        budgets.length > 0 ? budgets.map((item, index) => (
                            <Tr key={index}>
                                <Td>
                                    {
                                        isActive(item) ?
                                        <TowToneIcon icon={<HiLockOpen />} color='emerald' size='sm' /> :
                                        <TowToneIcon icon={<HiLockClosed />} color='gray' size='sm' />
                                    }
                                </Td>
                                <Td>{item.name}</Td>
                                <Td>{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</Td>
                                <Td className='font-semibold'>{formatCurrency(item.amount)}</Td>
                                <Td className='font-semibold'>{formatCurrency(getRemain(item))}</Td>
                                <Td><State state={getState(item)} /></Td>
                                <Td>
                                    <div className='min-w-max text-indigo-600 cursor-pointer select-none font-semibold' onClick={() => onClickItem(item)}>
                                        {t(`${p}.table.details`)}
                                    </div>
                                </Td>
                            </Tr>
                        )) :
                        <Tr>
                            <Td colSpan={6} className='text-center'>
                                {t(`${p}.table.empty`)}
                            </Td>
                        </Tr>
                    }
                </TBody>
            </Table>
        </>
    )
}

export default BudgetList