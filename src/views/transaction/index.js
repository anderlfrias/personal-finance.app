import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Drawer } from 'components/ui'
import { useTranslation } from 'react-i18next'
import { HiOutlineAdjustments, HiPlusCircle } from 'react-icons/hi'
import useTransaction from 'utils/hooks/custom/useTransaction'
import SummaryCard from 'components/helpers/SummaryCard'
import TransactionForm from './TransactionForm'
import openNotification from 'utils/openNotification'
import formatCurrency from 'utils/formatCurrency';
import TransactionList from './TransactionList'
import TransactionFilter from './TransactionFilter'
import TransactionDetails from './TransactionDetails'
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import { ConfirmDialog } from 'components/shared'
import CreateButton from 'components/helpers/CreateButton'
import DisplayFilter from './DisplayFilter'
import { getLastHoursOfDay, getStartHoursOfDay } from 'utils/date'

const p = 'transaction' // path to translation file

function Transaction() {
    const { t } = useTranslation()
    const { getTransactions, createTransaction, updateTransaction, deleteTransaction } = useTransaction()
    const { width: screenWidth } = useScreenSize()
    const [transactions, setTransactions] = useState([])
    const [ isFormOpen, setIsFormOpen ] = useState(false)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [difference, setDifference] = useState(0)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedTransactionId, setSelectedTransactionId] = useState(null)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [query, setQuery] = useState(`startDate=${getStartHoursOfDay(new Date()).toISOString()}&endDate=${getLastHoursOfDay(new Date()).toISOString()}`)
    const [top] = useState(10)
    const [step, setStep] = useState(0)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    const onCloseConfirm = () => setIsOpenConfirm(false)
    const openConfirm = () => setIsOpenConfirm(true)

    const openDetail = (transaction) => {
        setSelectedTransactionId(transaction.id)
        setIsDetailOpen(true)
    }

    const onCloseDetail = () => {
        setSelectedTransactionId(null)
        setIsDetailOpen(false)
    }
    const openFilter = () => setIsFilterOpen(true)
    const onCloseFilter = () => setIsFilterOpen(false)

    const onFilter = (query) => {
        setQuery(query)
        fetchData(query)
    }

    const openForm = () => {
        setIsFormOpen(true)
    }

    const onCloseForm = () => {
        setIsFormOpen(false)
        setIsEditing(false)
        setSelectedTransaction(null)
        setSelectedTransactionId(null)
    }

    const onSubmit = async (values) => {
        const data = {
            ...values,
            date: new Date(values.date).toISOString()
        }

        if (isEditing) {
            await onUpdate(data)
            return
        }

        await onCreate(data);
    }

    const onCreate = async (data) => {
        const resp = await createTransaction(data)

        if (resp.status === 'success') {
            onCloseForm()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.create`) })
            fetchData(query)
            return
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(resp.message || `${p}.message.error.create`) })
        }
    }

    const onUpdate = async (data) => {
        const resp = await updateTransaction(selectedTransactionId, data)

        if (resp.status === 'success') {
            onCloseForm();
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.update`)})
            fetchData(query)
            return;
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(resp.message || `${p}.message.error.update`) })
        }
    }

    const onDelete = async (id) => {
        const resp = await deleteTransaction(id)

        if (resp.status === 'success') {
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.delete`) })
            onCloseDetail()
            onCloseConfirm()
            fetchData(query)
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(resp.message || `${p}.message.error.delete`) })
        }
    }

    const onConfirmDelete = () => {
        onDelete(selectedTransactionId)
    }

    const handleEdit = (transaction) => {
        onCloseDetail()
        setSelectedTransactionId(transaction.id)
        setSelectedTransaction({
            ...transaction,
            date: transaction?.date ? new Date(transaction.date) : new Date(),
            wallet: transaction.wallet?.id || '',
            sourceWallet: transaction.sourceWallet?.id || '',
            targetWallet: transaction.targetWallet?.id || '',
            category: transaction.category?.id || '',
            budget: transaction.budget?.id || '',
            evidence: transaction.evidence || [],
        })
        setIsEditing(true)
        openForm()
    }

    const onPaginationChange = (page) => {
        setStep(page - 1)
    }

    const fetchData = useCallback(async (q = '') => {
        setLoading(true)
        setTransactions([])
        // const query = `top=${top}&skip=${step * top}&${q}`
        const resp = await getTransactions(q);
        if (resp.status === 'success') {
            setTransactions(resp.data.transactions);
            setTotal(resp.data.total)
        }
        setLoading(false)
    }, [getTransactions])

    useEffect(() => {
        fetchData(query);
    }, [fetchData, query])

    useEffect(() => {
        const incomes = transactions.filter(transaction => transaction.type === 'income')
        const expenses = transactions.filter(transaction => transaction.type === 'expense')
        setTotalIncome(incomes.reduce((total, income) => total + income.amount, 0))
        setTotalExpense(expenses.reduce((total, expense) => total + expense.amount, 0))
    }, [transactions])

    useEffect(() => {
        setDifference(totalIncome - totalExpense)
    }, [totalIncome, totalExpense])
    return (
        <>
            <div className='container mx-auto'>
                <div className='flex flex-wrap justify-between mb-4'>
                    <h2>
                        {t(`${p}.title`)}
                    </h2>

                    <div className='flex gap-2 '>
                        <Button size='sm' icon={<HiOutlineAdjustments className='rotate-90' />} onClick={openFilter} >
                            {t(`${p}.filter.title`)}
                        </Button>

                        <Button className='hidden sm:flex' size='sm' variant='solid' icon={<HiPlusCircle />} onClick={openForm}>
                            {t(`${p}.button.create`)}
                        </Button>
                    </div>
                </div>

                <DisplayFilter query={query} setQuery={setQuery} />

                {/* <Loading loading={loading} type='cover'> */}

                <div className='mb-6'>
                    {/* <h3 className='text-lg font-semibold mb-2'>
                        {t(`${p}.summary.title`)}
                    </h3> */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <SummaryCard title={t(`${p}.summary.income`)} type='income' amount={formatCurrency(totalIncome)} />
                        <SummaryCard title={t(`${p}.summary.expense`)} type='expense' amount={formatCurrency(totalExpense)} />
                        <SummaryCard title={t(`${p}.summary.difference`)} type='difference' amount={formatCurrency(difference)} />
                    </div>
                </div>

                <Card className='mb-16 sm:mb-4'>
                    <div className='sm:flex justify-between mb-2'>
                        {/* <h3 className='text-lg font-semibold mb-2 sm:mb-0'>
                            {t(`${p}.detail.title`)}
                        </h3> */}
                    </div>
                    <TransactionList
                        loading={loading}
                        transactions={transactions}
                        onClickItem={openDetail}
                        paginationProps={{
                            onChange: onPaginationChange,
                            total: total,
                            step: step + 1,
                            top: top,
                        }}
                        onPaginationChange={onPaginationChange}
                    />
                </Card>
                {/* </Loading> */}
            </div>

            {/* Form */}
            <Drawer
                title={t(`${p}.form.title`)}
                isOpen={isFormOpen}
                onClose={onCloseForm}
                width={ screenWidth >= 768 ? 500 : screenWidth}
            >
                <TransactionForm onSubmit={onSubmit} onCancel={onCloseForm} initialValues={selectedTransaction} isEditing={isEditing} />
            </Drawer>

            <TransactionFilter isOpen={isFilterOpen} onClose={onCloseFilter} onSubmit={onFilter} />

            <TransactionDetails
                isOpen={isDetailOpen}
                onClose={onCloseDetail}
                transactionId={selectedTransactionId}
                onDelete={openConfirm}
                onEdit={handleEdit}
            />

            <ConfirmDialog
                type='danger'
                title={t(`${p}.confirm.delete.title`)}
                onCancel={onCloseConfirm}
                onClose={onCloseConfirm}
                onConfirm={onConfirmDelete}
                isOpen={isOpenConfirm}
                confirmButtonColor='red-500'
                confirmText={t(`${p}.confirm.delete.confirm`)}
                cancelText={t(`${p}.confirm.delete.cancel`)}
            >
                {t(`${p}.confirm.delete.message`)}
            </ConfirmDialog>

            <CreateButton onClick={openForm} />
        </>
    )
}

export default Transaction