import { getIcon } from 'components/helpers/TwoToneIcon'
import { Button, Drawer } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineTrash } from 'react-icons/hi'
import formatCurrency from 'utils/formatCurrency'
import useTransaction from 'utils/hooks/custom/useTransaction'
import useScreenSize from 'utils/hooks/custom/useScreenSize'

const p = 'transaction.details'
function TransactionDetails({ transactionId, isOpen, onClose, onEdit, onDelete }) {
    const { width: screenWidth } = useScreenSize()
    const { t } = useTranslation()
    const { getTransactionById } = useTransaction()
    const [transaction, setTransaction] = useState(null)

    const Title = (
        <div className="">
            <h4>{t(`${p}.title`)}</h4>
            <p className="text-gray-500">{t(`${p}.subtitle`).replace('{id}', transactionId)}</p>
        </div>
    )

    const Footer = (
        <div className="flex justify-between w-full">
            <Button size="sm" variant='solid' color='red-500' icon={<HiOutlineTrash />} className="mr-2" onClick={() => onDelete(transactionId)}>
                {t(`${p}.button.delete`)}
            </Button>
            <div>
                <Button size="sm" className="mr-2" onClick={onClose}>
                    {t(`${p}.button.close`)}
                </Button>
                <Button size="sm" variant="solid" onClick={onEdit}>
                    {t(`${p}.button.edit`)}
                </Button>
            </div>
        </div>
    )

    useEffect(() => {
        const fetchData = async () => {
            const resp = await getTransactionById(transactionId)
            console.log(resp)
            if (resp.status === 'success') {
                setTransaction(resp.data)
            }
        }

        if (isOpen) {
            fetchData()
        }
    }, [isOpen, transactionId, getTransactionById])

    return (
        <>
            <Drawer
                title={Title}
                isOpen={isOpen}
                onClose={onClose}
                onRequestClose={onClose}
                footer={Footer}
                width={ screenWidth >= 768 ? 500 : screenWidth}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p>{t(`${p}.type`)}</p>
                        <div className='flex items-center gap-2'>
                            {getIcon(transaction?.type)}
                            <p className='font-bold'>
                                {t(`${p}.${transaction?.type}`)}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p>{t(`${p}.amount`)}</p>
                        <p className='font-bold'>
                            {formatCurrency(transaction?.amount)}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p>{t(`${p}.date`)}</p>
                        <p className='font-bold'>
                            {new Date(transaction?.date).toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p>{t(`${p}.description`)}</p>
                        <p className='font-bold'>
                            {transaction?.description}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p>{t(`${p}.wallet`)}</p>
                        <p className='font-bold'>
                            {transaction?.wallet?.name}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p>{t(`${p}.category`)}</p>

                        {
                                transaction?.category?.name ? (
                                    <p className='font-bold'>
                                        {transaction?.category?.name}
                                    </p>
                                ) : (
                                    <p className='italic'>
                                        {t(`${p}.noCategory`)}
                                    </p>
                                )
                            }
                    </div>

                    {transaction?.type === 'expense' && (
                        <div className="flex flex-col">
                            <p>{t(`${p}.budget`)}</p>

                            {
                                transaction?.budget?.name ? (
                                    <p className='font-bold'>
                                        {transaction?.budget?.name}
                                    </p>
                                ) : (
                                    <p className='italic'>
                                        {t(`${p}.noBudget`)}
                                    </p>
                                )
                            }
                        </div>
                    )}

                    <div className="flex flex-col">
                        <p>{t(`${p}.evidence`)}</p>

                        {
                            transaction?.evidence ? (
                                <p className='font-bold'>
                                    Aqui van las evidencias
                                </p>
                            ) : (
                                <p className='italic'>
                                    {t(`${p}.noEvidence`)}
                                </p>
                            )
                        }
                    </div>

                </div>
            </Drawer>
        </>
    )
}

export default TransactionDetails