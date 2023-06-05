import React, { useEffect, useState } from 'react'
import TransactionItem from 'views/transaction/TransactionItem'
import { getIcon } from 'components/helpers/TwoToneIcon'
import { Skeleton, Table, useConfig } from 'components/ui'
import { useTranslation } from 'react-i18next'
import formatCurrency from 'utils/formatCurrency'
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import { formatDateTime } from 'utils/formatDate'
import { TableRowSkeleton } from 'components/shared'

const { Tr, Th, Td, THead, TBody } = Table


const SkeletonItem = () => {
    return (
        <div className='flex gap-2'>
            <div className='flex w-min'>
                <Skeleton className='w-10 h-10'/>
            </div>
            <div className='flex flex-col gap-1'>
                <Skeleton className='w-48 h-4'/>
                <Skeleton className='w-24 h-4'/>
            </div>
            <div className='flex justify-end items-center w-full'>
                <Skeleton className='w-14 h-8'/>
            </div>
        </div>
    )
}

const p = 'transaction'
function TransactionList({ transactions, onClickItem, loading}) {
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
                                transactions.map((transaction, index) => (
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
                                ))}
                                {transactions.length === 0 && !loading &&
                                    <Tr>
                                        <Td colSpan={7} className='text-center'>
                                            {t(`${p}.table.empty`)}
                                        </Td>
                                    </Tr>
                                }
                        </TBody>
                        {loading && (
                            <TableRowSkeleton
                                columns={7}
                                rows={5}
                                avatarProps={{
                                    width: 40,
                                    height: 40,
                                }}
                            />
                        )}
                    </Table>
                ) : (
                    <div className='overflow-x-auto'>{
                        transactions.map((transaction, index) => (
                            <TransactionItem key={index} transaction={transaction} onClick={() => onClickItem(transaction)} />
                        ))}

                        {transactions.length === 0 && !loading &&
                            <div className='text-center'>
                                {t(`${p}.table.empty`)}
                            </div>
                        }

                        {loading && (
                            <div className='flex flex-col gap-4'>
                                <SkeletonItem />
                                <SkeletonItem />
                                <SkeletonItem />
                                <SkeletonItem />
                                <SkeletonItem />
                            </div>
                        )}
                    </div>
                )
            }

            {/* <div className='flex items-center justify-end mt-4'>
                <Pagination onChange={paginationProps.onChange} pageSize={paginationProps.top} total={paginationProps.total}  />
            </div> */}
        </>
    )
}

export default TransactionList