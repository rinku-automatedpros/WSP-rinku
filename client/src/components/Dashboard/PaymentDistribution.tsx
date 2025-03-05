import React from 'react';
import { cn } from "../../lib/utils";
import { fontBodyNormal, fontCaptionNormal, fontHeadline, fontTitle2 } from "../../styles/typography";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface PaymentDistributionProps {
    data: Array<{
        name: string;
        value: number;
        color: string;
        currency: string;
    }>;
    totalRevenue: string;
}

export function PaymentDistribution({ data, totalRevenue }: PaymentDistributionProps) {
    return (
        <div className="bg-black-5 p-6 rounded-lg">
            <h2 className={cn(fontHeadline, "mb-4 font-medium")}>Payment Type Distribution</h2>
            <div className="grid grid-cols-4">
                <div className="relative col-span-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius="55%"
                                outerRadius="85%"
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center gap-1">
                            <div className={cn(fontTitle2)}>
                                ${totalRevenue}
                            </div>
                        </div>
                        <div className={cn(fontBodyNormal, "text-gray-500")}>Total</div>
                    </div>
                </div>
                <div className="flex h-[300px] flex-col justify-center space-y-3 col-span-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <div className="flex w-48 items-center gap-2">
                                <div
                                    className="h-2 w-5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className={cn(fontCaptionNormal)}>{item.name}</span>
                            </div>
                            <span className="font-medium">
                                {item.currency}{item.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}