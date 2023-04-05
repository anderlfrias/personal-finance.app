import React, { useCallback, useEffect, useState } from 'react'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import formatDate from 'utils/formatDate'
import useStatistic from 'utils/hooks/custom/useStatistic'
import { Button, Card, InputGroup } from 'components/ui'
import { useTranslation } from 'react-i18next'
import formatCurrency from 'utils/formatCurrency'
import { getEndDate, getEndDateOfWeeks, getEndDateOfYears, getStartDate, getStartDateOfWeeks, getStartDateOfYears } from 'utils/date'


const getRangeDate = (range) => {
    switch (range) {
        case 'yearly':
            return { startDate: getStartDateOfYears(new Date().getFullYear()), endDate: getEndDateOfYears(new Date().getFullYear()) }
        case 'monthly':
            return { startDate: getStartDate(), endDate: getEndDate() }
        case 'weekly':
            return { startDate: getStartDateOfWeeks(new Date()), endDate: getEndDateOfWeeks(new Date()) }
        default:
            return { startDate: getStartDate(), endDate: getEndDate() }
    }
}

const handleResp = (data, range) => {
    return data
}


const p = 'statistic.overallChart'
function OverallChart() {
    const { t } = useTranslation()
    const { getStatistic } = useStatistic()
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [searchRange, setSearchRange] = useState('monthly')

    const onChangeSearchRange = (range) => {
        console.log(range)
        if (searchRange === range) {
            return
        }

        setSearchRange(range)
    }

    const fetchData = useCallback(async (searchRange) => {
        const { startDate, endDate } = getRangeDate(searchRange)
        const searchParams = `startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        const resp = await getStatistic(searchParams)
        if (resp.status === 'success') {
            console.log(handleResp(resp.data, searchRange))
        }
    }, [getStatistic])

    useEffect(() => {
        fetchData(searchRange)
    }, [fetchData, searchRange])

    return (
        <>
            <Card>
                <div className="sm:flex justify-between gap-y-4">
                    {/* <h3 className="text-lg font-semibold">
                        {t(`${p}.title`)}
                    </h3> */}
                    <div className="mb-4">
                        <InputGroup>
                            <Button
                                active={searchRange === 'yearly'}
                                onClick={() => onChangeSearchRange('yearly')}
                                size="sm"
                            >
                                {t(`${p}.filter.yearly`)}
                            </Button>
                            <Button
                                active={searchRange === 'monthly'}
                                onClick={() => onChangeSearchRange('monthly')}
                                size="sm"
                            >
                                {t(`${p}.filter.monthly`)}
                            </Button>
                            <Button
                                active={searchRange === 'weekly'}
                                onClick={() => onChangeSearchRange('weekly')}
                                size="sm"
                            >
                                {t(`${p}.filter.weekly`)}
                            </Button>
                        </InputGroup>
                    </div>
                </div>
                <Chart
                    options={{
                        plotOptions: {
                            bar: {
                                // borderRadius: 4,
                                horizontal: false,
                                columnWidth: '35%',
                                endingShape: 'rounded',
                            },
                        },
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