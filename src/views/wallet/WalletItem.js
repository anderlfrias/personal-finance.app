import { Avatar } from "components/ui";
import React from "react";
import { HiCreditCard } from "react-icons/hi";
// import { HiCreditCard } from "react-icons/hi2";
import formatCurrency from "utils/formatCurrency";

function WalletItem({ wallet, onClick }) {
    const { name, description, balance } = wallet
    return (
        <>
            <div className='flex justify-between items-center gap-4 p-2 cursor-pointer hover:shadow' onClick={onClick}>
                <div className='flex items-center gap-2'>
                    <div className='min-w-max'>
                        <Avatar size='sm' shape='circle' icon={<HiCreditCard />} />
                    </div>
                    <div className='flex flex-col max-h-14 overflow-hidden'>
                        <h6 className="text-sm font-bold">
                            {name}
                        </h6>
                        <p className="multiline-ellipsis text-xs text-gray-500 flex items-center">
                            {description}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col items-end'>
                    <h6 className={`font-bold text-sm`}>
                        {formatCurrency(balance)}
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
    );
}

export default WalletItem;