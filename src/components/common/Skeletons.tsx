import React from 'react';

export const JobCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-2xs">
      {/* Top Row: Company Logo, Title, Bookmark */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 animate-shimmer shrink-0" />
          <div className="min-w-0 flex-1 space-y-2 pt-0.5">
            <div className="h-4 w-4/5 rounded-md bg-slate-200 dark:bg-slate-800 animate-shimmer" />
            <div className="h-3 w-1/2 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer" />
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer shrink-0" />
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <div className="h-5 w-20 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer" />
        <div className="h-5 w-24 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer" />
        <div className="h-5 w-16 rounded-md bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer" />
      </div>

      {/* Excerpt / summary line */}
      <div className="space-y-1.5 pt-0.5">
        <div className="h-3 w-full rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
        <div className="h-3 w-3/4 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
      </div>

      {/* Bottom row: Salary and Date */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="h-4 w-28 rounded bg-emerald-100/70 dark:bg-emerald-950/40 animate-shimmer" />
        <div className="h-3 w-16 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
      </div>
    </div>
  );
};

export const JobDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-xs">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-shimmer shrink-0" />
          <div className="min-w-0 flex-1 space-y-2.5 pt-1">
            <div className="h-6 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800 animate-shimmer" />
            <div className="h-4 w-1/2 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer" />
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-24 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
              <div className="h-3.5 w-20 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="h-10 w-28 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer" />
          <div className="h-10 w-32 rounded-xl bg-emerald-200/60 dark:bg-emerald-900/40 animate-shimmer" />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(idx => (
          <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800/60">
            <div className="h-2.5 w-14 rounded bg-slate-200 dark:bg-slate-700 animate-shimmer" />
            <div className="h-4 w-20 rounded bg-slate-300 dark:bg-slate-600 animate-shimmer" />
          </div>
        ))}
      </div>

      {/* Description Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-shimmer" />
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
          <div className="h-3.5 w-full rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
          <div className="h-3.5 w-5/6 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
          <div className="h-3.5 w-3/4 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
        </div>
      </div>

      {/* Responsibilities Bullets */}
      <div className="space-y-3">
        <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800 animate-shimmer" />
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-300 dark:bg-emerald-800 animate-shimmer shrink-0" />
              <div className="h-3.5 w-11/12 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Banner Skeleton */}
      <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-between gap-3">
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-48 rounded bg-emerald-200 dark:bg-emerald-800/60 animate-shimmer" />
          <div className="h-3 w-64 rounded bg-emerald-100 dark:bg-emerald-900/40 animate-shimmer" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-emerald-200/80 dark:bg-emerald-800/70 animate-shimmer shrink-0" />
      </div>
    </div>
  );
};

export const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-700/80 rounded-xl p-3.5 sm:p-4 space-y-3 flex flex-col justify-between shadow-2xs">
      <div className="space-y-2.5">
        {/* Category & Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-3 w-28 rounded bg-emerald-100 dark:bg-emerald-950/70 animate-shimmer" />
          <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 animate-shimmer shrink-0" />
        </div>

        {/* Title */}
        <div className="space-y-1.5 pt-0.5">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 animate-shimmer" />
          <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-shimmer" />
        </div>

        {/* Location snippet */}
        <div className="h-3 w-24 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer" />

        {/* Snippet */}
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
          <div className="h-3 w-11/12 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
          <div className="h-3 w-3/4 rounded bg-slate-200/70 dark:bg-slate-800/70 animate-shimmer" />
        </div>

        {/* Economic Milestone Box */}
        <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
          <div className="h-2.5 w-28 rounded bg-slate-200 dark:bg-slate-700 animate-shimmer" />
          <div className="h-3 w-4/5 rounded bg-slate-200/80 dark:bg-slate-800/80 animate-shimmer" />
        </div>

        {/* Job Implication Box */}
        <div className="p-2.5 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-800/60 space-y-1.5">
          <div className="h-3 w-36 rounded bg-emerald-200/70 dark:bg-emerald-800/60 animate-shimmer" />
          <div className="h-2.5 w-48 rounded bg-emerald-100 dark:bg-emerald-900/40 animate-shimmer" />
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="h-4 w-24 rounded bg-emerald-200/80 dark:bg-emerald-800/60 animate-shimmer" />
        <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700 animate-shimmer" />
      </div>
    </div>
  );
};
