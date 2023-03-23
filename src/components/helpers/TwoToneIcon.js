import { Avatar } from 'components/ui'
import React from 'react'
import { HiArrowDown, HiArrowUp, HiSwitchHorizontal } from 'react-icons/hi'

export const getIcon = (type) => {
    switch (type) {
        case 'income':
            return <TowToneIcon size={'sm'} color={'emerald'} icon={<HiArrowUp className='rotate-45' />}/>
        case 'expense':
            return <TowToneIcon size={'sm'} color={'red'} icon={<HiArrowDown className='rotate-45' />}/>
        default:
            return <TowToneIcon size={'sm'} color={'emerald'} icon={<HiSwitchHorizontal />}/>
    }
}


function TowToneIcon({ icon, color, size, className = '' }) {
    return <Avatar
            className={`${className} bg-${color}-100 dark:bg-${color}-500/20 dark:text-${color}-100 text-${color}-600`}
            icon={icon}
            size={size}
        />
}

export default TowToneIcon