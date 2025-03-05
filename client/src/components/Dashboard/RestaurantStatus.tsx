import React from 'react';
import { cn } from "../../lib/utils";
import { fontHeadline } from "../../styles/typography";
import { Tab } from "../tab";
import Spinner from '../spinner';

type RestaurantStatusType = 'open' | 'busy' | 'closed';

interface RestaurantStatusProps {
    status: RestaurantStatusType;
    onStatusChange: (status: RestaurantStatusType) => void;
    loading: boolean;
}

const restaurantStatusOptions = [
    { value: "open", label: "OPEN", color: "bg-semantic-green-100" },
    { value: "busy", label: "BUSY", color: "bg-semantic-yellow-100" },
    { value: "closed", label: "CLOSED", color: "bg-semantic-red-100" },
];

export function RestaurantStatus({ status, onStatusChange, loading }: RestaurantStatusProps) {
    return (
        <div className="flex items-center justify-between rounded-5 bg-black-5 px-4 py-6">
            <div className="flex flex-wrap items-center gap-4">
                <h2 className={cn(fontHeadline, "font-medium")}>Restaurant Status</h2>
                {restaurantStatusOptions.map(({ value, label, color }) => (
                    <Tab
                        key={value}
                        className={cn(status === value ? color : "bg-white-70 text-gray-800")}
                        variant="primary"
                        isActive={status === value}
                        onClick={() => !loading && onStatusChange(value as RestaurantStatusType)}
                    >
                        {loading && status == value ? (
                            <Spinner className='h-5 w-5 border-2 border-t-2 animate-spin' />
                        ) : null}
                        {label}
                    </Tab>
                ))}
            </div>
        </div>
    );
}