import { Avatar, Button, Card } from 'components/ui'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineCurrencyDollar, HiPlusCircle } from 'react-icons/hi'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'

function Transaction() {
    const { t } = useTranslation()
    const openForm = () => {
        console.log('open form')
    }
    return (
        <>
            <div className='container mx-auto'>
                <div className='sm:flex justify-between mb-4'>
                    <h2>
                        {t(`transaction.title`)}
                    </h2>
                    <Button variant='solid' icon={<HiPlusCircle />} onClick={openForm}>
                        {t(`transaction.button.create`)}
                    </Button>
                </div>

                {/* Income */}
                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-2'>
                        {t(`transaction.summary.title`)}
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <Card>
                            <div className='flex '>
                                <Avatar className="mr-4 bg-green-500" icon={<BiLineChart />} />
                                <div className=''>
                                    <p className='text-sm text-gray-500'>
                                        {t(`transaction.summary.income`)}
                                    </p>
                                    <h3 className='text-lg font-semibold'>
                                        $2000.00
                                    </h3>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className='flex'>
                                <Avatar className="mr-4 bg-red-500" icon={<BiLineChartDown />} />
                                <div className=''>
                                    <p className='text-sm text-gray-500'>
                                        {t(`transaction.summary.expense`)}
                                    </p>
                                    <h3 className='text-lg font-semibold'>
                                        $1500.00
                                    </h3>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className='flex'>
                                <Avatar className="mr-4 bg-blue-500" icon={<HiOutlineCurrencyDollar />} />
                                <div>
                                    <p className='text-sm text-gray-500'>
                                        {t(`transaction.summary.balance`)}
                                    </p>
                                    <h3 className='text-lg font-semibold'>
                                        $2000.00
                                    </h3>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className='mb-6'>
                    <h3 className='text-lg font-semibold mb-2'>
                        {t(`transaction.detail.title`)}
                    </h3>

                    <Card>
                        
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Transaction