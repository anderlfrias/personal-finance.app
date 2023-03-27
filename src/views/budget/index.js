import { ConfirmDialog, Loading } from 'components/shared'
import { Button, Card, Dialog, Input } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineAdjustments, HiPlusCircle, HiSearch } from 'react-icons/hi'
import useBudget from 'utils/hooks/custom/useBudget'
import openNotification from 'utils/openNotification'
import BudgetDetails from './BudgetDetails'
import BudgetForm from './BudgetForm'
import BudgetList from './BudgetList'

const p = 'budget' // prefix for translation key
function Budget() {
    const { t } = useTranslation();
    const { getBudgets, createBudget, deleteBudget, updateBudget } = useBudget()
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [selectedBudget, setSelectedBudget] = useState(null)
    const [editing, setEditing] = useState(false)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const onDetails = (budget) => {
        setSelectedBudget(budget)
        setIsDetailOpen(true)
    }

    const onCloseDetail = () => {
        setSelectedBudget(null)
        setIsDetailOpen(false)
    }

    const onCloseConfirm = () => setIsOpenConfirm(false)

    const openForm = () => {
        setIsFormOpen(true)
    }

    const onCloseForm = () => {
        setSelectedBudget(null)
        setIsFormOpen(false)
    }

    const onSubmit = async(values) => {
        console.log('onSubmit', values)
        const data = {
            ...values,
            amount: parseFloat(values.amount),
            startDate: new Date(values.dateRange[0]).toISOString(),
            endDate: new Date(values.dateRange[1]).toISOString(),
        }
        delete data.dateRange

        if (!editing) return await Create(data)
        if (editing) return await Update(selectedBudget.id, data)
    }

    const Create = async(data) => {
        console.log('onCreate', data)
        const resp = await createBudget(data)
        console.log('res', resp)

        if (resp.status === 'success') {
            onCloseForm()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.create`)})
            await fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.create`)})
        }
    }

    const Update = async(id, data) => {
        console.log('onUpdate', data)
        const resp = await updateBudget(id, data)
        console.log('res', resp)

        if (resp.status === 'success') {
            onCloseForm()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.update`)})
            await fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.update`)})
        }
    }

    const Delete = async(id) => {
        const resp = await deleteBudget(id)

        if (resp.status === 'success') {
            onCloseConfirm()
            onCloseDetail()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.delete`)})
            await fetchData()
        }

        if (resp.status === 'failed') {
            console.log(resp)
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.delete`)})
        }
    }

    const onFilter = async(e) => {
        e.preventDefault()
        fetchData(filter)
    }

    const onDelete = () => setIsOpenConfirm(true)

    const onEdit = (budget) => {
        onCloseDetail()
        const dateRange = [new Date(budget.startDate), new Date(budget.endDate)]
        setSelectedBudget({ ...budget, dateRange })
        setEditing(true)
        openForm()
    }

    const fetchData = useCallback(async(filter = '') => {
        setLoading(true)
        const resp = await getBudgets({filter})
        console.log('resp', resp)

        if (resp.status === 'success') {
            setBudgets(resp.data)
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${resp.message}`)})
        }
        setLoading(false)
    }, [getBudgets, t])

    useEffect(() => {
        if (!filter) fetchData()
    }, [filter, fetchData])
    return (
        <>
            <div className='container mx-auto'>
                <div className='sm:flex justify-between mb-4'>
                    <h2>
                        {t(`${p}.title`)}
                    </h2>
                    <Button size='sm' variant='solid' icon={<HiPlusCircle />} onClick={openForm}>
                        {t(`${p}.button.create`)}
                    </Button>
                </div>

                <Card>
                    <div className='flex justify-end mb-2'>
                        <form onSubmit={onFilter} autoComplete='off' className='flex gap-2'>
                            <Input
                                size='sm'
                                type='search'
                                className='mb-2 sm:mb-0 '
                                placeholder={t(`${p}.filter.search`)}
                                prefix={<HiSearch className='text-lg' />}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <Button type='submit' size='sm' icon={<HiOutlineAdjustments className='rotate-90' />}>
                                {t(`${p}.filter.title`)}
                            </Button>
                        </form>
                    </div>
                    <Loading loading={loading}>
                        <BudgetList budgets={budgets} onClickItem={onDetails} />
                    </Loading>
                </Card>
            </div>

            <Dialog
                title={t(`${p}.form.title`)}
                isOpen={isFormOpen}
                onClose={onCloseForm}
                onRequestClose={onCloseForm}
                shouldCloseOnOverlayClick={false}
            >
                <div className='overflow-y-auto px-2'>
                    <h2 className='text-xl font-semibold mb-4'>{t(`${p}.form.title`)}</h2>
                    <BudgetForm onSubmit={onSubmit} onCancel={onCloseForm} initialValues={selectedBudget} />
                </div>
            </Dialog>

            <BudgetDetails
                isOpen={isDetailOpen}
                onClose={onCloseDetail}
                budget={selectedBudget}
                onDelete={onDelete}
                onEdit={onEdit}
            />

            <ConfirmDialog
                type='danger'
                title={t(`${p}.confirm.delete.title`)}
                onCancel={onCloseConfirm}
                onClose={onCloseConfirm}
                onConfirm={async() => await Delete(selectedBudget.id)}
                isOpen={isOpenConfirm}
                confirmButtonColor='red-500'
                confirmText={t(`${p}.confirm.delete.confirm`)}
                cancelText={t(`${p}.confirm.delete.cancel`)}
            >
                {t(`${p}.confirm.delete.message`)}
            </ConfirmDialog>
        </>
    )
    }

export default Budget