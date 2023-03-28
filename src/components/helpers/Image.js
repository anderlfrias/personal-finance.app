import React from 'react'
import { HiEye, HiTrash } from 'react-icons/hi'

function Image({ src, className, onPreview, onDelete }) {
    return (
        <div className={`${className} relative group`}>
            <img src={src} alt="" className="rounded-md w-full h-full" />
            {(onPreview || onDelete) && (
                <div className="absolute inset-0 rounded-md bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center gap-4">
                    {onPreview && (<HiEye className="cursor-pointer text-white text-2xl" onClick={onPreview} />)}
                    {onDelete && (<HiTrash className="cursor-pointer text-white text-2xl" onClick={onDelete} />)}
                </div>
            )}
        </div>
    )
}

export default Image