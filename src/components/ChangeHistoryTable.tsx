import type { ChangeRecord } from '../data/mockData';

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

export default function ChangeHistoryTable({ data }: ChangeHistoryTableProps) {
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
              Date &amp; Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Activity
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Agent
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map(row => {
            const [datePart, timePart] = row.dateTime.split('\n');
            return (
              <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                <td className="px-6 py-3.5 w-44">
                  <div className="text-sm font-medium text-gray-800">{datePart}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{timePart}</div>
                </td>
                <td className="px-6 py-3.5">
                  <span className="text-sm text-gray-800">{row.activity}</span>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${agentColor(row.agent)} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                      {row.agent[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-700">{row.agent}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
