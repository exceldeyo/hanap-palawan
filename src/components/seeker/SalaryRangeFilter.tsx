import React from 'react';
import { Coins } from 'lucide-react';

interface SalaryRangeFilterProps {
  minSalary: number;
  onChangeMinSalary: (val: number) => void;
  matchingCount: number;
  totalCount: number;
}

export const SalaryRangeFilter: React.FC<SalaryRangeFilterProps> = ({
  minSalary,
  onChangeMinSalary,
}) => {
  const presets = [
    { label: 'All Rates', value: 0 },
    { label: '₱50k+', value: 50000 },
    { label: '₱70k+', value: 70000 },
    { label: '₱90k+', value: 90000 },
    { label: '₱120k+', value: 120000 },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs overflow-x-auto no-scrollbar max-w-full border border-transparent dark:border-slate-700/60">
      <span className="text-slate-500 dark:text-slate-400 font-medium px-1.5 flex items-center gap-1 shrink-0">
        <Coins className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
        <span className="hidden sm:inline">Min Salary:</span>
      </span>

      <div className="flex items-center gap-1 shrink-0">
        {presets.map(preset => {
          const isSelected = minSalary === preset.value;
          return (
            <button
              key={preset.value}
              type="button"
              onClick={() => onChangeMinSalary(preset.value)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer min-h-[34px] flex items-center justify-center ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
