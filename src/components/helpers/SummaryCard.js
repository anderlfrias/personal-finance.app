import { Avatar, Card } from 'components/ui'
import React from 'react'
import { BiLineChart, BiLineChartDown } from 'react-icons/bi'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'

const ArrowsDiff = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className} icon icon-tabler icon-tabler-arrows-diff`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11 16h10"></path>
            <path d="M11 16l4 4"></path>
            <path d="M11 16l4 -4"></path>
            <path d="M13 8h-10"></path>
            <path d="M13 8l-4 4"></path>
            <path d="M13 8l-4 -4"></path>
        </svg>
    )
}

const Icon = ({type, className}) => {
    switch (type) {
        case 'income':
            return <Avatar className={`${className} bg-emerald-500 dark:bg-emerald-500`} icon={<BiLineChart />} />
        case 'expense':
            return <Avatar className={`${className} bg-red-500 dark:bg-red-500`} icon={<BiLineChartDown />} />
        case 'difference':
            return <Avatar className={`${className} bg-blue-500 dark:bg-blue-500`} icon={<ArrowsDiff />} />
        default:
            return <Avatar className={`${className} bg-blue-500 dark:bg-blue-500`} icon={<HiOutlineCurrencyDollar />} />
    }
}

function SummaryCard({ title, type, amount}) {
    return (
        <>
            <Card>
                <div className='flex min-w-max'>
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