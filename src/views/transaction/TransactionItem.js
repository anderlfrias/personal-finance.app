import { getIcon } from 'components/helpers/TwoToneIcon';
import React from 'react'
import { HiCalendar } from 'react-icons/hi';
import formatCurrency from 'utils/formatCurrency';
import formatDate from 'utils/formatDate';

function TransactionItem({ transaction, onClick }) {
    const { type, description, amount, date } = transaction;
    return (
        <>
            <div className='flex justify-between items-center gap-4 p-2 cursor-pointer hover:shadow' onClick={onClick}>
                <div className='flex items-center gap-2'>
                    <div className='min-w-max'>
                        {getIcon(type)}
                    </div>
                    <div className='flex flex-col'>
                        <h6 className="text-sm font-bold multiline-ellipsis max-h-14 overflow-hidden">
                            {description}
                        </h6>
                        <p className="text-xs text-gray-500 flex items-center min-w-max">
                            <HiCalendar className='mr-1' /> {formatDate(new Date(date))}
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