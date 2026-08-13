import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'purple' | 'cyan' | 'rose';
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  colorScheme = 'blue',
  onClick,
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50/70 dark:bg-blue-950/30',
      iconBg: 'bg-[#0070C0] text-white',
      border: 'border-blue-100 dark:border-blue-900/40',
      text: 'text-[#0070C0] dark:text-blue-400'
    },
    emerald: {
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/30',
      iconBg: 'bg-emerald-600 text-white',
      border: 'border-emerald-100 dark:border-emerald-900/40',
      text: 'text-emerald-600 dark:text-emerald-400'
    },
    amber: {
      bg: 'bg-amber-50/70 dark:bg-amber-950/30',
      iconBg: 'bg-amber-500 text-white',
      border: 'border-amber-100 dark:border-amber-900/40',
      text: 'text-amber-600 dark:text-amber-400'
    },
    purple: {
      bg: 'bg-purple-50/70 dark:bg-purple-950/30',
      iconBg: 'bg-purple-600 text-white',
      border: 'border-purple-100 dark:border-purple-900/40',
      text: 'text-purple-600 dark:text-purple-400'
    },
    cyan: {
      bg: 'bg-cyan-50/70 dark:bg-cyan-950/30',
      iconBg: 'bg-cyan-600 text-white',
      border: 'border-cyan-100 dark:border-cyan-900/40',
      text: 'text-cyan-600 dark:text-cyan-400'
    },
    rose: {
      bg: 'bg-rose-50/70 dark:bg-rose-950/30',
      iconBg: 'bg-rose-600 text-white',
      border: 'border-rose-100 dark:border-rose-900/40',
      text: 'text-rose-600 dark:text-rose-400'
    }
  };

  const scheme = colorMap[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-[12px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer hover:border-[#0070C0]' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 tracking-tight">{value}</h3>
          
          {subtext && <p className="text-[11px] text-slate-400 mt-1">{subtext}</p>}

          {trend && (
            <div className="flex items-center gap-1 mt-2 text-[11px] font-bold">
              {trend.isPositive ? (
                <span className="flex items-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={13} className="mr-0.5" /> {trend.value}
                </span>
              ) : (
                <span className="flex items-center text-rose-600 dark:text-rose-400">
                  <TrendingDown size={13} className="mr-0.5" /> {trend.value}
                </span>
              )}
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          )}
        </div>

        <div className={`p-2.5 rounded-xl ${scheme.iconBg} shadow-xs shrink-0`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};
