import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, SearchIcon, XIcon } from './icons';
import type { AppInfo } from '../data/mockData';

interface AppSelectorDropdownProps {
  apps: AppInfo[];
  selected: string[];
  onChange: (ids: string[]) => void;
}

const platformBadgeColor: Record<string, string> = {
  'iOS':           'bg-blue-50 text-blue-600',
  'Android':       'bg-green-50 text-green-600',
  'iOS & Android': 'bg-purple-50 text-purple-600',
};

export default function AppSelectorDropdown({ apps, selected, onChange }: AppSelectorDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = apps.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);

  const label = selected.length === 0 ? 'App' : `App (${selected.length})`;
  const hasFilter = selected.length > 0;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
          open
            ? 'bg-white border-blue-400 text-blue-700 shadow-sm'
            : hasFilter
            ? 'bg-blue-50 border-blue-300 text-blue-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span>{label}</span>
        {open ? (
          <ChevronUpIcon className="text-blue-500" />
        ) : (
          <ChevronDownIcon className={hasFilter ? 'text-blue-500' : 'text-gray-400'} />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col" style={{ width: '300px' }}>
          {/* Search */}
          <div className="px-3 pt-3 pb-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
              <SearchIcon className="text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search apps..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                  <XIcon />
                </button>
              )}
            </div>
          </div>

          {/* Header row */}
          <div className="flex items-center justify-between px-3 pb-1.5 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500">
              {apps.length} app{apps.length !== 1 ? 's' : ''}
            </span>
            {selected.length > 0 && (
              <button
                onClick={() => onChange([])}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* App list */}
          <div className="overflow-y-auto" style={{ maxHeight: '260px' }}>
            {filtered.length === 0 ? (
              <div className="px-3 py-6 text-sm text-gray-400 text-center">No apps found</div>
            ) : (
              filtered.map(app => {
                const checked = selected.includes(app.id);
                return (
                  <button
                    key={app.id}
                    onClick={() => toggle(app.id)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 border-t border-gray-50 hover:bg-gray-50 transition-colors text-left"
                  >
                    {/* Checkbox */}
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                      {checked && <CheckIcon className="text-white" />}
                    </div>

                    {/* App icon */}
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${app.iconGradient} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm`}>
                      {app.iconLetter}
                    </div>

                    {/* Name + platform */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">{app.name}</div>
                      <span className={`inline-block text-xs px-1.5 py-0.5 rounded font-medium mt-0.5 ${platformBadgeColor[app.platform] ?? 'bg-gray-100 text-gray-500'}`}>
                        {app.platform}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={() => setOpen(false)}
              className="w-full py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
