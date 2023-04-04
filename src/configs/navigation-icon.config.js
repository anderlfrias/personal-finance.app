import React from 'react'
import {
    HiOutlineColorSwatch,
	HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineCreditCard,
    HiSwitchHorizontal,
    HiOutlineCurrencyDollar,
    HiOutlineChartPie,
} from 'react-icons/hi'

const navigationIcon = {
    home: <HiOutlineHome />,
    transaction: <HiSwitchHorizontal />,
    budget: <HiOutlineCurrencyDollar />,
    wallet: <HiOutlineCreditCard />,
    category: <HiOutlineViewGridAdd />,
    statistic: <HiOutlineChartPie />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />
}

export default navigationIcon