'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateMetrics, generateTimeSeriesData, generateCategoryData } from '../lib/mockData';
import { MetricData, ChartDataPoint } from '../types/dashboard';

export function useRealTimeData(updateInterval: number = 5000) {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<ChartDataPoint[]>([]);
  const [categoryData, setCategoryData] = useState<ChartDataPoint[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const updateData = useCallback(() => {
    setIsUpdating(true);

    setTimeout(() => {
      setMetrics(generateMetrics());
      setTimeSeriesData(generateTimeSeriesData());
      setCategoryData(generateCategoryData());
      setLastUpdated(new Date());
      setIsUpdating(false);
    }, 500);
  }, []);

  const updateMetrics = useCallback(() => {
    const currentMetrics = generateMetrics();
    setMetrics(currentMetrics);
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics();
      
      const now = Date.now();
      if (Math.floor(now / updateInterval) % 3 === 0) {
        setTimeSeriesData(generateTimeSeriesData());
        setCategoryData(generateCategoryData());
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, updateMetrics]);

  return {
    metrics,
    timeSeriesData,
    categoryData,
    isUpdating,
    lastUpdated,
    updateData,
    updateMetrics
  };
}