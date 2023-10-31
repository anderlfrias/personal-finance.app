
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, DatePicker, Drawer, Input } from 'components/ui'
import { HiSearch } from 'react-icons/hi'
import { useTranslation } from 'react-i18next';
import useWallet from 'utils/hooks/custom/useWallet';
import useCategory from 'utils/hooks/custom/useCategory';
import useScreenSize from 'utils/hooks/custom/useScreenSize'
import { getLastHoursOfDay } from 'utils/date';

export const getArrayObjByIds = (arr, ids) => {
    return arr.filter(item => ids.includes(item.id))
}

export const getIdsByArrayObj = (arr) => {
    return arr.map(item => item.id)
}

const p = 'transaction.filter';
const TransactionFilter = ({ isOpen, onClose, filter, setFilter }) => {
    const { t } = useTranslation();
    const { getWallets } = useWallet();
    const { getCategories } = useCategory();
    const [wallets, setWallets] = useState([]);
    const [categories, setCategories] = useState([]);
    const { width: screenWidth } = useScreenSize()

    const [values, setValues] = useState(filter)

    const onChangeValues = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const onChangeDateRange = (dates) => {
        const startDate = dates[0];
        const endDate = getLastHoursOfDay(dates[1]);

        onChangeValues('dateRange', [startDate, endDate])
    }

    const handleSubmit = () => {
        setFilter(values);
        onClose();
    }

    const onClearFilter = () => {
        setValues({
            search: '',
            dateRange: [null, null],
            wallets: [],
            categories: []
        })
    }

    const Footer = (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onClearFilter}>
                {t(`${p}.cancel`)}
            </Button>
            <Button size="sm" variant="solid" onClick={handleSubmit}>
                {t(`${p}.submit`)}
            </Button>
        </div>
    )

    useEffect(() => {
        getWallets().then(res => {
            if (res.status === 'success') setWallets(res.data);
        });
        getCategories().then(res => {
            if (res.status === 'success') setCategories(res.data);
        });
    }, [getWallets, getCategories])

    useEffect(() => {
        setValues(filter)
    }, [filter])

    console.log('TransactionFilter', values)

    return (
        <div>
            <Drawer
                title={t(`${p}.title`)}
                isOpen={isOpen}
                onClose={onClose}
                footer={Footer}
                width={ screenWidth >= 768 ? 500 : screenWidth}
            >
                <div>
                    <div className='mb-4'>
                        <h6>
                            {t(`${p}.search.label`)}
                        </h6>
                        <Input
                            autoComplete='off'
                            name='search'
                            className='mb-2 sm:mb-0'
                            size='sm'
                            placeholder={t(`${p}.search.placeholder`)}
                            prefix={<HiSearch className='text-lg' />}
                            value={values.search}
                            onChange={({ target }) => onChangeValues('search', target.value)}
                        />
                    </div>

                    <div className='mb-4'>
                        <h6>
                            {t(`${p}.date.label`)}
                        </h6>
                        <DatePicker.DatePickerRange
                            className='mb-2 sm:mb-0'
                            size='sm'
                            placeholder={t(`${p}.date.placeholder`)}
                            value={values.dateRange}
                            onChange={onChangeDateRange}
                        />
                    </div>

                    <div className='mb-4'>
                        <h6>
                            {t(`${p}.wallet.label`)}
                        </h6>
                        <Checkbox.Group vertical={true} onChange={(values) => onChangeValues('wallets', getArrayObjByIds(wallets, values))} value={getIdsByArrayObj(values.wallets)}>
                            {
                                wallets.map((item, index) => (
                                    <Checkbox key={index} value={item.id}>
                                        {item.name}
                                    </Checkbox>
                                ))
                            }
                        </Checkbox.Group>
                    </div>

                    <div className='mb-4'>
                        <h6>
                            {t(`${p}.category.label`)}
                        </h6>
                        <Checkbox.Group vertical={true} onChange={(values) => onChangeValues('categories', getArrayObjByIds(categories, values))} value={getIdsByArrayObj(values.categories)}>
                            {
                                categories.map((item, index) => (
                                    <Checkbox key={index} value={item.id}>
                                        {item.name}
                                    </Checkbox>
                                ))
                            }
                        </Checkbox.Group>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default TransactionFilter

