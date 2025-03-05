import React from 'react';
import { cn } from "../../lib/utils";
import { fontTitle2, fontBodyNormal } from "../../styles/typography";
import { Card, CardContent } from '../ui/card';
import { MonetizationIcon, LabProfileIcon, ReceiptLongIcon, AssignmentTurnedInIcon, CancelIcon, CheckCircleIcon } from '../../icons';

interface StatsMatrixProps {
    revenue: string;
    allOrders: number;
    paidOrders: number;
    accepted: number;
    completed: number;
    canceled: number;
}

export function OrderStatsMatrix({ revenue, allOrders, paidOrders, accepted, completed, canceled }: StatsMatrixProps) {

    const StatsData = [
        { title: "Revenue", value: `$${revenue}`, Icon: MonetizationIcon, cardClass: "bg-[#ff5733] text-white" },
        { title: "Today's Order", value: allOrders, Icon: LabProfileIcon, cardClass: "bg-white" },
        { title: "Paid Orders", value: paidOrders, Icon: ReceiptLongIcon, cardClass: "bg-white" },
        { title: "Accepted", value: accepted, Icon: AssignmentTurnedInIcon, cardClass: "bg-white" },
        { title: "Completed", value: completed, Icon: CancelIcon, cardClass: "bg-white" },
        { title: "Canceled", value: canceled, Icon: CheckCircleIcon, cardClass: "bg-white", iconClass: "text-semantic-red" }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 mb-6">
            {StatsData.map(({ title, value, Icon, cardClass, iconClass }) => (
                <Card key={title} className={cn("p-4 rounded-2xl border-0", cardClass)}>
                    <CardContent className="flex flex-col justify-between gap-y-20 p-0">
                        <div className="flex items-center">
                            <Icon className={iconClass} />
                        </div>
                        <div className='bottom'>
                            <h3 className={cn(fontBodyNormal)}>{title}</h3>
                            <div className={cn(fontTitle2, "mt-2")}>{value}</div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}