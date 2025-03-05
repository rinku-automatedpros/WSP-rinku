"use client"

import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { PaymentDistribution } from "./PaymentDistribution";
import { CompletedOrders } from "./CompletedOrders";
import { PopularItems } from "./PopularItems";
import { OrderStatsMatrix } from "./OrderStatsMatrix";
import { RestaurantStatus } from "./RestaurantStatus";
import { Header } from "./Header";
import { generateMockData } from "@/lib/DashboardMockData";
import Spinner from "../spinner";

type DateRange = "Today" | "Weekly" | "Monthly" | "Yearly";

type RestaurantStatusType = 'open' | 'busy' | 'closed';

export default function ProfileComponent() {

  const [selectedRange, setSelectedRange] = useState<DateRange>("Today");
  const [loading, setLoading] = useState<boolean>(true);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = React.useState<RestaurantStatusType>("open");


  const fetchData = async (range: DateRange) => {
    try {
      setLoading(true);
      const result = await generateMockData(range);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedRange);
  }, [selectedRange]);

  // Corrected handleDateRangeChange function
  const handleDateRangeChange = useCallback(async (option: { value: string; label: string }) => {
    setLoading(true);
    setSelectedRange(option.value as DateRange);
  }, []);

  // Handle status change (Added missing function)
  const handleStatusChange = (newStatus: RestaurantStatusType) => {
    setStatusLoading(true);
    setStatus(newStatus);
    setTimeout(() => {
      setStatusLoading(false);
  }, 1000); // Simulating a 1-second delay
  };

  return (
    <div className="flex min-h-screen flex-col px-4">

      {/* Header */}
      <Header
        selectedRange={selectedRange}
        onRangeChange={handleDateRangeChange}
      />

      <div className="mt-4 flex flex-grow flex-col">
        {/* Restaurant Status */}
        <RestaurantStatus
          status={status}
          onStatusChange={handleStatusChange}
          loading={statusLoading}
        />

        {loading ? (
          <div className="flex h-screen items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>

            {/* Stats Grid */}
            <OrderStatsMatrix
              revenue={data.revenue}
              allOrders={data.allOrders}
              paidOrders={data.paidOrders}
              accepted={data.accepted}
              completed={data.completed}
              canceled={data.canceled}
            />

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Popular Items */}
              <PopularItems items={data.popularItems} />

              {/* Right Side */}
              <div className="col-span-2 space-y-6">
                {/* Completed Orders */}
                <CompletedOrders data={data.completedOrders} />

                {/* Payment Distribution */}
                <PaymentDistribution
                  data={data.paymentDistribution}
                  totalRevenue={data.revenue}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
