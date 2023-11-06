import CreateButton from 'components/helpers/CreateButton';
import { ConfirmDialog, Loading } from 'components/shared';
import { Button, Card, Dialog, Input } from 'components/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { HiOutlineAdjustments, HiPlusCircle, HiSearch } from 'react-icons/hi';
import useWallet from 'utils/hooks/custom/useWallet';
import openNotification from 'utils/openNotification';
import WalletForm from './WalletForm';
import WalletList from './WalletList';
import WalletDetails from './WalletDetails';

const p = 'wallet'
function Wallet() {
    const { t } = useTranslation()
    const { getWallets, createWallet, updateWallet, deleteWallet } = useWallet()
    const [wallets, setWallets] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ filter, setFilter ] = useState('')

    const fetchData = useCallback(async(filter = '') => {
        setIsLoading(true)
        const resp = await getWallets(filter)
        setIsLoading(false)
        if (resp.status === 'success') {
            setWallets(resp.data)
        }
    }, [getWallets])

    const onSubmit = async(data) => {
        if (isEdit) {
            await Update(data)
            return;
        }

        await Create(data);
    }

    const onFilter = async(e) => {
        e.preventDefault()
        await fetchData(filter)
    }

    const Create = async(data) => {
        const resp = await createWallet(data)

        if (resp.status === 'success') {
            onClose()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.create`)})
            fetchData(filter)
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.create`)})
        }
    }

    const Update = async(data) => {
        const resp = await updateWallet(selectedWallet.id, data)

        if (resp.status === 'success') {
            onClose()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.update`)})
            fetchData(filter)
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.update`)})
        }
    }

    const openForm = () => {
        setIsFormOpen(true)
    }

    const onClose = () => {
        setIsFormOpen(false)
        setSelectedWallet(null)
        setIsEdit(false)
    }

    const onEdit = () => {
        setIsEdit(true)
        openForm()
    }

    const onDelete = () => {
        setIsOpenConfirm(true)
    }

    const onDetails = (wallet) => {
        console.log(wallet);
        setSelectedWallet(wallet)
    }

    const onConfirmDelete = async () => {
        const resp = await deleteWallet(selectedWallet.id)
        if (resp.status === 'success') {
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`${p}.message.success.delete`)})
            fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(`${p}.message.error.delete`)})
        }
        setIsOpenConfirm(false)
    }

    const onCancelDelete = () => {
        setSelectedWallet(null)
        setIsOpenConfirm(false)
    }

    useEffect(() => {
        fetchData()
    }, [fetchData]);
    return (
        <>
            <div className='container mx-auto'>
                <div className='sm:flex justify-between mb-4'>
                    <h2>
                        {t(`${p}.title`)}
                    </h2>
                    <Button className='hidden sm:flex'  size='sm' variant='solid' icon={<HiPlusCircle />} onClick={openForm}>
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
                    <Loading loading={isLoading}>
                        <WalletList wallets={wallets} onClickItem={onDetails}/>
                </Loading>
            </Card>
            </div>

            <Dialog
                isOpen={isFormOpen}
                onClose={onClose}
                onRequestClose={onClose}
                shouldCloseOnOverlayClick={false}
            >
                <div className='mb-4'>
                <h2 className='text-xl font-semibold'>{t(`${p}.form.title`)}</h2>
                <p>
                    {t(`${p}.form.subtitle`)}
                </p>
                </div>
                <WalletForm onSubmit={onSubmit} onCancel={onClose} initialValues={selectedWallet} />
            </Dialog>

            <ConfirmDialog
                type='danger'
                title={t(`${p}.confirm.delete.title`)}
                onCancel={onCancelDelete}
                onClose={onCancelDelete}
                onConfirm={onConfirmDelete}
                isOpen={isOpenConfirm}
                confirmButtonColor='red-500'
                confirmText={t(`${p}.confirm.delete.confirm`)}
                cancelText={t(`${p}.confirm.delete.cancel`)}
            >
                {t(`${p}.confirm.delete.message`)}
            </ConfirmDialog>

            <WalletDetails
                isOpen={!!selectedWallet}
                wallet={selectedWallet}
                onClose={onClose}
                onEdit={onEdit}
                onDelete={onDelete}
            />

            <CreateButton onClick={openForm} />
        </>
    )
}

export default Wallet;