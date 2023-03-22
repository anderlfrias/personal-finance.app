import React, { useEffect, useState } from 'react'
import TransactionItem from 'views/transaction/TransactionItem'
import TowToneIcon from 'components/helpers/TwoToneIcon'
import { Button, Table } from 'components/ui'
import { useTranslation } from 'react-i18next'
import { HiArrowDown, HiArrowUp, HiSwitchHorizontal } from 'react-icons/hi'
import { MdDoubleArrow } from "react-icons/md";
import formatCurrency from 'utils/formatCurrency'
import useScreenSize from 'utils/hooks/custom/useScreenSize'

const { Tr, Th, Td, THead, TBody } = Table
const p = 'transaction'
function TransactionList({ className, transactions, onClickItem, ...rest}) {
    const { t } = useTranslation()
    const { width: screenWidth } = useScreenSize()
    const [viewTable, setViewTable] = useState(false)

    const getIcon = (type) => {
        switch (type) {
            case 'income':
                return <TowToneIcon size={'sm'} color={'emerald'} icon={<HiArrowUp className='rotate-45' />}/>
            case 'expense':
                return <TowToneIcon size={'sm'} color={'red'} icon={<HiArrowDown className='rotate-45' />}/>
            default:
                return <TowToneIcon size={'sm'} color={'emerald'} icon={<HiSwitchHorizontal />}/>
        }
    }

    useEffect(() => {
        if (screenWidth >= 768) setViewTable(true)
        if (screenWidth < 768) setViewTable(false)
    }, [screenWidth])

    return (
        <>
            {
                viewTable ? (
                    <Table>
                        <THead>
                            <Tr>
                                <Th />
                                <Th>{t(`${p}.table.date`)}</Th>
                                <Th>{t(`${p}.table.description`)}</Th>
                                <Th>{t(`${p}.table.wallet`)}</Th>
                                <Th>{t(`${p}.table.category`)}</Th>
                                <Th>{t(`${p}.table.amount`)}</Th>
                                <Th />
                            </Tr>
                        </THead>
                        <TBody>
                            {
                                transactions.length > 0 ? transactions.map((transaction, index) => (
                                    <Tr key={index}>
                                        <Td>{getIcon(transaction.type)}</Td>
                                        <Td>{new Date(transaction.date).toLocaleString()}</Td>
                                        <Td>{transaction.description}</Td>
                                        <Td>{transaction.wallet.name}</Td>
                                        <Td>{transaction?.category?.name || 'N/A'}</Td>
                                        <Td>
                                            <div className='min-w-max'>
                                                <p className="font-bold">
                                                    {transaction.type === 'expense' && '-'} {formatCurrency(transaction.amount)}
                                                </p>
                                            </div>
                                        </Td>
                                        <Td>
                                            <div className='flex gap-2'>
                                                <Button variant='twoTone' size='sm' icon={<MdDoubleArrow />} onClick={() => onClickItem(transaction)} />
                                            </div>
                                        </Td>
                                    </Tr>
                                )) :
                                <Tr>
                                    <Td colSpan={7} className='text-center'>
                                        {t(`${p}.table.empty`)}
                                    </Td>
                                </Tr>
                            }
                        </TBody>
                    </Table>
                ) : (
                    <>{
                        transactions.length > 0 ? transactions.map((transaction, index) => (
                            <TransactionItem key={index} transaction={transaction} onClick={() => onClickItem(transaction)} />
                        )) :
                        <div className='text-center'>
                            {t(`${p}.table.empty`)}
                        </div>
                    }</>
                )
            }
        </>
    )
}

export default TransactionList