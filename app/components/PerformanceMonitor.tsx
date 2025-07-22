'use client';

import { useState, useEffect } from 'react';
import { Activity, Clock, Database, Wifi } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  dataFreshness: number;
  apiCalls: number;
  cacheHitRate: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    dataFreshness: 0,
    apiCalls: 0,
    cacheHitRate: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate performance metrics
    const updateMetrics = () => {
      setMetrics({
        loadTime: Math.random() * 500 + 200, // 200-700ms
        dataFreshness: Math.random() * 10, // 0-10 seconds ago
        apiCalls: Math.floor(Math.random() * 50) + 10, // 10-60 calls
        cacheHitRate: Math.random() * 30 + 70 // 70-100%
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-600 dark:text-green-400';
    if (value <= thresholds.warning) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
          title="Show performance metrics"
        >
          <Activity className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Performance
            </h4>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="w-3 h-3 mr-1" />
                Load Time
              </span>
              <span className={getStatusColor(metrics.loadTime, { good: 300, warning: 500 })}>
                {metrics.loadTime.toFixed(0)}ms
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                <Database className="w-3 h-3 mr-1" />
                Data Age
              </span>
              <span className={getStatusColor(metrics.dataFreshness, { good: 5, warning: 10 })}>
                {metrics.dataFreshness.toFixed(1)}s
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                <Wifi className="w-3 h-3 mr-1" />
                API Calls
              </span>
              <span className="text-gray-900 dark:text-white">
                {metrics.apiCalls}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                <Activity className="w-3 h-3 mr-1" />
                Cache Hit
              </span>
              <span className="text-green-600 dark:text-green-400">
                {metrics.cacheHitRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}