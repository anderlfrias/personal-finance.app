
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from 'constants/chart.constant'
import { Card, Table } from 'components/ui'
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange'
import { getEndDate, getStartDate } from 'utils/date'
import { useTranslation } from 'react-i18next'
import useStatistic from 'utils/hooks/custom/useStatistic'
import formatCurrency from 'utils/formatCurrency'
import { Loading } from 'components/shared'

const { Tr, Th, Td, THead, TBody } = Table

const handleResp = ({ data }) => {
    const categories = data.map((item) => {
        return item.category || '';
    });

    const incomes = data.map((item) => {
        return item.incomes || 0;
    });

    const expenses = data.map((item) => {
        return item.expenses || 0;
    });

    return { categories, incomes, expenses };
}

const p = 'statistic.chartOfCategory'
const ChartOfCategory = ({ type = 'income' }) => {
    const { t } = useTranslation()
    const { getStatisticOfCategory } = useStatistic()
    const [startDate, setStartDate] = useState(getStartDate())
    const [endDate, setEndDate] = useState(getEndDate())
    const [categories, setCategories] = useState([])
    const [data, setData] = useState([])
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(false)

    const onChangeDate = (dates) => {
        const [start, end] = dates

        setStartDate(start ? new Date(start) : null)
        setEndDate(end ? new Date(end) : null)
    }

    useEffect(() => {
    const fetchData = async (startDate, endDate) => {
        setLoading(true)
        const query = startDate && endDate ? `startDate=${new Date(startDate).toISOString()}&endDate=${new Date(endDate).toISOString()}` : ''
        const resp = await getStatisticOfCategory(query)

        if (resp.status === 'success') {
            const { categories, incomes, expenses } = handleResp(resp)
            console.log(categories, incomes, expenses)
            setCategories(categories)
            setData(resp.data)
            setIncomes(incomes)
            setExpenses(expenses)
        }
        setLoading(false)
    }

    (startDate && endDate) && fetchData(startDate, endDate)
    }, [getStatisticOfCategory, startDate, endDate, type])

    return (
        <>
            <Card>
                <Loading loading={loading} type='cover'>
                <div className="sm:flex justify-between gap-y-4">
                    <h3 className="text-lg font-semibold">
                        {t(`${p}.${type}.title`)}
                    </h3>
                    <div className="min-w-[215px] mb-4">
                        <DatePickerRange
                            placeholder={t(`${p}.filter.date.placeholder`)}
                            onChange={onChangeDate}
                            size="sm"
                            value={[startDate, endDate]}
                            clearable={false}
                        />
                    </div>
                </div>

                {
                    data.length === 0 && (
                        <div className="flex justify-center h-40">
                            <p className="italic">{t(`${p}.noData`)}</p>
                        </div>
                    )
                }

                {
                    data.length > 0 && (
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div className='w-full'>
                                <Chart
                                    options={{
                                        colors: COLORS,
                                        labels: categories,
                                        responsive: [
                                            {
                                                breakpoint: 480,
                                                options: {
                                                    chart: {
                                                        width: 200,
                                                    },
                                                    legend: {
                                                        position: 'bottom',
                                                    },
                                                },
                                            },
                                        ],
                                    }}
                                    series={type === 'expense' ? expenses : incomes}
                                    height={300}
                                    type="pie"
                                />
                            </div>
                            <div className=''>
                                <Table>
                                    <THead>
                                        <Tr>
                                            <Th>#</Th>
                                            <Th>{t(`${p}.${type}.table.category`)}</Th>
                                            <Th>{t(`${p}.${type}.table.amount`)}</Th>
                                        </Tr>
                                    </THead>
                                    <TBody>
                                        {data.map((item, index) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{item.category}</Td>
                                                <Td>{type === 'expense' ? formatCurrency(item.expenses) : formatCurrency(item.incomes)}</Td>
                                            </Tr>
                                        ))}
                                    </TBody>
                                </Table>
                            </div>
                        </div>
                    )
                }
                </Loading>
            </Card>
        </>
    )
}

export default ChartOfCategory

