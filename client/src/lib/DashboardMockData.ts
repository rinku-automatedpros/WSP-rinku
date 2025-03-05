type DateRange = "Today" | "Weekly" | "Monthly" | "Yearly";

type DashboardData = {
  revenue: string;
  allOrders: number;
  paidOrders: number;
  accepted: number;
  completed: number;
  canceled: number;
  popularItems: { name: string; orders: number }[];
  completedOrders: { frequency: string; orders: number; isActive: boolean }[];
  paymentDistribution: { name: string; value: number; color: string; currency: string }[];
};

export const generateMockData = (range: DateRange): Promise<DashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date(); // Define current date

      const multiplier = range === "Today" ? 1 : range === "Weekly" ? 7 : range === "Monthly" ? 30 : 365;
      const baseRevenue = 3145;
      const baseOrders = 290;

      const getRandomValue = (min: number) => Math.floor(Math.random() * 100) + min;

      let completedOrders: { frequency: string; orders: number; isActive: boolean }[] = [];

      if (range === "Today") {
        // Time-wise data (e.g., "00:00", "02:00", ..., "22:00")
        const intervals = 12; // 2-hour gaps (24 hours / 2 = 12 points)
        completedOrders = Array.from({ length: intervals }, (_, i) => {
          const hour = i * 2;
          return {
            frequency: `${hour.toString().padStart(2, "0")}:00`,
            orders: Math.floor(10 + Math.random() * 40) * multiplier,
            isActive: hour === now.getHours(),
          };
        });
      } else if (range === "Weekly") {
        // Weekly data (Sunday - Saturday)
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        completedOrders = weekDays.map((day, i) => ({
          frequency: day,
          orders: Math.floor(100 + Math.random() * 50) * multiplier,
          isActive: i === now.getDay(),
        }));
      } else if (range === "Monthly") {
        // Monthly data (Jan - Dec)
        const months = Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("default", { month: "short" })
        );
        completedOrders = months.map((month, i) => ({
          frequency: month,
          orders: Math.floor(500 + Math.random() * 200) * multiplier,
          isActive: i === now.getMonth(),
        }));
      } else if (range === "Yearly") {
        // Yearly data (Last 12 years)
        const years = Array.from({ length: 12 }, (_, i) => (now.getFullYear() - 11 + i).toString());
        completedOrders = years.map((year, i) => ({
          frequency: year,
          orders: Math.floor(5000 + Math.random() * 2000) * multiplier,
          isActive: year === now.getFullYear().toString(),
        }));
      }

      const data: DashboardData = {
        revenue: (baseRevenue * multiplier).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        allOrders: baseOrders * multiplier,
        paidOrders: Math.floor(baseOrders * 0.6 * multiplier),
        accepted: Math.floor(baseOrders * 0.13 * multiplier),
        completed: Math.floor(baseOrders * 0.53 * multiplier),
        canceled: Math.floor(baseOrders * 0.03 * multiplier),
        popularItems: [
          { name: "Double Chicken Burger + French fries", orders: 88 * multiplier },
          { name: "Mexican Burger", orders: 74 * multiplier },
          { name: "Double Cheese Burger", orders: 56 * multiplier },
          { name: "Double Spicy Bean Burger", orders: 41 * multiplier },
          { name: "Potato Gems", orders: 38 * multiplier },
          { name: "Beer", orders: 32 * multiplier },
        ],
        completedOrders: completedOrders,
        paymentDistribution: [
          { name: "Card", value: (Math.random() * 2) * multiplier, color: "rgb(255, 85, 45)", currency: "$" },
          { name: "PayPal", value: (Math.random() * 2) * multiplier, color: "rgb(165, 135, 125)", currency: "$" },
          { name: "Apple Pay", value: (Math.random() * 2) * multiplier, color: "rgb(95, 95, 205)", currency: "$" },
          { name: "Cash", value: (Math.random() * 2) * multiplier, color: "rgb(85, 195, 215)", currency: "$" },
          { name: "Crypto", value: (Math.random() * 2) * multiplier, color: "rgb(255, 195, 65)", currency: "$" },
        ],
      };
      resolve(data);
    }, 500);
  });
};
