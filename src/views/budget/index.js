import { Button } from 'components/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { HiPlusCircle } from 'react-icons/hi'
import BudgetForm from './BudgetForm'

const p = 'budget' // prefix for translation key
function Budget() {
    const { t } = useTranslation();
    const openForm = () => {
        console.log('open form')
    }

    const onSubmit = (values) => {
        console.log('onSubmit', values)
    }

    const onCancel = () => {
        console.log('onCancel')
    }
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

                <BudgetForm onSubmit={onSubmit} onCancel={onCancel} />
            </div>
        </>
    )
    }

export default Budget