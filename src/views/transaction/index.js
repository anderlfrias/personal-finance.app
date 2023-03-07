import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Card, Table } from 'components/ui'
import { useTranslation } from 'react-i18next'
import { HiArrowDown, HiArrowUp, HiOutlineTrash, HiPencilAlt, HiPlusCircle, HiSwitchHorizontal } from 'react-icons/hi'
import useTransaction from 'utils/hooks/custom/useTransaction'
import SummaryCard from 'components/helpers/SummaryCard'
import TransactionItem from 'components/helpers/TransactionItem'
import TransactionForm from './TransactionForm'
import openNotification from 'utils/openNotification'
import formatCurrency from 'utils/formatCurrency';

const { Tr, Th, Td, THead, TBody } = Table

const p = 'transaction' // path to translation file

function Icon ({type, className = ''}) {
    switch (type) {
        case 'income':
            return <Avatar className={`${className} bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100 text-emerald-600`} icon={<HiArrowUp className='rotate-45' />} />
        case 'expense':
            return <Avatar className={`${className} bg-red-100 dark:bg-red-500/20 dark:text-red-100 text-red-600`} icon={<HiArrowDown className='rotate-45' />} />
        default:
            return <Avatar className={`${className} bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-100 text-indigo-600`} icon={<HiSwitchHorizontal />} />
    }
}

function Transaction() {
    const { t } = useTranslation()
    const { getTransactions, createTransaction } = useTransaction()
    const [transactions, setTransactions] = useState([])
    const [ isFormOpen, setIsFormOpen ] = useState(false)

    const openForm = () => {
        setIsFormOpen(true)
    }

    const onCloseForm = () => {
        setIsFormOpen(false)
    }

    const onSubmit = async (values) => {
        const data = {
            ...values,
            date: new Date(values.date).toISOString()
        }
        console.log(data);

        await onCreate(data);
    }

    const onCreate = async (data) => {
        const resp = await createTransaction(data)

        if (resp.status === 'success') {
            onCloseForm()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.create`) })
            fetchData()
        }

        if (resp.status === 'failed') {
            console.log(resp.message)
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(resp.message || `${p}.message.error.create`) })
        }
    }

    const onEdit = (transaction) => {
        console.log('edit', transaction)
    }

    const onDelete = (transaction) => {
        console.log('delete', transaction)
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
                        {t(`${p}.title`)}
                    </h2>
                    <Button variant='solid' icon={<HiPlusCircle />} onClick={openForm}>
                        {t(`${p}.button.create`)}
                    </Button>
                </div>

                {
                    isFormOpen && (
                        <Card>
                            <h2 className='text-xl font-semibold mb-4'>{t(`${p}.form.title`)}</h2>
                            <TransactionForm onSubmit={onSubmit} onCancel={onCloseForm} initialValues={{}} />
                        </Card>
                    )
                }

                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-2'>
                        {t(`${p}.summary.title`)}
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <SummaryCard title={t(`${p}.summary.income`)} type='income' amount='$5000.00' />
                        <SummaryCard title={t(`${p}.summary.expense`)} type='expense' amount='$1500.00' />
                        <SummaryCard title={t(`${p}.summary.balance`)} type='balance' amount='$3500.00' />
                    </div>
                </div>

                <Card className='mb-6'>
                    <h3 className='text-lg font-semibold mb-2'>
                        {t(`${p}.detail.title`)}
                    </h3>

                    {
                        transactions.map((transaction, index) => (
                            <TransactionItem key={index} transaction={transaction} />
                        ))
                    }
                </Card>

                <Card>
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
                                        <Td><Icon type={transaction.type} /></Td>
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
                                            <div className='flex gap-2'>
                                                <Button variant='twoTone' size='sm' icon={<HiOutlineTrash />} onClick={() => onDelete(transaction)} color={'red-500'} />
                                                <Button variant='twoTone' size='sm' icon={<HiPencilAlt />} onClick={() => onEdit(transaction)} />
                                            </div>
                                        </Td>
                                    </Tr>
                                )) :
                                <Tr>
                                    <Td colSpan={4} className='text-center'>
                                        {t(`${p}.table.empty`)}
                                    </Td>
                                </Tr>
                            }
                        </TBody>
                    </Table>
                </Card>
            </div>
        </>
    )
}

export default Transaction