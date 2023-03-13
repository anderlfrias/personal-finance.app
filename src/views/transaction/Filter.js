
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, DatePicker, Drawer, Input } from 'components/ui'
import { HiSearch } from 'react-icons/hi'
import { useTranslation } from 'react-i18next';
import useWallet from 'utils/hooks/custom/useWallet';
import useCategory from 'utils/hooks/custom/useCategory';

const p = 'transaction.filter';

const Filter = ({ isOpen, onClose, onSubmit }) => {
    const { t } = useTranslation();
    const { getWallets } = useWallet();
    const { getCategories } = useCategory();
    const [wallets, setWallets] = useState([]);
    const [categories, setCategories] = useState([]);

    const [values, setValues] = useState({})

    const onChangeValues = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = () => {
        console.log('values', values)

        const query = Object.keys(values).map(key => {
            if (key === 'search') return `${values[key]}`;
            if (key === 'dateRange') {
                const startDate = values[key][0] ? new Date(values[key][0]).toISOString() : null;
                const endDate = values[key][1] ? new Date(values[key][1]).toISOString() : null;
                if (startDate && endDate) return `&startDate=${startDate}&endDate=${endDate}`;
                if (startDate) return `&startDate=${startDate}`;
                if (endDate) return `&endDate=${endDate}`;
                return '';
            }
            return `&${key}=${values[key]}`;
        }).join('');

        console.log('query', query);
        onSubmit(query);
        // onClose();
    }

    const onClearFilter = () => {
        setValues({
            search: '',
            dateRange: [null, null],
            wallets: wallets.map(item => item.id),
            categories: categories.map(item => item.id)
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
        setValues({
            search: '',
            dateRange: [null, null],
            wallets: wallets.map(item => item.id),
            categories: categories.map(item => item.id)
        })
    }, [wallets, categories])
    return (
        <div>
            <Drawer
                title={t(`${p}.title`)}
                isOpen={isOpen}
                onClose={onClose}
                onRequestClose={onClose}
                footer={Footer}
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
                            onChange={(date) => onChangeValues('dateRange',date)}
                        />
                    </div>

                    <div className='mb-4'>
                        <h6>
                            {t(`${p}.wallet.label`)}
                        </h6>
                        <Checkbox.Group vertical={true} onChange={(values) => onChangeValues('wallets', values)} value={values.wallets}>
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
                        <Checkbox.Group vertical={true} onChange={(values) => onChangeValues('categories', values)} value={values.categories}>
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

export default Filter
