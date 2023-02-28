import { ConfirmDialog, Loading } from 'components/shared'
import { Button, Dialog, Table } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineTrash, HiPencilAlt, HiPlusCircle } from 'react-icons/hi'
import useCategory from 'utils/hooks/custom/useCategory'
import openNotification from 'utils/openNotification'
import CategoryForm from './CategoryForm'

const { Tr, Th, Td, THead, TBody } = Table

function Category() {
    const { t } = useTranslation()
    const { getCategories, createCategory, updateCategory, deleteCategory } = useCategory()
    const [categories, setCategories] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const openForm = () => {
        setIsFormOpen(true);
    }

    const onDelete = (category) => {
        console.log('delete', category)
        setSelectedCategory(category)
        setIsOpenConfirm(true)
    }

    const onEdit = (category) => {
        console.log('edit', category)
        setSelectedCategory(category)
        setIsEdit(true)
        setIsFormOpen(true)
    }

    const onCloseDelete = () => {
        console.log('cancel delete')
        setSelectedCategory(null)
        setIsOpenConfirm(false)
    }

    const onConfirmDelete = async() => {
        console.log('confirm delete')
        await Delete()
    }

    const onCloseForm = () => {
        console.log('close form')
        setIsFormOpen(false)
    }

    const onSubmit = async(data) => {
        console.log('submit', data)

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
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t('category.message.success.create')})
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
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t('category.message.error.update')})
        }
    }

    const Delete = async() => {
        const resp = await deleteCategory(selectedCategory.id)

        if (resp.status === 'success') {
            onCloseDelete()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t('category.message.success.delete')})
            fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t('category.message.error.delete')})
        }
    }

    const fetchData = useCallback(async() => {
        setLoading(true)
        const resp = await getCategories()
        console.log(resp)
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
                        {t(`category.title`)}
                    </h2>
                    <Button variant='solid' icon={<HiPlusCircle />} onClick={openForm}>
                        {t(`category.button.create`)}
                    </Button>
                </div>

                <Loading loading={loading}>
                    <Table>
                        <THead>
                            <Tr>
                                <Th>#</Th>
                                <Th>{t(`category.table.name`)}</Th>
                                <Th>{t(`category.table.description`)}</Th>
                                <Th />
                            </Tr>
                        </THead>
                        <TBody>
                            {
                                categories.length > 0 ? categories.map((category, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{category.name}</Td>
                                        <Td>{category.description}</Td>
                                        <Td>
                                            <div className='flex gap-2'>
                                                <Button variant='twoTone' size='sm' icon={<HiOutlineTrash />} onClick={() => onDelete(category)} color={'red-500'} />
                                                <Button variant='twoTone' size='sm' icon={<HiPencilAlt />} onClick={() => onEdit(category)} />
                                            </div>
                                        </Td>
                                    </Tr>
                                )) :
                                <Tr>
                                    <Td colSpan={4} className='text-center'>
                                        {t(`category.table.empty`)}
                                    </Td>
                                </Tr>
                            }
                        </TBody>
                    </Table>
                </Loading>
            </div>

            <Dialog
                isOpen={isFormOpen}
                onClose={onCloseForm}
                onRequestClose={onCloseForm}
                shouldCloseOnOverlayClick={false}
            >
                <h2 className='text-xl font-semibold mb-4'>{t(`category.form.title`)}</h2>
                <CategoryForm onSubmit={onSubmit} onCancel={onCloseForm} initialValues={selectedCategory} />
            </Dialog>

            <ConfirmDialog
                type='danger'
                title={t(`category.confirm.delete.title`)}
                onCancel={onCloseDelete}
                onClose={onCloseDelete}
                onConfirm={onConfirmDelete}
                isOpen={isOpenConfirm}
                confirmButtonColor='red-500'
                confirmText={t(`category.confirm.delete.confirm`)}
                cancelText={t(`category.confirm.delete.cancel`)}
            >
                {t(`category.confirm.delete.message`)}
            </ConfirmDialog>
        </>
    )
}

export default Category