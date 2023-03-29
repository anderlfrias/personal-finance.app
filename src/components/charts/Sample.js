
import React from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from 'constants/chart.constant'

const Sample = () => {
    const data = [
        {
            name: 'Ingresos',
            data: [500, 800, 2500, 1200, 500, 3000, 1000],
        },
        {
            name: 'Gastos',
            data: [300, 1800, 600, 1500, 775, 900, 2500],
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
                        'Lunes',
                        'Martes',
                        'Miercoles',
                        'Jueves',
                        'Viernes',
                        'Sabado',
                        'Domingo',
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

