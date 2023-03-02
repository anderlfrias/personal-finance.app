import { ConfirmDialog, Loading } from 'components/shared';
import { Button, Card, Dialog, Table } from 'components/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { HiOutlineTrash, HiPencilAlt, HiPlusCircle } from 'react-icons/hi';
import formatCurrency from 'utils/formatCurrency';
import useWallet from 'utils/hooks/custom/useWallet';
import openNotification from 'utils/openNotification';
import WalletForm from './WalletForm';

const { Tr, Th, Td, THead, TBody } = Table

function Wallet() {
    const { t } = useTranslation()
    const { getWallets, createWallet, updateWallet, deleteWallet } = useWallet()
    const [wallets, setWallets] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)

    const fetchData = useCallback(async() => {
        setIsLoading(true)
        const resp = await getWallets()
        console.log(resp)
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

    const Create = async(data) => {
        const resp = await createWallet(data)

        if (resp.status === 'success') {
            onClose()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t('wallet.message.success.create')})
            fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t('wallet.message.error.create')})
        }
    }

    const Update = async(data) => {
        const resp = await updateWallet(selectedWallet.id, data)

        if (resp.status === 'success') {
            onClose()
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t('wallet.message.success.update')})
            fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t('wallet.message.error.update')})
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

    const onEdit = (wallet) => {
        setSelectedWallet(wallet)
        setIsEdit(true)
        openForm()
    }

    const onDelete = (wallet) => {
        setSelectedWallet(wallet)
        setIsOpenConfirm(true)
    }

    const onConfirmDelete = async () => {
        const resp = await deleteWallet(selectedWallet.id)
        if (resp.status === 'success') {
            openNotification({ title: t(`message.success`), type: 'success', subtitle: t('wallet.message.success.delete')})
            fetchData()
        }

        if (resp.status === 'failed') {
            openNotification({ title: t(`message.error`), type: 'danger', subtitle: t('wallet.message.error.delete')})
        }
        setIsOpenConfirm(false)
    }

    const onCancelDelete = () => {
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
                        {t(`wallet.title`)}
                    </h2>
                    <Button variant='solid' icon={<HiPlusCircle />} onClick={openForm}>
                        {t(`wallet.button.create`)}
                    </Button>
                </div>

                <Card>
                <Loading loading={isLoading}>
                <Table>
                <THead>
                    <Tr>
                        <Th>#</Th>
                        <Th>{t(`wallet.table.name`)}</Th>
                        <Th>{t(`wallet.table.description`)}</Th>
                        <Th>{t(`wallet.table.balance`)}</Th>
                        <Th />
                    </Tr>
                </THead>
                <TBody>
                    {
                        wallets.length > 0 ? wallets.map((wallet, index) => (
                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{wallet.name}</Td>
                                <Td>{wallet.description}</Td>
                                <Td>{formatCurrency(wallet.balance)}</Td>
                                <Td>
                                    <div className='flex gap-2'>
                                        <Button variant='twoTone' size='sm' icon={<HiOutlineTrash />} onClick={() => onDelete(wallet)} color={'red-500'} />
                                        <Button variant='twoTone' size='sm' icon={<HiPencilAlt />} onClick={() => onEdit(wallet)} />
                                    </div>
                                </Td>
                            </Tr>
                        )) :
                        <Tr>
                            <Td colSpan={4} className='text-center'>
                                {t(`wallet.table.empty`)}
                            </Td>
                        </Tr>
                    }
                </TBody>
            </Table>
            </Loading>
            </Card>
            </div>

            <Dialog
                isOpen={isFormOpen}
                onClose={onClose}
                onRequestClose={onClose}
                shouldCloseOnOverlayClick={false}
            >
                <h2 className='text-xl font-semibold mb-4'>{t(`wallet.form.title`)}</h2>
                <WalletForm onSubmit={onSubmit} onCancel={onClose} initialValues={selectedWallet} />
            </Dialog>

            <ConfirmDialog
                type='danger'
                title={t(`wallet.confirm.delete.title`)}
                onCancel={onCancelDelete}
                onClose={onCancelDelete}
                onConfirm={onConfirmDelete}
                isOpen={isOpenConfirm}
                confirmButtonColor='red-500'
                confirmText={t(`wallet.confirm.delete.confirm`)}
                cancelText={t(`wallet.confirm.delete.cancel`)}
            >
                {t(`wallet.confirm.delete.message`)}
            </ConfirmDialog>
        </>
    )
}

export default Wallet;