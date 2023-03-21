import TowToneIcon from 'components/helpers/TwoToneIcon'
import { ConfirmDialog, Loading } from 'components/shared'
import { Button, Card, Dialog, Input, Table } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiLockClosed, HiLockOpen, HiOutlineAdjustments, HiOutlineTrash, HiPencilAlt, HiPlusCircle, HiSearch } from 'react-icons/hi'
import formatCurrency from 'utils/formatCurrency'
import useBudget from 'utils/hooks/custom/useBudget'
import openNotification from 'utils/openNotification'
import BudgetForm from './BudgetForm'
import State from './State'

const { Tr, Th, Td, THead, TBody } = Table

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

    const onCloseConfirm = () => {
        setSelectedBudget(null)
        setIsOpenConfirm(false)
    }

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
        console.log('delete', id)

        const resp = await deleteBudget(id)
        console.log('resp', resp)

        if (resp.status === 'success') {
            onCloseConfirm()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.delete`)})
            await fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.delete`)})
        }
    }

    const onFilter = async(e) => {
        e.preventDefault()
        fetchData(filter)
    }

    const onDelete = (budget) => {
        console.log('delete', budget)
        setSelectedBudget(budget)
        setIsOpenConfirm(true)
    }

    const onEdit = (budget) => {
        console.log('edit', budget)
        const dateRange = [new Date(budget.startDate), new Date(budget.endDate)]
        setSelectedBudget({ ...budget, dateRange })
        setEditing(true)
        openForm()
    }

    const getSpent = (budget) => {
        const spent = budget.transactions.reduce((acc, cur) => acc + cur.amount, 0)
        return spent
    }

    const getRemain = (budget) => {
        const spent = getSpent(budget)
        return budget.amount - spent
    }

    const getState = (budget) => {
        const spent = getSpent(budget)
        const remain = budget.amount - spent
        if (remain < 0) return 'overdrafted'
        if (remain > 0) return 'great'
        if (remain === 0) return 'caution'
    }

    // validar si un presupuesto esta vencido
    const isExpired = (budget) => {
        const today = new Date()
        const endDate = new Date(budget.endDate)
        return today > endDate
    }

    // const State = ({ budget }) => {
    //     const state = getState(budget)
    //     return (
    //         <div className={`flex items-center justify-center text-white text-xs font-bold px-2 py-1 rounded-full ${state === 'danger' ? 'bg-red-500' : state === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}>
    //             {state === 'danger' ? t(`${p}.state.overdrafted`) : state === 'success' ? t(`${p}.state.completed`) : t(`${p}.state.warning`)}
    //         </div>
    //     )
    // }

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
                                className='mb-2 sm:mb-0'
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
                        <Table>
                            <THead>
                                <Tr>
                                    <Th />
                                    <Th>{t(`${p}.table.name`)}</Th>
                                    {/* <Th>{t(`${p}.table.startDate`)}</Th>
                                    <Th>{t(`${p}.table.endDate`)}</Th> */}
                                    <Th>{t(`${p}.table.daterange`)}</Th>
                                    <Th>{t(`${p}.table.amount`)}</Th>
                                    {/* <Th>{t(`${p}.table.limit`)}</Th>
                                    <Th>{t(`${p}.table.spent`)}</Th> */}
                                    <Th>{t(`${p}.table.remain`)}</Th>
                                    <Th>{t(`${p}.table.state`)}</Th>
                                    <Th />
                                </Tr>
                            </THead>
                            <TBody>
                                {
                                    budgets.length > 0 ? budgets.map((item, index) => (
                                        <Tr key={index}>
                                            <Td>
                                                {
                                                    isExpired(item) ?
                                                        <TowToneIcon icon={<HiLockClosed />} color='gray' size='sm' />:
                                                        <TowToneIcon icon={<HiLockOpen />} color='emerald' size='sm' />
                                                }
                                            </Td>
                                            <Td>{item.name}</Td>
                                            {/* <Td>{new Date(item.startDate).toLocaleDateString()}</Td>
                                            <Td>{new Date(item.endDate).toLocaleDateString()}</Td> */}
                                            <Td>{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</Td>
                                            <Td className='font-semibold'>{formatCurrency(item.amount)}</Td>
                                            <Td className='font-semibold'>{formatCurrency(getRemain(item))}</Td>
                                            <Td><State state={getState(item)} /></Td>
                                            <Td>
                                                <div className='flex gap-2'>
                                                    <Button variant='twoTone' size='sm' icon={<HiOutlineTrash />} onClick={() => onDelete(item)} color={'red-500'} />
                                                    <Button variant='twoTone' size='sm' icon={<HiPencilAlt />} onClick={() => onEdit(item)} />
                                                </div>
                                            </Td>
                                        </Tr>
                                    )) :
                                    <Tr>
                                        <Td colSpan={6} className='text-center'>
                                            {t(`${p}.table.empty`)}
                                        </Td>
                                    </Tr>
                                }
                            </TBody>
                        </Table>
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