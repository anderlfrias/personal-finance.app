import { Button, Drawer } from "components/ui"
import React, { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { HiArrowRight, HiArrowUp, HiSwitchHorizontal } from "react-icons/hi"
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import useTransaction from "utils/hooks/custom/useTransaction"
import openNotification from "utils/openNotification"
import TransactionForm from "views/transaction/TransactionForm"

const p = "quickActions"
export default function QuikActions() {
  const { t } = useTranslation()
  const formRef = useRef()
  const { createTransaction } = useTransaction()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const { width: screenWidth } = useScreenSize()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialValues, setInitialValues] = useState({
    type: '',
    amount: '',
    description: '',
    date: new Date(),
    wallet: '',
    sourceWallet: '',
    targetWallet: '',
    category: '',
    budget: '',
    evidence: []
  })

  const onOpenForm = (type) => {
    setIsFormOpen(true)
    setInitialValues((prev) => ({
      ...prev,
      type: type,
    }))
  }

  const onCloseForm = () => {
    setIsFormOpen(false)
  }

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    const data = {
      ...values,
      date: new Date(values.date).toISOString()
    }

    await onCreate(data);

    setIsSubmitting(false)
  }

  const onCreate = async (data) => {
    const resp = await createTransaction(data)

    if (resp.status === 'success') {
      onCloseForm()
      openNotification({ title: t(`message.success`), type: 'success', subtitle: t(`transaction.message.success.create`) })
      return
    }

    if (resp.status === 'failed') {
      openNotification({ title: t(`message.error`), type: 'danger', subtitle: t(resp.message || `transaction.message.error.create`) })
    }
  }

  const actions = [
    {
      icon: <HiArrowUp className='rotate-45' />,
      color: 'emerald',
      type: 'income',
      onClick: () => onOpenForm('income'),
    },
    {
      icon: <HiArrowRight className='rotate-45' />,
      color: 'red',
      type: 'expense',
      onClick: () => onOpenForm('expense'),
    },
    {
      icon: <HiSwitchHorizontal />,
      color: 'indigo',
      type: 'transfer',
      onClick: () => onOpenForm('transfer'),
    },
  ]

  const Footer = (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={onCloseForm}>
        {t(`transaction.form.cancel`)}
      </Button>
      <Button size="sm" variant="solid" type="submit" loading={isSubmitting} onClick={() => formRef.current.handleSubmit()}>
        {isSubmitting ? t(`transaction.form.submit.loading`) : t(`transaction.form.submit.label`)}
      </Button>
    </div>
  )

  return (
    <div className="mb-6">
      <h4 className=' mb-2'>{t(`${p}.title`)}</h4>
      <div className='flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-4'>
        {actions.map((action, index) => (
          <Button
            key={index}
            icon={action.icon}
            color={action.color}
            variant='outline'
            size='lg'
            className="flex-1 sm:flex-initial min-w-[200px]"
            onClick={() => action.onClick(action.type)}
          >
            {t(`${p}.${action.type}`)}
          </Button>
        ))}
      </div>

      <Drawer
        title={t(`transaction.form.title`)}
        isOpen={isFormOpen}
        onClose={onCloseForm}
        width={screenWidth >= 768 ? 500 : screenWidth}
        footer={Footer}
      >
        <TransactionForm onSubmit={onSubmit} onCancel={onCloseForm} initialValues={initialValues} isEditing={false} innerRef={formRef} />
      </Drawer>
    </div>
  )
}