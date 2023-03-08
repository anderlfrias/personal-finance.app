import { Avatar } from 'components/ui';
import React from 'react'
import { HiArrowDown, HiArrowUp, HiCalendar, HiSwitchHorizontal } from 'react-icons/hi';
import formatCurrency from 'utils/formatCurrency';

function Icon ({type, className = ''}) {
    switch (type) {
        case 'income':
            return <Avatar className={`${className} bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100 text-emerald-600`} icon={<HiArrowUp className='rotate-45' />} />
        case 'expense':
            return <Avatar className={`bg-red-100 dark:bg-red-500/20 dark:text-red-100 text-red-600 ${className}`} icon={<HiArrowDown className='rotate-45' />} />
        default:
            return <Avatar className={`bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-100 text-indigo-600 ${className}`} icon={<HiSwitchHorizontal />} />
    }
}

function TransactionItem({ transaction, onClick }) {
    const { type, description, amount, date } = transaction;
    return (
        <>
            <div className='flex justify-between items-center gap-4 p-2 cursor-pointer hover:shadow' onClick={onClick}>
                <div className='flex items-center gap-2'>
                    <Icon type={type} className='min-w-[40px]' />
                    <div className='flex flex-col'>
                        <h6 className="text-sm font-bold multiline-ellipsis max-h-14 overflow-hidden">
                            {description}
                        </h6>
                        <p className="text-xs text-gray-500 flex items-center min-w-max">
                            <HiCalendar className='mr-1' /> {new Date(date).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-end'>
                    <h6 className="font-bold">
                        {type === 'expense' && '-'}{formatCurrency(amount)}
                    </h6>
                </div>
            </div>

            <style jsx="true">{`
                .multiline-ellipsis {
                    /* height: 2.6em;  3 lines of text */
                    /* overflow: hidden; */
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; /* start showing ellipsis when 3rd line is reached */
                    white-space: pre-wrap; /* let the text wrap preserving spaces */
                }
            `}</style>
        </>
    )
}

export default TransactionItem