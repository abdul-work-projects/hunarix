export interface MonthlyRevenue {
  month: string;
  mrr: number;
  arr: number;
  newMrr: number;
  churnedMrr: number;
  netNewMrr: number;
  totalRevenue: number;
  activeCustomers: number;
  newCustomers: number;
  churnedCustomers: number;
}

export interface RevenueByPlan {
  plan: string;
  revenue: number;
  customers: number;
  percentage: number;
}

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Dec 2024", mrr: 1150, arr: 13800, newMrr: 145, churnedMrr: 29, netNewMrr: 116, totalRevenue: 1150, activeCustomers: 38, newCustomers: 5, churnedCustomers: 1 },
  { month: "Jan 2025", mrr: 1324, arr: 15888, newMrr: 203, churnedMrr: 29, netNewMrr: 174, totalRevenue: 1324, activeCustomers: 44, newCustomers: 7, churnedCustomers: 1 },
  { month: "Feb 2025", mrr: 1469, arr: 17628, newMrr: 174, churnedMrr: 29, netNewMrr: 145, totalRevenue: 1469, activeCustomers: 49, newCustomers: 6, churnedCustomers: 1 },
  { month: "Mar 2025", mrr: 1627, arr: 19524, newMrr: 187, churnedMrr: 29, netNewMrr: 158, totalRevenue: 1627, activeCustomers: 54, newCustomers: 6, churnedCustomers: 1 },
  { month: "Apr 2025", mrr: 1785, arr: 21420, newMrr: 187, churnedMrr: 29, netNewMrr: 158, totalRevenue: 1785, activeCustomers: 59, newCustomers: 6, churnedCustomers: 1 },
  { month: "May 2025", mrr: 1943, arr: 23316, newMrr: 187, churnedMrr: 29, netNewMrr: 158, totalRevenue: 1943, activeCustomers: 63, newCustomers: 5, churnedCustomers: 1 },
  { month: "Jun 2025", mrr: 2088, arr: 25056, newMrr: 174, churnedMrr: 29, netNewMrr: 145, totalRevenue: 2088, activeCustomers: 67, newCustomers: 5, churnedCustomers: 1 },
  { month: "Jul 2025", mrr: 2246, arr: 26952, newMrr: 187, churnedMrr: 29, netNewMrr: 158, totalRevenue: 2246, activeCustomers: 71, newCustomers: 5, churnedCustomers: 1 },
  { month: "Aug 2025", mrr: 2404, arr: 28848, newMrr: 187, churnedMrr: 29, netNewMrr: 158, totalRevenue: 2404, activeCustomers: 75, newCustomers: 5, churnedCustomers: 1 },
  { month: "Sep 2025", mrr: 2549, arr: 30588, newMrr: 174, churnedMrr: 29, netNewMrr: 145, totalRevenue: 2549, activeCustomers: 79, newCustomers: 5, churnedCustomers: 1 },
  { month: "Oct 2025", mrr: 2707, arr: 32484, newMrr: 187, churnedMrr: 29, netNewMrr: 158, totalRevenue: 2707, activeCustomers: 82, newCustomers: 4, churnedCustomers: 1 },
  { month: "Nov 2025", mrr: 2852, arr: 34224, newMrr: 174, churnedMrr: 29, netNewMrr: 145, totalRevenue: 2852, activeCustomers: 85, newCustomers: 4, churnedCustomers: 1 },
];

export const revenueByPlan: RevenueByPlan[] = [
  { plan: "Enterprise", revenue: 1393, customers: 7, percentage: 70.6 },
  { plan: "Pro", revenue: 580, customers: 20, percentage: 29.4 },
  { plan: "Free", revenue: 0, customers: 40, percentage: 0 },
];

export const customerGrowth = [
  { month: "Dec 2024", total: 38, new: 5 },
  { month: "Jan 2025", total: 44, new: 7 },
  { month: "Feb 2025", total: 49, new: 6 },
  { month: "Mar 2025", total: 54, new: 6 },
  { month: "Apr 2025", total: 59, new: 6 },
  { month: "May 2025", total: 63, new: 5 },
  { month: "Jun 2025", total: 67, new: 5 },
  { month: "Jul 2025", total: 71, new: 5 },
  { month: "Aug 2025", total: 75, new: 5 },
  { month: "Sep 2025", total: 79, new: 5 },
  { month: "Oct 2025", total: 82, new: 4 },
  { month: "Nov 2025", total: 85, new: 4 },
];

export const avgRevenuePerUser = [
  { month: "Dec 2024", arpu: 30.26 },
  { month: "Jan 2025", arpu: 30.09 },
  { month: "Feb 2025", arpu: 29.98 },
  { month: "Mar 2025", arpu: 30.13 },
  { month: "Apr 2025", arpu: 30.25 },
  { month: "May 2025", arpu: 30.84 },
  { month: "Jun 2025", arpu: 31.16 },
  { month: "Jul 2025", arpu: 31.63 },
  { month: "Aug 2025", arpu: 32.05 },
  { month: "Sep 2025", arpu: 32.27 },
  { month: "Oct 2025", arpu: 33.01 },
  { month: "Nov 2025", arpu: 33.55 },
];

export const lifetimeValueByPlan = [
  { plan: "Enterprise", ltv: 2985, avgMonths: 15 },
  { plan: "Pro", ltv: 464, avgMonths: 16 },
  { plan: "Free", ltv: 0, avgMonths: 2 },
];
