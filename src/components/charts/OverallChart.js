import React, { useCallback, useEffect, useState } from 'react'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import formatDate from 'utils/formatDate'
import useStatistic from 'utils/hooks/custom/useStatistic'
import { Button, Card, InputGroup } from 'components/ui'
import { useTranslation } from 'react-i18next'
import formatCurrency from 'utils/formatCurrency'
// import { getEndDate, getEndDateOfWeeks, getEndDateOfYears, getStartDate, getStartDateOfWeeks, getStartDateOfYears } from 'utils/date'


// const getRangeDate = (range) => {
//     switch (range) {
//         case 'yearly':
//             return { startDate: getStartDateOfYears(new Date().getFullYear()), endDate: getEndDateOfYears(new Date().getFullYear()) }
//         case 'monthly':
//             return { startDate: getStartDate(), endDate: getEndDate() }
//         case 'weekly':
//             return { startDate: getStartDateOfWeeks(new Date()), endDate: getEndDateOfWeeks(new Date()) }
//         default:
//             return { startDate: getStartDate(), endDate: getEndDate() }
//     }
// }

const handleResp = (data) => {
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


const p = 'statistic.overallChart'
function OverallChart() {
    const { t } = useTranslation()
    const { getStatisticsByTimeFrame } = useStatistic()
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [searchRange, setSearchRange] = useState('month')

    const onChangeSearchRange = (range) => {
        if (searchRange === range) {
            return
        }

        setSearchRange(range)
    }

    const fetchData = useCallback(async (searchRange) => {
        const resp = await getStatisticsByTimeFrame(searchRange)
        if (resp.status === 'success') {
            console.log(handleResp(resp.data))
            const { series, categories } = handleResp(resp.data)
            setData(series.map((item) => ({ ...item, name: t(`statistic.${item.name}`) })))
            setCategories(categories.map((item) => {
                const p = searchRange === 'year' ? 'months' : 'days';
                if (searchRange === 'month') return formatDate(new Date(item))
                return t(`statistic.${p}.${item}`)
            }))
        }
    }, [getStatisticsByTimeFrame, t])

    useEffect(() => {
        fetchData(searchRange)
    }, [fetchData, searchRange])

    return (
        <>
            <Card>
                <div className="sm:flex justify-between gap-y-4">
                    <h3 className="text-lg font-semibold">
                        {t(`${p}.title`)}
                    </h3>
                    <div className="mb-4">
                        <InputGroup>
                            <Button
                                active={searchRange === 'year'}
                                onClick={() => onChangeSearchRange('year')}
                                size="sm"
                            >
                                {t(`${p}.filter.yearly`)}
                            </Button>
                            <Button
                                active={searchRange === 'month'}
                                onClick={() => onChangeSearchRange('month')}
                                size="sm"
                            >
                                {t(`${p}.filter.monthly`)}
                            </Button>
                            <Button
                                active={searchRange === 'week'}
                                onClick={() => onChangeSearchRange('week')}
                                size="sm"
                            >
                                {t(`${p}.filter.weekly`)}
                            </Button>
                        </InputGroup>
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

export default OverallChart