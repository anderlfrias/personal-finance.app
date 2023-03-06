import { Avatar, Card } from 'components/ui'
import React from 'react'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'

const Icon = ({type, className}) => {
    switch (type) {
        case 'income':
            return <Avatar className={`${className} bg-green-500`} icon={<BiLineChart />} />
        case 'expense':
            return <Avatar className={`${className} bg-red-500`} icon={<BiLineChartDown />} />
        default:
            return <Avatar className={`${className} bg-blue-500`} icon={<HiOutlineCurrencyDollar />} />
    }
}

function SummaryCard({ title, type, amount}) {
    return (
        <>
            <Card>
                <div className='flex '>
                    <Icon type={type} className='mr-4' />
                    <div className=''>
                        <p className='text-sm text-gray-500'>
                            {title}
                        </p>
                        <h3 className='text-lg font-semibold'>
                            {amount}
                        </h3>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default SummaryCard