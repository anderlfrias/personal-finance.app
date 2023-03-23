import React, { useEffect, useState } from 'react'
import TransactionItem from 'views/transaction/TransactionItem'
import { getIcon } from 'components/helpers/TwoToneIcon'
import { Button, Table } from 'components/ui'
import { useTranslation } from 'react-i18next'
import formatCurrency from 'utils/formatCurrency'
import useScreenSize from 'utils/hooks/custom/useScreenSize'

const { Tr, Th, Td, THead, TBody } = Table
const p = 'transaction'
function TransactionList({ className, transactions, onClickItem, ...rest}) {
    const { t } = useTranslation()
    const { width: screenWidth } = useScreenSize()
    const [viewTable, setViewTable] = useState(false)

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
                                            <div className='min-w-max text-indigo-600 cursor-pointer select-none font-semibold' onClick={() => onClickItem(transaction)}>
                                                {t(`${p}.table.details`)}
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