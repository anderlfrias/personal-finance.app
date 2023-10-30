import React from 'react';
import { getObjectByQuery, getQueryByObject } from './TransactionFilter';
import { Tag, useConfig } from 'components/ui';
import { HiX } from 'react-icons/hi';
import formatDate from 'utils/formatDate';

export default function DisplayFilter({ query, setQuery }) {
  const { themeColor, primaryColorLevel, } = useConfig()
  const { startDate, endDate, wallets, categories, q } = getObjectByQuery(query)
  const obj = {
    q: q,
    dateRange: startDate && endDate ? `${formatDate(new Date(startDate))} ~ ${formatDate(new Date(endDate))}` : null,
    wallets: wallets,
    categories: categories
  }

  const onDeleteItem = (key) => {
    console.log('delete', key)
    const newObj = {
      ...getObjectByQuery(query),
      [key]: ''
    };

    if (key === 'dateRange') {
      newObj.startDate = '';
      newObj.endDate = '';
      delete newObj.dateRange;
    }

    console.log(newObj)
    const newQuery = getQueryByObject(newObj);
    console.log(newQuery)
    setQuery(newQuery)
  }

  console.log(obj)
  return (
    <div className='flex gap-1 flex-wrap mb-2'>
      {Object.keys(obj).map((key) => (
        <div key={key}>
          {obj[key] && (
            <Tag
              key={key}
              suffix={<HiX className="ml-1 rtl:mr-1 cursor-pointer" onClick={() => onDeleteItem(key)} />}
              className={`bg-${themeColor}-100 text-${themeColor}-${primaryColorLevel} dark:bg-${themeColor}-${primaryColorLevel} dark:text-${themeColor}-100 border-0 rounded`}
            >
              <div className='min-w-max'>
                {key}: {obj[key]}
              </div>
            </Tag>
          )}
        </div>
      ))}
    </div>
  );
}

