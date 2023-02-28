import React from 'react'
import {
    HiOutlineColorSwatch,
	HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineCreditCard
} from 'react-icons/hi'

const navigationIcon = {
    home: <HiOutlineHome />,
    wallet: <HiOutlineCreditCard />,
    category: <HiOutlineViewGridAdd />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />
}

export default navigationIcon