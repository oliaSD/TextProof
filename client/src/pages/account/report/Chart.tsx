import { Pie } from '@antv/g2plot';
import React, { useEffect, useMemo, useRef } from 'react';

interface PieChartProps {
    data: Array<{ type: string; value: number }>;
    width?: number;
    height?: number;
}

export const PieChartComponent = ({
    data,
    width = 500,
    height = 300,
}: PieChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const piePlotRef = useRef<Pie | null>(null);
    const prevDataRef = useRef<any>(null);

    const chartConfig = useMemo(() => ({
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        color: ['#D189C9', '#d9d9d9', '#ae009a'],
        label: {
            type: 'inner',
            offset: '50%',
            content: '{percentage}',
            style: {
                fontSize: 'clamp(10px, 2vw, 14px)',
                fill: 'white'
            },
        },

        interactions: [{ type: 'element-active' }],
    }), []);


    useEffect(() => {
        if (!containerRef.current) return;

        if (!piePlotRef.current) {
            piePlotRef.current = new Pie(containerRef.current, {
                ...chartConfig,
                legend: {
                    position: 'right',
                    itemName: {
                        style: {
                            fill: '#fff',
                            fontSize: 16,
                        },
                    },
                },
                statistic: {
                    title: false,
                    content: false,
                },
                data,
                width,
                height,
            });
            piePlotRef.current.render();
        } else {
            if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data)) {
                piePlotRef.current.update({
                    ...chartConfig,
                    legend: {
                        position: 'right',
                        itemName: {
                            style: {
                                fill: '#fff',
                                fontSize: 16,
                            },
                        },
                    },
                    statistic: {
                        title: false,
                        content: false,
                    },
                    data,
                });
            }
        }

        // Сохраняем текущие данные для сравнения
        prevDataRef.current = data;
        return () => {
            // Не уничтожаем график при обновлениях, только при размонтировании
        };
    }, [data, width, height, chartConfig]);

    useEffect(() => {
        return () => {
            piePlotRef.current?.destroy();
            piePlotRef.current = null;
        };
    }, []);

    return <div ref={containerRef} style={{ width, height }} />;
};