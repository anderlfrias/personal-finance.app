import { Avatar } from "components/ui";
import React from "react";
import { HiCollection } from "react-icons/hi";

function CategoryItem({ category, onClick }) {
    const { name, description } = category
    return (
        <>
            <div className='flex justify-between items-center gap-4 p-2 cursor-pointer hover:shadow' onClick={onClick}>
                <div className='flex items-center gap-2'>
                    <div className='min-w-max mr-2'>
                        <Avatar size='sm' shape='circle' icon={<HiCollection />} />
                    </div>
                    <div className='flex flex-col max-h-14 overflow-hidden'>
                        <h6 className="text-sm font-bold">
                            {name}
                        </h6>
                        <p className="text-xs text-gray-500 flex items-center">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryItem;