import React, { useCallback, useEffect, useState } from 'react'
import { Chart, Loading } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import formatDate from 'utils/formatDate'
import useStatistic from 'utils/hooks/custom/useStatistic'
import { Button, Card } from 'components/ui'
import { useTranslation } from 'react-i18next'
import formatCurrency from 'utils/formatCurrency'
import { HiOutlineAdjustments } from 'react-icons/hi'
import TransactionFilter, { defaultFilterValues } from 'views/transaction/TransactionFilter'
import { getQueryByObject } from 'utils/query'
import DisplayFilter from 'views/transaction/DisplayFilter'

const handleResp = ({ data }) => {
    const categories = data.map((item) => {
        return item.date || '';
    });

    const incomes = data.map((item) => {
        return item.income || 0;
    });

    const expenses = data.map((item) => {
        return item.expense || 0;
    });

    const series = [
        {
            name: 'incomes',
            data: incomes,
        },
        {
            name: 'expenses',
            data: expenses,
        },
    ];

    return { categories, series };
}

const p = 'statistic.chartByDate'
function ChartByFilter() {
    const { t } = useTranslation()
    const { getStatistic } = useStatistic()
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState(defaultFilterValues)

    const openFilter = () => setIsFilterOpen(true)
    const onCloseFilter = () => setIsFilterOpen(false)

    const hasData = (data) => {
        if (data.length === 0) return false
        return data[0].data.length > 0 || data[1].data.length > 0
    }

    const fetchData = useCallback(async (q = '') => {
        setLoading(true)
        const resp = await getStatistic(q)
        if (resp.status === 'success') {
            const { series, categories } = handleResp(resp)
            setData(series.map((item) => ({ ...item, name: t(`statistic.${item.name}`) })))
            setCategories(categories.map((item) =>  formatDate(new Date(item))))
        }
        setLoading(false)
    }, [getStatistic, t])

    useEffect(() => {
        fetchData(filter ?
            getQueryByObject({
                q: filter?.search,
                startDate: filter?.dateRange[0] ? new Date(filter.dateRange[0]).toISOString() : '',
                endDate: filter?.dateRange[0] ? new Date(filter.dateRange[1]).toISOString() : '',
                wallets: filter?.wallets.map(item => item.id).join(','),
                categories: filter?.categories.map(item => item.id).join(','),
            }) :
            ''
        );
    }, [fetchData, filter])

    return (
        <>
            <Card>
                <Loading loading={loading} type='cover'>
                <div className="sm:flex flex-row-reverse justify-between items-center gap-y-4 mb-4">
                    {/* <h3 className="text-lg font-semibold">
                        {t(`${p}.title`)}
                    </h3> */}
                    <div className='mb-2 sm:mb-0'>
                        <Button size='sm' icon={<HiOutlineAdjustments className='rotate-90' />} onClick={openFilter} >
                            {t(`${p}.filter.title`)}
                        </Button>
                    </div>
                    <div>
                        <DisplayFilter filter={filter} setFilter={setFilter} />
                    </div>
                </div>

                {
                    hasData(data) ? (
                        <Chart
                            options={{
                                dataLabels: {
                                    enabled: false,
                                },
                                colors: [COLORS[2], COLORS[4]],
                                stroke: {
                                    curve: 'smooth',
                                },
                                xaxis: {
                                    type: 'category',
                                    categories: categories,
                                },
                                tooltip: {
                                    y: {
                                        formatter: function (val) {
                                            return formatCurrency(val)
                                        }
                                    }
                                },
                            }}
                            series={data}
                            type="area"
                            height={300}
                        />
                    ) : (
                        <div className="flex justify-center h-40">
                            <p className="italic">{t(`${p}.noData`)}</p>
                        </div>
                    )
                }
                </Loading>
            </Card>

            <TransactionFilter isOpen={isFilterOpen} onClose={onCloseFilter} filter={filter} setFilter={setFilter} />
        </>
    )
}

export default ChartByFilter