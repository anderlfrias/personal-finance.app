import { Button } from 'components/ui';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { HiPlusCircle } from 'react-icons/hi';
import useWallet from 'utils/hooks/custom/useWallet';

const p = 'wallet' // path to translation file
function Wallet() {
    const { t } = useTranslation()
    const { getWallets } = useWallet()

    useEffect(() => {
        const fetchData = async() => {
            const resp = await getWallets()
            console.log(resp)
        }

        fetchData()
    }, [getWallets]);
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