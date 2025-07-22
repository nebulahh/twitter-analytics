'use client';

import { useState } from 'react';
import { useRealTimeData } from './hooks/useRealTimeData';
import { filterMetrics, getDateRangeDays } from './lib/mockData';
import MetricCard from './components/MetricCard';
import MetricCardSkeleton from './components/MetricCardSkeleton';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import ChartContainer from './components/ChartContainer';
import DashboardHeader from './components/DashboardHeader';
import DashboardFilters, { FilterState } from './components/DashboardFilters';
import PerformanceMonitor from './components/PerformanceMonitor';

export default function Dashboard() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '30d',
    category: 'all',
    searchTerm: ''
  });

  const {
    metrics,
    timeSeriesData,
    categoryData,
    isUpdating,
    lastUpdated,
    updateData
  } = useRealTimeData(5000);

  // Filter data based on current filters
  const filteredMetrics = filterMetrics(metrics, filters);
  const chartDays = getDateRangeDays(filters.dateRange);

  useState(() => {
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);
  });

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Revenue,Users,Orders\n"
      + timeSeriesData.map(row => `${row.name},${row.value},${Math.floor(row.value * 0.8)},${Math.floor(row.value * 0.3)}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dashboard_data_${filters.dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader 
          lastUpdated={lastUpdated}
          isConnected={true}
        />

        {/* Filters */}
        <DashboardFilters 
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isInitialLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <MetricCardSkeleton key={index} />
            ))
          ) : filteredMetrics.length > 0 ? (
            filteredMetrics.map((metric) => (
              <MetricCard 
                key={metric.id} 
                metric={metric} 
                isAnimated={isUpdating}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
              No metrics match your current filters.
            </div>
          )}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer
            title={`Revenue Trend (${filters.dateRange})`}
            onRefresh={updateData}
            onExport={handleExportData}
            isLoading={isUpdating}
          >
            <LineChart 
              data={timeSeriesData.slice(-chartDays)} 
              title="Revenue over time"
              color="#3B82F6"
            />
          </ChartContainer>
          
          <ChartContainer
            title="Traffic Sources"
            onRefresh={updateData}
            onExport={handleExportData}
            isLoading={isUpdating}
          >
            <BarChart 
              data={categoryData} 
              title="Device breakdown"
              color="#10B981"
            />
          </ChartContainer>
        </div>

        {/* Performance Monitor */}
        <PerformanceMonitor />
      </div>
    </div>
  );
}