import { Fragment, useState } from 'react';
import type { ChangeRecord, RecordDetails } from '../data/mockData';
import { getRecordDetails } from '../data/mockData';

interface ChangeHistoryTableProps {
  data: ChangeRecord[];
}

const agentColor = (agent: string) => {
  if (agent.includes('@')) return 'bg-gradient-to-br from-blue-400 to-indigo-500';
  if (agent.includes('Budget')) return 'bg-gradient-to-br from-amber-400 to-orange-500';
  if (agent.includes('Bidding')) return 'bg-gradient-to-br from-emerald-400 to-teal-500';
  if (agent.includes('Harvesting')) return 'bg-gradient-to-br from-pink-400 to-rose-500';
  return 'bg-gradient-to-br from-gray-400 to-gray-500';
};

function DetailTable({ details }: { details: RecordDetails }) {
  if (details.tableType === 'change') {
    return (
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-2 text-left font-semibold text-gray-500 uppercase tracking-wider w-72">
                {details.entityLabel ?? 'Entity'}
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-500 uppercase tracking-wider w-56">Action</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-500 uppercase tracking-wider">Old Value</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-500 uppercase tracking-wider">New Value</th>
            </tr>
          </thead>
          <tbody>
            {details.rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0 bg-white">
                <td className="px-4 py-2.5 text-gray-800 font-medium">{row.entityName ?? '—'}</td>
                <td className="px-4 py-2.5 text-gray-700">{row.action}</td>
                <td className="px-4 py-2.5 text-gray-500">{row.oldValue ?? '—'}</td>
                <td className="px-4 py-2.5 text-gray-800">{row.newValue ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden inline-block min-w-[360px]">
      <table className="text-xs">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-2 text-left font-semibold text-gray-500 uppercase tracking-wider w-52">Field</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-500 uppercase tracking-wider w-64">Value</th>
          </tr>
        </thead>
        <tbody>
          {details.rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0 bg-white">
              <td className="px-4 py-2.5 text-gray-500 font-medium">{row.action}</td>
              <td className="px-4 py-2.5 text-gray-800">{row.value ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ChangeHistoryTable({ data }: ChangeHistoryTableProps) {
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sorted = [...data].sort((a, b) => {
    const diff = a.date.getTime() - b.date.getTime();
    return sortDir === 'asc' ? diff : -diff;
  });

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-3 opacity-40">
          <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M16 24h16M16 32h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-sm font-medium">No results found</p>
        <p className="text-xs mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-44">
              <button
                onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-1 hover:text-gray-800 transition-colors group"
              >
                Date &amp; Time
                <span className="flex flex-col leading-none opacity-60 group-hover:opacity-100">
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className={sortDir === 'asc' ? 'text-blue-600 opacity-100' : ''}>
                    <path d="M1 4l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className={sortDir === 'desc' ? 'text-blue-600 opacity-100' : ''}>
                    <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Activity
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Agent
            </th>
            <th className="px-4 py-3 w-20" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sorted.map(row => {
            const isExpanded = expandedIds.has(row.id);
            const [datePart, timePart] = row.dateTime.split('\n');
            return (
              <Fragment key={row.id}>
                <tr
                  onClick={() => toggleExpand(row.id)}
                  className={`transition-colors cursor-pointer group ${isExpanded ? 'bg-blue-50/50' : 'hover:bg-blue-50/30'}`}
                >
                  <td className="px-6 py-3.5 w-44">
                    <div className="text-sm font-medium text-gray-800">{datePart}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{timePart}</div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-sm text-gray-800">{row.activity}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-sm text-gray-700">{row.agent}</span>
                  </td>
                  <td className="px-4 py-3.5 w-20">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={e => { e.stopPropagation(); }}
                        title="Export"
                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 1v7M4.5 5.5L7 8l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 10v1.5A.5.5 0 002.5 12h9a.5.5 0 00.5-.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); toggleExpand(row.id); }}
                        title={isExpanded ? 'Collapse' : 'Expand'}
                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <svg
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                          className={`transition-transform ${isExpanded ? 'rotate-180 text-blue-500' : ''}`}
                        >
                          <path d="M2.5 5l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                {isExpanded && (
                  <tr className="bg-gray-50/60">
                    <td colSpan={4} className="px-8 py-4">
                      <DetailTable details={getRecordDetails(row)} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
