
import React from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from 'constants/chart.constant'
import formatDate from 'utils/formatDate'
import useStatistic from 'utils/hooks/custom/useStatistic'

const Sample = () => {
    const { getStatistic } = useStatistic()
    const [data, setData] = React.useState([])
    const [categories, setCategories] = React.useState([])

    // const data = [
    //     {
    //         name: 'Ingresos',
    //         data: [800, 10100, 700, 0, 0, 5000, 600],
    //     },
    //     {
    //         name: 'Gastos',
    //         data: [900, 0, 0, 3000, 2000, 0, 5000],
    //     },
    // ]

    React.useEffect(() => {
        const fetchData = async () => {
            const resp = await getStatistic()

            if (resp.status === 'success') {
                setData(resp.data.series)
                setCategories(resp.data.categories.map((item) => {
                    console.log(item)
                    return formatDate(new Date(item))
                }))
            }
        }

        fetchData()
    }, [getStatistic])

    return (
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
    )
}

export default Sample

