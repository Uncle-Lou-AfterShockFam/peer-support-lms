'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  subtitle?: string;
}

export default function StatsCard({ icon: Icon, title, value, color, subtitle }: StatsCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          accent: 'border-blue-500'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'text-green-600',
          accent: 'border-green-500'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-600',
          accent: 'border-purple-500'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          icon: 'text-yellow-600',
          accent: 'border-yellow-500'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          icon: 'text-red-600',
          accent: 'border-red-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          accent: 'border-gray-500'
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`card ${colors.bg} border-l-4 ${colors.accent} hover:shadow-xl transition-all duration-300`}
    >
      <div className="card-content">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`p-3 rounded-full ${colors.bg}`}>
            <Icon className={`h-8 w-8 ${colors.icon}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}