import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { cn } from "../../lib/utils";
import { fontHeadline } from '@/styles/typography';

interface CompletedOrdersProps {
    data: Array<{
        frequency: string;
        orders: number;
        isActive: boolean;
    }>;
}

export function CompletedOrders({ data }: CompletedOrdersProps) {
    const chartConfig = {
        orders: {
            label: "Orders",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    const maxOrders = Math.max(...data.map(d => d.orders));

    return (
        <div className="bg-black-5 p-6 rounded-lg">
            <h2 className={cn(fontHeadline, "mb-4 font-medium")}>Completed Orders</h2>
            <ChartContainer config={chartConfig} className={cn("h-[30vh]", data.length < 12 ? "w-auto justify-start" : "w-full")}>

                <BarChart
                    accessibilityLayer
                    data={data}
                    margin={{ top: 20, bottom: 0, left: 0, right: 0 }}
                >
                    <defs>
                        <pattern
                            id="striped-pattern"
                            width="8"
                            height="4"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(45)"
                        >
                            <rect width="4" height="4" fill="rgba(0, 0, 0, 0.05)" />
                        </pattern>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="frequency" axisLine={false} tick={false} />
                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent
                                hideLabel
                                formatter={(value: any) => [value, ""]}
                                className="relative min-h-0 min-w-0 bg-black p-2 text-white [&_*]:text-white after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-black rounded-xl w-[50px] h-[40px] items-center justify-center"
                            />
                        }
                    />

                    <YAxis domain={[0, "dataMax"]} hide />
                    <Bar
                        dataKey="orders"
                        radius={[50, 50, 50, 50]}
                        background={({ x, y, width, height }: any) => (
                            <>
                                <rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    rx={25}
                                    fill="rgba(0, 0, 0, 0.05)"
                                />
                                <rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    rx={25}
                                    fill="url(#striped-pattern)"
                                />
                            </>
                        )}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    entry.orders === maxOrders
                                        ? "var(--brand-background)"
                                        : "white"
                                }
                            />
                        ))}
                        <LabelList
                            dataKey="frequency"
                            position="insideBottom"
                            className="fill-foreground"
                            content={({ x, y, value, height, width }: any) => {
                                const isMax =
                                    data.find((d) => d.frequency === value)?.orders ===
                                    maxOrders

                                const circleSize = Math.min(width * 0.8, 60)
                                const xOffset = (width - circleSize) / 2

                                return (
                                    <foreignObject
                                        x={x! + xOffset}
                                        y={height + y - (circleSize + 10)}
                                        width={circleSize}
                                        height={circleSize}
                                    >
                                        <div
                                            className={`flex h-full w-full items-center justify-center rounded-full text-center ${isMax
                                                ? "bg-white-100 text-black-100"
                                                : "bg-black-10 text-[var(--foreground)]"
                                                }`}
                                        >
                                            {value}
                                        </div>
                                    </foreignObject>
                                )
                            }}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer >
        </div>
    );
}