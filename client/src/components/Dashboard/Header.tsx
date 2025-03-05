import React from 'react';
import { cn } from "../../lib/utils";
import { fontTitle1 } from "../../styles/typography";
import { CustomSelect } from "../select";

type DateRange = "Today" | "Weekly" | "Monthly" | "Yearly";

interface HeaderProps {
    selectedRange: DateRange;
    onRangeChange: (option: { value: string; label: string }) => void;
}

const rangeOptions = [
    { value: "Today", label: "Today" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
];

export function Header({ selectedRange, onRangeChange }: HeaderProps) {
    return (
        <div className="flex items-center justify-between px-4 pt-7">
            <h1 className={cn("font-medium", fontTitle1)}>Dashboard</h1>
            <div className="flex gap-2">
                <CustomSelect<string>
                    options={rangeOptions}
                    sortByText="Range:"
                    onOptionSelect={onRangeChange}
                    defaultValue={rangeOptions[0]}
                    menuPosition="left"
                    selectWidth="w-48"
                />
            </div>
        </div>
    );
}