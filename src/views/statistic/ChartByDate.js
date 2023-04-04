import React, { useCallback, useEffect, useState } from 'react'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import formatDate from 'utils/formatDate'
import useStatistic from 'utils/hooks/custom/useStatistic'
import { Card, DatePicker } from 'components/ui'
import { useTranslation } from 'react-i18next'
import { getEndDate, getLastHoursOfDay, getStartDate } from 'utils/date'

const { DatePickerRange } = DatePicker

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
            setData(resp.data.series.map((item) => ({ ...item, name: t(`statistic.${item.name}`) })))
            setCategories(resp.data.categories.map((item) =>  formatDate(new Date(item))))
        }
    }, [getStatistic, t])

    useEffect(() => {
        fetchData(startDate, endDate)
    }, [fetchData, startDate, endDate])

    return (
        <>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        {t(`${p}.title`)}
                    </h3>
                    <div>
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