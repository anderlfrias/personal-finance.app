import React, { useCallback, useEffect, useState } from 'react'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import formatDate from 'utils/formatDate'
import useStatistic from 'utils/hooks/custom/useStatistic'
import { Card, DatePicker } from 'components/ui'
import { useTranslation } from 'react-i18next'
import { getEndDate, getLastHoursOfDay, getStartDate } from 'utils/date'
import formatCurrency from 'utils/formatCurrency'

const { DatePickerRange } = DatePicker

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
function ChartByDate() {
    const { t } = useTranslation()
    const { getStatistic } = useStatistic()
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [startDate, setStartDate] = useState(getStartDate())
    const [endDate, setEndDate] = useState(getEndDate())

    const onChangeDate = (dates) => {
        const [start, end] = dates

        setStartDate(start ? new Date(start) : null)
        setEndDate(end ? getLastHoursOfDay(new Date(end)): null)
    }

    const fetchData = useCallback(async (startDate, endDate) => {
        if (!startDate || !endDate) {
            return
        }
        const q = `startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        const resp = await getStatistic(q)
        if (resp.status === 'success') {
            const { series, categories } = handleResp(resp)
            setData(series.map((item) => ({ ...item, name: t(`statistic.${item.name}`) })))
            setCategories(categories.map((item) =>  formatDate(new Date(item))))
        }
    }, [getStatistic, t])

    useEffect(() => {
        fetchData(startDate, endDate)
    }, [fetchData, startDate, endDate])

    return (
        <>
            <Card>
                <div className="sm:flex justify-between gap-y-4">
                    <h3 className="text-lg font-semibold">
                        {t(`${p}.title`)}
                    </h3>
                    <div className="mb-4">
                        <DatePickerRange
                            placeholder={t(`${p}.filter.date.placeholder`)}
                            onChange={onChangeDate}
                            size="sm"
                            value={[startDate, endDate]}
                            clearable={false}
                        />
                    </div>
                </div>
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
            </Card>
        </>
    )
}

export default ChartByDate