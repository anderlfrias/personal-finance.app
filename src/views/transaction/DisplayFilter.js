import React from 'react';
import { Tag, useConfig } from 'components/ui';
import { HiX } from 'react-icons/hi';
import formatDate from 'utils/formatDate';
import classNames from 'classnames';

export default function DisplayFilter({ className, filter, setFilter }) {
  const { themeColor, primaryColorLevel, } = useConfig()
  const { search, dateRange, wallets, categories } = filter

  const deleteDateRange = () => setFilter((prev) => ({ ...prev, dateRange: [null, null] }))
  const deleteWallet = (id) => setFilter((prev) => ({ ...prev, wallets: wallets.filter(item => item.id !== id) }))
  const deleteCategory = (id) => setFilter((prev) => ({ ...prev, categories: categories.filter(item => item.id !== id) }))
  const deleteSearch = () => setFilter((prev) => ({ ...prev, search: '' }))

  return (
    <div className={classNames('flex gap-1 flex-wrap', className)}>
      {search && (
        <Tag
          suffix={<HiX className='ml-1 cursor-pointer' onClick={deleteSearch} />}
          className={`bg-${themeColor}-100 text-${themeColor}-${primaryColorLevel} dark:bg-${themeColor}-${primaryColorLevel} dark:text-${themeColor}-100 border-0 rounded`}
        >
          {search}
        </Tag>
      )}

      {(dateRange[0] && dateRange[1]) && (
        <Tag
          suffix={<HiX className='ml-1 cursor-pointer' onClick={deleteDateRange} />}
          className={`bg-${themeColor}-100 text-${themeColor}-${primaryColorLevel} dark:bg-${themeColor}-${primaryColorLevel} dark:text-${themeColor}-100 border-0 rounded`}
        >
          {formatDate(dateRange[0])} ~ {formatDate(dateRange[1])}
        </Tag>
      )}

      {wallets.length > 0 && wallets.map((item) => (
        <Tag
          key={item.id}
          suffix={<HiX className='ml-1 cursor-pointer' onClick={() => deleteWallet(item.id)} />}
          className={`bg-${themeColor}-100 text-${themeColor}-${primaryColorLevel} dark:bg-${themeColor}-${primaryColorLevel} dark:text-${themeColor}-100 border-0 rounded`}
        >
          {item.name}
        </Tag>
      ))}

      {categories.length > 0 && categories.map((item) => (
        <Tag
          key={item.id}
          suffix={<HiX className='ml-1 cursor-pointer' onClick={() => deleteCategory(item.id)} />}
          className={`bg-${themeColor}-100 text-${themeColor}-${primaryColorLevel} dark:bg-${themeColor}-${primaryColorLevel} dark:text-${themeColor}-100 border-0 rounded`}
        >
          {item.name}
        </Tag>
      ))}
    </div>
  );
}

