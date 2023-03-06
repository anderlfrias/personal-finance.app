import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Dialog } from 'components/ui'
import { useTranslation } from 'react-i18next'
import { HiPlusCircle } from 'react-icons/hi'
import useTransaction from 'utils/hooks/custom/useTransaction'
import SummaryCard from 'components/helpers/SummaryCard'
import TransactionItem from 'components/helpers/TransactionItem'

function Transaction() {
    const { t } = useTranslation()
    const { getTransactions } = useTransaction()
    const [transactions, setTransactions] = useState([])
    const [ isFormOpen, setIsFormOpen ] = useState(false)

    const openForm = () => {
        setIsFormOpen(true)
    }

    const onCloseForm = () => {
        setIsFormOpen(false)
    }

    const fetchData = useCallback(async () => {
        const resp = await getTransactions();
        console.log(resp);
        if (resp.status === 'success') {
            setTransactions(resp.data);
        }
    }, [getTransactions])

    useEffect(() => {
        fetchData();
    }, [fetchData])
    return (
        <>
            <div className='container mx-auto'>
                <div className='sm:flex justify-between mb-4'>
                    <h2>
                        {t(`transaction.title`)}
                    </h2>
                    <Button variant='solid' icon={<HiPlusCircle />} onClick={openForm}>
                        {t(`transaction.button.create`)}
                    </Button>
                </div>

                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-2'>
                        {t(`transaction.summary.title`)}
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <SummaryCard title={t(`transaction.summary.income`)} type='income' amount='$5000.00' />
                        <SummaryCard title={t(`transaction.summary.expense`)} type='expense' amount='$1500.00' />
                        <SummaryCard title={t(`transaction.summary.balance`)} type='balance' amount='$3500.00' />
                    </div>
                </div>

                <Card className='mb-6'>
                    <h3 className='text-lg font-semibold mb-2'>
                        {t(`transaction.detail.title`)}
                    </h3>

                    {
                        transactions.map((transaction, index) => (
                            <TransactionItem key={index} transaction={transaction} />
                        ))
                    }
                </Card>
            </div>

            <Dialog
                isOpen={isFormOpen}
                onClose={onCloseForm}
                onRequestClose={onCloseForm}
                shouldCloseOnOverlayClick={false}
            >
                <h2 className='text-xl font-semibold mb-4'>{t(`transation.form.title`)}</h2>
            </Dialog>
        </>
    )
}

export default Transaction