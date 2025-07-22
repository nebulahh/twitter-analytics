export interface MetricData {
  id: string;
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
}

export interface Widget {
  id: string;
  title: string;
  type: 'metric' | 'line-chart' | 'bar-chart' | 'pie-chart';
  data: MetricData[] | ChartDataPoint[];
  gridArea: string;
}