import { Button } from 'components/ui';
import React from 'react';
import { useTranslation } from 'react-i18next'
import { HiPlusCircle } from 'react-icons/hi';

const p = 'wallet' // path to translation file
function Wallet() {
    const { t } = useTranslation()
    return (
        <>
            <div className='container mx-auto'>
                <div className='flex justify-between'>
                    <h2>
                        {t(`${p}.title`)}
                    </h2>
                    <Button variant='solid' icon={<HiPlusCircle />}>
                        {t(`${p}.button.create`)}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Wallet;