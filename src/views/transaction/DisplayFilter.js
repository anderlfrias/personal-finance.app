import React from 'react';
import { getObjectByQuery, getQueryByObject } from './TransactionFilter';
import { Tag, useConfig } from 'components/ui';
import { HiX } from 'react-icons/hi';
import formatDate from 'utils/formatDate';
import { useTranslation } from 'react-i18next';

const p = 'transaction.filter';
export default function DisplayFilter({ query, setQuery }) {
  const { t } = useTranslation();
  const { themeColor, primaryColorLevel, } = useConfig()
  const { startDate, endDate, wallets, categories, q } = getObjectByQuery(query)
  const obj = {
    q: q,
    dateRange: startDate && endDate ? `${formatDate(new Date(startDate))} ~ ${formatDate(new Date(endDate))}` : null,
    wallets: wallets,
    categories: categories
  }

  const onDeleteItem = (key) => {
    const newObj = {
      ...getObjectByQuery(query),
      [key]: ''
    };

    if (key === 'dateRange') {
      newObj.startDate = '';
      newObj.endDate = '';
      delete newObj.dateRange;
    }

    const newQuery = getQueryByObject(newObj);
    setQuery(newQuery)
  }

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
                {t(`${p}.${key}`)}: {obj[key]}
              </div>
            </Tag>
          )}
        </div>
      ))}
    </div>
  );
}

