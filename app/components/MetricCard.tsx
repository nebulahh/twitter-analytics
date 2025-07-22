'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MetricData } from '../types/dashboard';

interface MetricCardProps {
  metric: MetricData;
  isAnimated?: boolean;
}

export default function MetricCard({ metric, isAnimated = false }: MetricCardProps) {
  const { label, value, change, changeType } = metric;

  const formatValue = (val: number): string => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toLocaleString();
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-4 h-4" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getChangeColors = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'decrease':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 ${
      isAnimated ? 'animate-pulse' : ''
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
        <div className={`p-1 rounded-full ${getChangeColors().split(' ')[1]} ${getChangeColors().split(' ')[2] || ''}`}>
          <div className={getChangeColors().split(' ')[0]}>
            {getChangeIcon()}
          </div>
        </div>
      </div>
      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {label.includes('Rate') ? `${value}%` : formatValue(value)}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <span className={`text-sm font-medium ${getChangeColors().split(' ')[0]}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
      </div>
    </div>
  );
}