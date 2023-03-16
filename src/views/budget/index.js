import { Loading } from 'components/shared'
import { Button, Card, Drawer, Input, Table } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineAdjustments, HiOutlineTrash, HiPencilAlt, HiPlusCircle, HiSearch } from 'react-icons/hi'
import formatCurrency from 'utils/formatCurrency'
import useBudget from 'utils/hooks/custom/useBudget'
import openNotification from 'utils/openNotification'
import BudgetForm from './BudgetForm'

const { Tr, Th, Td, THead, TBody } = Table

const p = 'budget' // prefix for translation key
function Budget() {
    const { t } = useTranslation();
    const { getBudgets, createBudget } = useBudget()
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const openForm = () => {
        setIsFormOpen(true)
    }

    const onCloseForm = () => {
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

        await onCreate(data)
    }

    const onCreate = async(data) => {
        console.log('onCreate', data)
        const resp = await createBudget(data)
        console.log('res', resp)

        if (resp.status === 'success') {
            onCloseForm()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.create`)})
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.create`)})
        }
    }

    const onFilter = async(filter) => {
        console.log('onFilter', filter)
    }

    const onCancel = () => {
        console.log('onCancel')
    }

    const onDelete = (budget) => {
        console.log('delete', budget)
    }

    const onEdit = (budget) => {
        console.log('edit', budget)
    }

    const fetchData = useCallback(async() => {
        setLoading(true)
        const resp = await getBudgets()
        console.log('resp', resp)

        if (resp.status === 'success') {
            setBudgets(resp.data)
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.${resp.message}`)})
        }
        setLoading(false)
    }, [getBudgets, t])

    useEffect(() => {
        fetchData()
    }, [fetchData])
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
                                    <Th>#</Th>
                                    <Th>{t(`${p}.table.name`)}</Th>
                                    <Th>{t(`${p}.table.startDate`)}</Th>
                                    <Th>{t(`${p}.table.endDate`)}</Th>
                                    <Th>{t(`${p}.table.amount`)}</Th>
                                    <Th />
                                </Tr>
                            </THead>
                            <TBody>
                                {
                                    budgets.length > 0 ? budgets.map((item, index) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{new Date(item.startDate).toLocaleDateString()}</Td>
                                            <Td>{new Date(item.endDate).toLocaleDateString()}</Td>
                                            <Td>{formatCurrency(item.amount)}</Td>
                                            <Td>
                                                <div className='flex gap-2'>
                                                    <Button variant='twoTone' size='sm' icon={<HiOutlineTrash />} onClick={() => onDelete(item)} color={'red-500'} />
                                                    <Button variant='twoTone' size='sm' icon={<HiPencilAlt />} onClick={() => onEdit(item)} />
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
                    </Loading>
                </Card>
            </div>

            <Drawer
                title={t(`${p}.form.title`)}
                isOpen={isFormOpen}
                onClose={onCloseForm}
                onRequestClose={onCloseForm}
                shouldCloseOnOverlayClick={false}
            >
                {/* <h2 className='text-xl font-semibold mb-4'>{t(`${p}.form.title`)}</h2> */}
                <BudgetForm onSubmit={onSubmit} onCancel={onCancel} />
            </Drawer>
        </>
    )
    }

export default Budget