import { MetricData, ChartDataPoint } from '../types/dashboard';
import { FilterState } from '../components/DashboardFilters';

export const generateMetrics = (): MetricData[] => [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: Math.floor(Math.random() * 10000) + 40000,
    change: (Math.random() - 0.5) * 20,
    changeType: Math.random() > 0.5 ? 'increase' : 'decrease'
  },
  {
    id: 'users',
    label: 'Active Users',
    value: Math.floor(Math.random() * 2000) + 7000,
    change: (Math.random() - 0.5) * 15,
    changeType: Math.random() > 0.6 ? 'increase' : 'decrease'
  },
  {
    id: 'orders',
    label: 'Orders',
    value: Math.floor(Math.random() * 500) + 1000,
    change: (Math.random() - 0.5) * 25,
    changeType: Math.random() > 0.4 ? 'increase' : 'decrease'
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: Math.random() * 2 + 2.5,
    change: (Math.random() - 0.5) * 2,
    changeType: Math.random() > 0.5 ? 'increase' : 'decrease'
  }
];

export const generateTimeSeriesData = (days: number = 30): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const baseValue = 1000;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.floor(baseValue + Math.random() * 500 - 250 + Math.sin(i / 5) * 200),
      date: date.toISOString()
    });
  }
  
  return data;
};

export const generateCategoryData = (): ChartDataPoint[] => [
  { name: 'Desktop', value: Math.floor(Math.random() * 20) + 35 },
  { name: 'Mobile', value: Math.floor(Math.random() * 20) + 25 },
  { name: 'Tablet', value: Math.floor(Math.random() * 15) + 15 }
];

// Filter functions
export const filterMetrics = (metrics: MetricData[], filters: FilterState): MetricData[] => {
  let filtered = [...metrics];
  
  if (filters.category !== 'all') {
    filtered = filtered.filter(metric => 
      metric.id.toLowerCase().includes(filters.category.toLowerCase())
    );
  }
  
  if (filters.searchTerm) {
    filtered = filtered.filter(metric =>
      metric.label.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
  }
  
  return filtered;
};

export const getDateRangeDays = (dateRange: FilterState['dateRange']): number => {
  switch (dateRange) {
    case '7d': return 7;
    case '30d': return 30;
    case '90d': return 90;
    default: return 30;
  }
};