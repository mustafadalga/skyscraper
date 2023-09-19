"use client";
import { useRef, useEffect } from "react";
import { Chart } from 'chart.js/auto';

interface IDataSet {
    label: string,
    data: number[],
    backgroundColor: string[]
}

interface Props {
    data: {
        labels: string[],
        datasets: IDataSet[]
    },
    className: string
}

export default function PieChart({ data, className }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart<'pie', number[], string> | null>(null);

    useEffect(() => {
        if (canvasRef && canvasRef.current) {
            chartRef.current = new Chart(canvasRef.current, {
                type: "pie",
                data,
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
        <div className={className}>
            <canvas ref={canvasRef}/>
        </div>

    );
}
