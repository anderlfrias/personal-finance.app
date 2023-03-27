import React from "react";
import DrawerDetails from "components/helpers/DrawerDetails";
import { useTranslation } from "react-i18next";
import formatCurrency from "utils/formatCurrency";
import State from "./State";
import TransactionItem from "views/transaction/TransactionItem";
import TowToneIcon from "components/helpers/TwoToneIcon";
import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { getRemain, getSpent, getState, isActive } from "./utils";

const p = "budget.details";
function BudgetDetails({ budget, isOpen, onClose, onEdit, onDelete }) {
    const { t } = useTranslation()

    return (
        <>
            <DrawerDetails
                isOpen={isOpen}
                title={t(`${p}.title`)}
                subtitle={t(`${p}.subtitle`).replace('{id}', budget?.id)}
                closeText={t(`${p}.button.close`)}
                editText={t(`${p}.button.edit`)}
                deleteText={t(`${p}.button.delete`)}
                onEdit={() => onEdit(budget)}
                onClose={onClose}
                onDelete={onDelete}
            >
                {budget && <>
                    <div className="flex flex-col gap-4">

                    <div className="flex items-center gap-2">
                        <div className="min-w-max">
                        {
                            isActive(budget) ?
                            <TowToneIcon icon={<HiLockOpen />} color='emerald' /> :
                            <TowToneIcon icon={<HiLockClosed />} color='gray' />
                        }
                        </div>
                        <div className="">
                            <h6 className='font-bold'>
                                {budget.name}
                            </h6>
                            <State className="items-start" state={getState(budget)} />
                        </div>
                    </div>

                        <div className="flex flex-col gap-1 border-b">
                            <p>{t(`${p}.daterange`)}</p>
                            <p className='font-bold text-right'>
                                {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                            </p>
                        </div>

                        {/* <div className="flex flex-col gap-1 border-b">
                            <p>{t(`${p}.name`)}</p>
                            <p className='font-bold text-right'>
                                {budget.name}
                            </p>
                        </div> */}

                        <div className="flex flex-col gap-1 border-b">
                            <p>{t(`${p}.amount`)}</p>
                            <p className='font-bold text-right'>
                                {formatCurrency(budget.amount)}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1 border-b">
                            <p>{t(`${p}.spent`)}</p>
                            <p className='font-bold text-right'>
                                {formatCurrency(getSpent(budget))}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1 border-b">
                            <p>{t(`${p}.remain`)}</p>
                            <p className='font-bold text-right'>
                                {formatCurrency(getRemain(budget))}
                            </p>
                        </div>

                        {/* <div className="flex flex-col gap-1 border-b">
                            <p>{t(`${p}.state`)}</p>
                            <State className="justify-end" state={getState(budget)} />
                        </div> */}

                        <div className="flex flex-col gap-1">
                            <p>{t(`${p}.transactions`)}</p>
                            { budget.transactions.length > 0 ? budget.transactions.map(transaction => (
                                <TransactionItem key={transaction.id} transaction={transaction} />
                            )):
                                <p className="italic">{t(`${p}.noTransactions`)}</p>
                            }
                        </div>
                    </div>
                </>
                }
            </DrawerDetails>
        </>
    )
}

export default BudgetDetails;