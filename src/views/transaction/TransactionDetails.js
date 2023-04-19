import React, { useEffect, useState } from 'react'
import { getIcon } from 'components/helpers/TwoToneIcon'
import { useTranslation } from 'react-i18next'
import formatCurrency from 'utils/formatCurrency'
import useTransaction from 'utils/hooks/custom/useTransaction'
import DrawerDetails from 'components/helpers/DrawerDetails'
import Image from 'components/helpers/Image'
import PreviewImage from 'components/helpers/PreviewImage'
import { formatDateTime } from 'utils/formatDate'
import { Skeleton } from 'components/ui'

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

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4'>
                <Skeleton className='w-full h-32'/>
                <Skeleton className='w-full h-32'/>
            </div>
        </>
    )
}

const p = 'transaction.details'
function TransactionDetails({ transactionId, isOpen, onClose, onEdit, onDelete }) {
    const { t } = useTranslation()
    const { getTransactionById } = useTransaction()
    const [transaction, setTransaction] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [isOpenPreviewImage, setIsOpenPreviewImage] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const onPreviewImage = (image) => {
        setPreviewImage(image)
        setIsOpenPreviewImage(true)
    }

    const onClosePreviewImage = () => {
        setPreviewImage(null)
        setIsOpenPreviewImage(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const resp = await getTransactionById(transactionId)
            if (resp.status === 'success') {
                setTransaction(resp.data)
            }
            setIsLoading(false)
        }

        if (isOpen) {
            fetchData()
        }
    }, [isOpen, transactionId, getTransactionById])

    return (
        <>
            <DrawerDetails
                isOpen={isOpen}
                title={t(`${p}.title`)}
                subtitle={t(`${p}.subtitle`).replace('{id}', transactionId)}
                closeText={t(`${p}.button.close`)}
                editText={t(`${p}.button.edit`)}
                deleteText={t(`${p}.button.delete`)}
                onEdit={() => onEdit(transaction)}
                onClose={onClose}
                onDelete={() => onDelete(transactionId)}
            >
                {isLoading ? <LoadingSkeleton /> : (
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <div className='flex items-center gap-2'>
                                {getIcon(transaction?.type, 'md')}
                                <div>
                                    <p className='font-bold'>{transaction?.description}</p>
                                    <p>{formatDateTime(new Date(transaction?.date))}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col border-b">
                            <p>{t(`${p}.amount`)}</p>
                            <p className='text-base font-bold text-right'>
                                {formatCurrency(transaction?.amount)}
                            </p>
                        </div>

                        <div className="flex flex-col border-b">
                            <p>{t(`${p}.wallet`)}</p>
                            <p className='font-bold text-right'>
                                {transaction?.wallet?.name}
                            </p>
                        </div>

                        <div className="flex flex-col border-b">
                            <p>{t(`${p}.category`)}</p>

                            {
                                    transaction?.category?.name ? (
                                        <p className='font-bold text-right'>
                                            {transaction?.category?.name}
                                        </p>
                                    ) : (
                                        <p className='italic text-right'>
                                            {t(`${p}.noCategory`)}
                                        </p>
                                    )
                                }
                        </div>

                        {transaction?.type === 'expense' && (
                            <div className="flex flex-col border-b">
                                <p>{t(`${p}.budget`)}</p>

                                {
                                    transaction?.budget?.name ? (
                                        <p className='font-bold text-right'>
                                            {transaction?.budget?.name}
                                        </p>
                                    ) : (
                                        <p className='italic text-right'>
                                            {t(`${p}.noBudget`)}
                                        </p>
                                    )
                                }
                            </div>
                        )}

                        <div className="flex flex-col">
                            <p className='mb-4'>{t(`${p}.evidence`)}</p>


                            { transaction?.evidence?.length > 0 ? (
                                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {transaction.evidence.map((item, index) => (
                                        <Image
                                            key={index}
                                            src={item}
                                            className='w-full max-h-32 object-cover'
                                            onPreview={() => onPreviewImage(item)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className='italic'>
                                    {t(`${p}.noEvidence`)}
                                </p>
                            )}
                        </div>

                    </div>
                )}
            </DrawerDetails>

            <PreviewImage isOpen={isOpenPreviewImage} onClose={onClosePreviewImage} image={previewImage}  />
        </>
    )
}

export default TransactionDetails