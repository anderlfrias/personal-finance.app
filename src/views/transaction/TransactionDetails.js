import React, { useEffect, useState } from 'react'
import { getIcon } from 'components/helpers/TwoToneIcon'
import { useTranslation } from 'react-i18next'
import formatCurrency from 'utils/formatCurrency'
import useTransaction from 'utils/hooks/custom/useTransaction'
import DrawerDetails from 'components/helpers/DrawerDetails'
import Image from 'components/helpers/Image'
import PreviewImage from 'components/helpers/PreviewImage'

const p = 'transaction.details'
function TransactionDetails({ transactionId, isOpen, onClose, onEdit, onDelete }) {
    const { t } = useTranslation()
    const { getTransactionById } = useTransaction()
    const [transaction, setTransaction] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [isOpenPreviewImage, setIsOpenPreviewImage] = useState(false)

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
                        <p className='mb-2'>{t(`${p}.evidence`)}</p>


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
            </DrawerDetails>

            <PreviewImage isOpen={isOpenPreviewImage} onClose={onClosePreviewImage} image={previewImage}  />
        </>
    )
}

export default TransactionDetails