import { Avatar } from 'components/ui'
import React from 'react'
// import { HiArrowDown, HiArrowUp, HiSwitchHorizontal } from 'react-icons/hi'

function TowToneIcon({ icon, color, size, className = '' }) {
    // switch (type) {
    //     case 'income':
    //         return <Avatar className={`${className} bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100 text-emerald-600`} icon={<HiArrowUp className='rotate-45' />} />
    //     case 'expense':
    //         return <Avatar className={`${className} bg-red-100 dark:bg-red-500/20 dark:text-red-100 text-red-600`} icon={<HiArrowDown className='rotate-45' />} />
    //     default:
    //         return <Avatar className={`${className} bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-100 text-indigo-600`} icon={<HiSwitchHorizontal />} />
    // }

    return <Avatar
            className={`${className} bg-${color}-100 dark:bg-${color}-500/20 dark:text-${color}-100 text-${color}-600`}
            icon={icon}
            size={size}
        />
}

export default TowToneIcon