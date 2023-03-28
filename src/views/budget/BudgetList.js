import React from 'react'
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi'
import TowToneIcon from 'components/helpers/TwoToneIcon'
import { getRemain, getState, isActive } from './utils'
import formatCurrency from 'utils/formatCurrency'
import { useTranslation } from 'react-i18next'
import { Table } from 'components/ui'
import State from './State'
import BudgetItem from './BudgetItem'
import { useSelector } from 'react-redux'

const { Tr, Th, Td, THead, TBody } = Table

const p = 'budget' // prefix for translation key
function BudgetList({ budgets, onClickItem }) {
    const themeColor = useSelector((state) => state.theme.themeColor)
	const primaryColorLevel = useSelector((state) => state.theme.primaryColorLevel)
    const { t } = useTranslation();
    const { width: screenWidth } = useScreenSize()

    React.useEffect(() => {
        console.log('BudgetList: budgets', budgets)
    }, [budgets])

    return (
        <>
            {
                screenWidth < 768 ? (
                    <>{
                        budgets.length > 0 ? budgets.map((item, index) => (
                            <BudgetItem key={index} budget={item} onClick={() => onClickItem(item)} />
                        )) :
                            <div className='text-center text-gray-500'>{t(`${p}.table.empty`)}</div>
                    }</>
                ) : (
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
                                            <div className={`min-w-max text-${themeColor}-${primaryColorLevel} cursor-pointer select-none font-semibold`} onClick={() => onClickItem(item)}>
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
                )
            }
        </>
    )
}

export default BudgetList