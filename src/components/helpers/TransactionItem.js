import { Avatar } from 'components/ui';
import React from 'react'
import { HiArrowDown, HiArrowUp, HiCalendar, HiSwitchHorizontal } from 'react-icons/hi';
import formatCurrency from 'utils/formatCurrency';

function Icon ({type, className = ''}) {
    switch (type) {
        case 'income':
            return <Avatar className={`${className} bg-emerald-100 text-emerald-600`} icon={<HiArrowUp className='rotate-45' />} />
        case 'expense':
            return <Avatar className={`${className} bg-red-100 text-red-600`} icon={<HiArrowDown className='rotate-45' />} />
        default:
            return <Avatar className={`${className} bg-indigo-100 text-indigo-600`} icon={<HiSwitchHorizontal />} />
    }
}

function TransactionItem({ transaction }) {
    const { type, description, amount, date } = transaction;
    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center gap-2'>
                    <Icon type={type} />
                    <div className='flex flex-col'>
                        <h6 className="text-sm font-bold">
                            {description}
                        </h6>
                        <p className="text-xs text-gray-500 flex items-center text-center">
                            <HiCalendar className='mr-1' /> {new Date(date).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className='flex items-center'>
                    <h6 className="font-bold">
                        {type === 'expense' && '-'}{formatCurrency(amount)}
                    </h6>
                </div>
            </div>
        </>
    )
}

export default TransactionItem