import React, { useEffect, useState } from 'react'
import TransactionItem from 'views/transaction/TransactionItem'
import { getIcon } from 'components/helpers/TwoToneIcon'
import { Table, useConfig } from 'components/ui'
import { useTranslation } from 'react-i18next'
import formatCurrency from 'utils/formatCurrency'
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import { formatDateTime } from 'utils/formatDate'

const { Tr, Th, Td, THead, TBody } = Table

// const options = [
//     { value: 5, label: '5 / page' },
//     { value: 10, label: '10 / page' },
//     { value: 20, label: '20 / page' },
//     { value: 50, label: '50 / page' },
// ]

const p = 'transaction'
function TransactionList({ className, transactions, onClickItem, paginationProps, ...rest}) {
	const { themeColor, primaryColorLevel } = useConfig()
    const { t } = useTranslation()
    const { width: screenWidth } = useScreenSize()
    const [viewTable, setViewTable] = useState(false)

    // const [pageSize, setPageSize] = useState(options[0].value)

    // const onPageSelect = ({ value }) => {
    //     setPageSize(value)
    // }

    useEffect(() => {
        if (screenWidth >= 768) setViewTable(true)
        if (screenWidth < 768) setViewTable(false)
    }, [screenWidth])

    useEffect(() => {
        console.log('transactions', transactions)
    }, [transactions])

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
                                        <Td>
                                            <div className='min-w-[130px]'>{formatDateTime(new Date(transaction.date))}</div>
                                        </Td>
                                        <Td>{transaction.description}</Td>
                                        <Td>{transaction?.wallet?.name}</Td>
                                        <Td>{transaction?.category?.name || 'N/A'}</Td>
                                        <Td>
                                            <div className='min-w-max'>
                                                <p className="font-bold">
                                                    {transaction.type === 'expense' && '-'}{formatCurrency(transaction.amount)}
                                                </p>
                                            </div>
                                        </Td>
                                        <Td>
                                            <div className={`min-w-max text-${themeColor}-${primaryColorLevel} cursor-pointer select-none font-semibold`} onClick={() => onClickItem(transaction)}>
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
                    <div className='overflow-x-auto'>{
                        transactions.length > 0 ? transactions.map((transaction, index) => (
                            <TransactionItem key={index} transaction={transaction} onClick={() => onClickItem(transaction)} />
                        )) :
                        <div className='text-center'>
                            {t(`${p}.table.empty`)}
                        </div>
                    }</div>
                )
            }

            {/* <div className='flex items-center justify-end mt-4'>
                <Pagination onChange={paginationProps.onChange} pageSize={paginationProps.top} total={paginationProps.total}  />
            </div> */}
        </>
    )
}

export default TransactionList