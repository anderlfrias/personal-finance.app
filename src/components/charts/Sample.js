
import React from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from 'constants/chart.constant'
import formatDate from 'utils/formatDate'

const Sample = () => {
    const data = [
        {
            name: 'Ingresos',
            // data: [500, 800, 2500, 1200, 500, 3000, 1000],
            data: [800, 10100, 700, 0, 0, 5000, 600],
        },
        {
            name: 'Gastos',
            // data: [300, 1800, 600, 1500, 775, 900, 2500],
            data: [900, 0, 0, 3000, 2000, 0, 5000],
        },
    ]

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
                    categories: [
                        formatDate(new Date('4/3/2023')),
                        formatDate(new Date('3/31/2023')),
                        formatDate(new Date('3/28/2023')),
                        formatDate(new Date('3/27/2023')),
                        formatDate(new Date('3/20/2023')),
                        formatDate(new Date('3/17/2023')),
                        formatDate(new Date('3/2/2023')),
                        // 'Lunes',
                        // 'Martes',
                        // 'Miercoles',
                        // 'Jueves',
                        // 'Viernes',
                        // 'Sabado',
                        // 'Domingo',
                    ],
                },
            }}
            series={data}
            type="area"
            height={300}
        />
    )
}

export default Sample

