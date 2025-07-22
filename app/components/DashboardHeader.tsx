'use client';

import { Sun, Moon, Wifi, WifiOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DashboardHeaderProps {
  lastUpdated: Date;
  isConnected?: boolean;
}

export default function DashboardHeader({ lastUpdated, isConnected = true }: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Twitter</h1>
        <div className="flex items-center space-x-4 mt-2">
          <p className="text-gray-600 dark:text-gray-300">Real-time analytics and insights</p>
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 dark:text-red-400">Offline</span>
              </>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              • Updated {formatLastUpdated(lastUpdated)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
}
