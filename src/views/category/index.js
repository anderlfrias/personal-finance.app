import CreateButton from 'components/helpers/CreateButton'
import { ConfirmDialog, Loading } from 'components/shared'
import { Button, Card, Dialog, Input } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineAdjustments, HiPlusCircle, HiSearch } from 'react-icons/hi'
import useCategory from 'utils/hooks/custom/useCategory'
import openNotification from 'utils/openNotification'
import CategoryForm from './CategoryForm'
import CategoryList from './CategoryList'
import CategoryDetails from './CategoryDetails'


const p = 'category' // prefix for translation key
function Category() {
    const { t } = useTranslation()
    const { getCategories, createCategory, updateCategory, deleteCategory } = useCategory()
    const [categories, setCategories] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ filter, setFilter ] = useState('')
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const openForm = () => {
        setIsFormOpen(true);
    }

    const onFilter = async(e) => {
        e.preventDefault()
        fetchData(filter)
    }

    const onDelete = (category) => {
        setSelectedCategory(category)
        setIsOpenConfirm(true)
    }

    const onEdit = (category) => {
        setIsDetailsOpen(false)
        setSelectedCategory(category)
        setIsEdit(true)
        setIsFormOpen(true)
    }

    const onDetails = (category) => {
        setSelectedCategory(category)
        setIsDetailsOpen(true)
    }

    const onClose = () => {
        setIsFormOpen(false)
        setSelectedCategory(null)
        setIsEdit(false)
        setIsDetailsOpen(false)
    }

    const onCloseDelete = () => {
        setSelectedCategory(null)
        setIsOpenConfirm(false)
    }

    const onConfirmDelete = async() => {
        await Delete()
    }

    const onCloseForm = () => {
        setIsFormOpen(false)
    }

    const onSubmit = async(data) => {

        if (isEdit) {
            await Update(data)
            return;
        }

        await Create(data);
    }

    const Create = async(data) => {
        const resp = await createCategory(data)

        if (resp.status === 'success') {
            onCloseForm()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.create`)})
            fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t('category.message.error.create')})
        }
    }

    const Update = async(data) => {
        const resp = await updateCategory(selectedCategory.id, data)

        if (resp.status === 'success') {
            onCloseForm()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t('category.message.success.update')})
            fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.update`)})
        }
    }

    const Delete = async() => {
        const resp = await deleteCategory(selectedCategory.id)

        if (resp.status === 'success') {
            onCloseDelete()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.delete`)})
            fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.delete`)})
        }
    }

    const fetchData = useCallback(async(filter = '') => {
        setLoading(true)
        const resp = await getCategories(filter)
        if (resp.status === 'success') {
            setCategories(resp.data)
        }

        setLoading(false)
    }, [getCategories])

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
                    <Button variant='solid' size='sm' icon={<HiPlusCircle />} onClick={openForm}>
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
                            <Button className='hidden sm:flex' type='submit' size='sm' icon={<HiOutlineAdjustments className='rotate-90' />}>
                                {t(`${p}.filter.title`)}
                            </Button>
                        </form>
                    </div>
                <Loading loading={loading}>
                    <CategoryList categories={categories} onClickItem={onDetails} />
                </Loading>
                </Card>
            </div>

            <Dialog
                isOpen={isFormOpen}
                onClose={onCloseForm}
                onRequestClose={onCloseForm}
                shouldCloseOnOverlayClick={false}
            >
                <h2 className='text-xl font-semibold mb-4'>{t(`${p}.form.title`)}</h2>
                <CategoryForm onSubmit={onSubmit} onCancel={onCloseForm} initialValues={selectedCategory} />
            </Dialog>

            <ConfirmDialog
                type='danger'
                title={t(`${p}.confirm.delete.title`)}
                onCancel={onCloseDelete}
                onClose={onCloseDelete}
                onConfirm={onConfirmDelete}
                isOpen={isOpenConfirm}
                confirmButtonColor='red-500'
                confirmText={t(`${p}.confirm.delete.confirm`)}
                cancelText={t(`${p}.confirm.delete.cancel`)}
            >
                {t(`${p}.confirm.delete.message`)}
            </ConfirmDialog>

            <CategoryDetails
                isOpen={isDetailsOpen}
                category={selectedCategory}
                onClose={onClose}
                onEdit={onEdit}
                onDelete={onDelete}
            />

            <CreateButton onClick={openForm} />
        </>
    )
}

export default Category