'use client';

import { ReactNode } from 'react';
import { RefreshCw, Download } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  onRefresh?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
}

export default function ChartContainer({ 
  title, 
  children, 
  onRefresh, 
  onExport, 
  isLoading = false 
}: ChartContainerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          )}
          {onExport && (
            <button
              onClick={onExport}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chart Content */}
      <div className="h-64">
        {isLoading ? (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">Loading chart...</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}