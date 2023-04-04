
import React from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from 'constants/chart.constant'
import formatDate from 'utils/formatDate'
import useStatistic from 'utils/hooks/custom/useStatistic'

const Sample = () => {
    const { getStatistic } = useStatistic()
    const [data, setData] = React.useState([])
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            const resp = await getStatistic()

            if (resp.status === 'success') {
                setData(resp.data.series)
                setCategories(resp.data.categories.map((item) =>  formatDate(new Date(item))))
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

