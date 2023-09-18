"use client";
import { Chart, CategoryScale, LinearScale, TimeScale } from 'chart.js/auto';
import 'chartjs-adapter-moment';

Chart.register(CategoryScale, LinearScale, TimeScale);

import { useRef, useEffect } from "react";

interface IDataSet {
    label: string,
    data: number[],
    borderColor: string,
    borderWidth: number,
    fill: boolean
}

interface Props {
    data: {
        labels: string[],
        datasets: IDataSet[]
    },
    className: string
}

export default function LineChart({ data, className }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart<'line', number[], string> | null>(null);

    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            chartRef.current = new Chart(canvasRef.current, {
                type: "line",
                data,
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [ data ]);

    return (
        <canvas ref={canvasRef} className={className}/>
    );
}
