import TowToneIcon from 'components/helpers/TwoToneIcon';
import React from 'react'
import { HiCalendar, HiLockClosed, HiLockOpen } from 'react-icons/hi';
import formatCurrency from 'utils/formatCurrency';
import State from './State';
import { getState, isActive } from './utils';
import formatDate from 'utils/formatDate';

function BudgetItem({ budget, onClick }) {
    console.log(budget)
    const { name, startDate, endDate } = budget;

    // const color = {
    //     overdrafted: 'red-500',
    //     great: 'green-500',
    //     caution: 'amber-500',
    //     warning: 'amber-500',
    // }
    return (
        <>
            <div className='flex justify-between items-center gap-4 p-2 cursor-pointer hover:shadow' onClick={onClick}>
                <div className='flex items-center gap-2'>
                    <div className='min-w-max'>
                        {
                            isActive(budget) ?
                            <TowToneIcon icon={<HiLockOpen />} color='emerald' size='sm' /> :
                            <TowToneIcon icon={<HiLockClosed />} color='gray' size='sm' />
                        }
                    </div>
                    <div className='flex flex-col'>
                        <h6 className="text-sm font-bold multiline-ellipsis max-h-14 overflow-hidden">
                            {name}
                        </h6>
                        <p className="text-xs text-gray-500 flex items-center min-w-max">
                            <HiCalendar className='mr-1' /> {formatDate(new Date(startDate))} - {formatDate(new Date(endDate))}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-end'>
                    <h6 className={`font-bold text-sm`}>
                        {formatCurrency(budget.amount)}
                    </h6>
                    <State state={getState(budget)} />
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

export default BudgetItem