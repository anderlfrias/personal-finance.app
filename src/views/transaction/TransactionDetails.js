import { Button, Drawer } from 'components/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'

const p = 'transaction.details'
function TransactionDetails({ transactionId, isOpen, onClose, onSubmit }) {
    const { t } = useTranslation()

    const Title = (
        <div className="">
            <h4>{t(`${p}.title`)}</h4>
            <p className="text-gray-500">{t(`${p}.subtitle`).replace('{id}', transactionId)}</p>
        </div>
    )

    const Footer = (
        <div className="flex text-right w-full">
            <Button size="sm" className="mr-2" onClick={onClose}>
                {t(`${p}.button.close`)}
            </Button>
            <Button size="sm" variant="solid" onClick={onSubmit}>
                {t(`${p}.button.edit`)}
            </Button>
        </div>
    )
    return (
        <>
            <Drawer
                title={Title}
                isOpen={isOpen}
                onClose={onClose}
                footer={Footer}
            >
            </Drawer>
        </>
    )
}

export default TransactionDetails