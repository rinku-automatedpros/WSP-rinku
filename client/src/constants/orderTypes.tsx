export enum OrderType {
  ALL = "all",
  DELIVERY = "delivery",
  PICKUP = "pickup",
  DINE = "dine_in",
  AGGREGATOR = "aggregator",
}
export const OrderTypeLabels: Record<OrderType, string> = {
  [OrderType.ALL]: "All",
  [OrderType.DELIVERY]: "Delivery",
  [OrderType.PICKUP]: "Pickup",
  [OrderType.DINE]: "Table",
  [OrderType.AGGREGATOR]: "Aggregator",
}
