import React, { useEffect, useState } from "react";
import DrawerDetails from "components/helpers/DrawerDetails";
import { useTranslation } from "react-i18next";
import TransactionItem from "views/transaction/TransactionItem";
import { Avatar, Skeleton } from "components/ui";
import { HiCreditCard } from "react-icons/hi";
import useTransaction from "utils/hooks/custom/useTransaction";
import formatCurrency from "utils/formatCurrency";
import SummaryCard from "components/helpers/SummaryCard";

const LoadingSkeleton = () => {
    return (
        <>
            <div className='flex gap-2'>
                <Skeleton className='w-10 h-10'/>
                <div className='flex flex-col gap-1'>
                    <Skeleton className='w-32 h-4'/>
                    <Skeleton className='w-24 h-4'/>
                </div>
            </div>

            <div className='flex flex-col gap-4 mt-4'>
                <Skeleton className='w-full h-10'/>
                <Skeleton className='w-full h-10'/>
                <Skeleton className='w-full h-10'/>
                <Skeleton className='w-full h-10'/>
            </div>
        </>
    )
}

const p = "category.details";
function CategoryDetails({ category, isOpen, onClose, onEdit, onDelete }) {
    const { t } = useTranslation()
    const { getTransactionByCategoryId } = useTransaction()
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
          const resp = await getTransactionByCategoryId(category?.id)
          if (resp.status === 'success') {
            setTransactions(resp.data.transactions)
          }
        }
        fetchTransactions()
    }, [getTransactionByCategoryId, category?.id])

    return (
        <>
            <DrawerDetails
                isOpen={isOpen}
                title={t(`${p}.title`)}
                subtitle={t(`${p}.subtitle`).replace('{id}', category?.id)}
                closeText={t(`${p}.button.close`)}
                editText={t(`${p}.button.edit`)}
                deleteText={t(`${p}.button.delete`)}
                onEdit={() => onEdit(category)}
                onClose={onClose}
                onDelete={onDelete}
            >
                {category ? <>
                    <div className="flex flex-col gap-4">
                      <div className='flex items-center gap-2'>
                        <div className='min-w-max'>
                            <Avatar size='sm' shape='circle' icon={<HiCreditCard />} />
                        </div>
                        <div className='flex flex-col max-h-14 overflow-hidden'>
                            <h6 className="text-sm font-bold">
                                {category.name}
                            </h6>
                            <p className="multiline-ellipsis text-xs text-gray-500 flex items-center">
                                {category.description}
                            </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <p>{t(`${p}.transactions`)}</p>
                        { transactions?.length > 0 ? transactions?.map(transaction => (
                            <TransactionItem key={transaction.id} transaction={transaction} />
                        )):
                            <p className="italic">{t(`${p}.noTransactions`)}</p>
                        }
                      </div>
                    </div>
                </>
                : <LoadingSkeleton />}
            </DrawerDetails>
        </>
    )
}

export default CategoryDetails;