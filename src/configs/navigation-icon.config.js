import React from 'react'
import {
    HiOutlineColorSwatch,
	HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineCreditCard,
    HiSwitchHorizontal,
    // HiOutlineCurrencyDollar,
} from 'react-icons/hi'

const navigationIcon = {
    home: <HiOutlineHome />,
    // transaction: <HiOutlineCurrencyDollar />,
    transaction: <HiSwitchHorizontal />,
    wallet: <HiOutlineCreditCard />,
    category: <HiOutlineViewGridAdd />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />
}

export default navigationIcon