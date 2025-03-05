import React from 'react';
import { cn } from "../../lib/utils";
import { fontCaptionBold, fontCaptionNormal, fontHeadline } from "../../styles/typography";
import { Card, CardContent } from '../ui/card';

interface PopularItemsProps {
    items: Array<{ name: string; orders: number }>;
}

export function PopularItems({ items }: PopularItemsProps) {
    return (
        <div className="bg-black-5 p-6 rounded-lg ">
            <h2 className={cn(fontHeadline, "mb-4 font-medium")}>Popular Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                    <Card key={index} className="h-full rounded-2xl bg-white-60 border-0 shadow-0 p-4">
                        <CardContent className="flex h-full flex-col justify-between gap-y-10 p-0">
                            <h3 className={cn(fontCaptionBold)}>{item.name}</h3>
                            <p>
                            <span className={cn(fontCaptionNormal, "text-gray-500")}>Order:</span> <span className={cn(fontCaptionBold)}>{item.orders}</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}